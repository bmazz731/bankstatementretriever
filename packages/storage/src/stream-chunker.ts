/**
 * Stream chunking utility for large file uploads in edge environment
 * Memory-efficient streaming without buffering entire file
 */
import type { UploadChunk, StreamChunker } from './types'

export class EdgeStreamChunker implements StreamChunker {
  constructor(public readonly chunkSize: number) {}

  /**
   * Create chunks from a readable stream
   */
  async* createChunks(
    stream: ReadableStream<Uint8Array>,
    totalSize: number
  ): AsyncIterable<UploadChunk> {
    const reader = stream.getReader()
    let chunkIndex = 0
    let bytesRead = 0
    let buffer = new Uint8Array(0)

    try {
      while (bytesRead < totalSize) {
        // Read chunks until we have enough for an upload chunk
        while (buffer.length < this.chunkSize && bytesRead < totalSize) {
          const { done, value } = await reader.read()
          
          if (done) break
          if (!value) continue

          // Append to buffer
          const newBuffer = new Uint8Array(buffer.length + value.length)
          newBuffer.set(buffer)
          newBuffer.set(value, buffer.length)
          buffer = newBuffer
          bytesRead += value.length
        }

        if (buffer.length === 0) break

        // Create chunk (may be less than chunkSize for the last chunk)
        const chunkData = buffer.slice(0, Math.min(this.chunkSize, buffer.length))
        const startByte = chunkIndex * this.chunkSize
        const endByte = startByte + chunkData.length - 1

        // Create readable stream for this chunk
        const chunkStream = new ReadableStream({
          start(controller) {
            controller.enqueue(chunkData)
            controller.close()
          }
        })

        yield {
          chunkIndex,
          startByte,
          endByte,
          chunkSize: chunkData.length,
          data: chunkStream
        }

        // Remove processed data from buffer
        buffer = buffer.slice(chunkData.length)
        chunkIndex++
      }
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * Calculate total number of chunks for a given file size
   */
  calculateTotalChunks(fileSize: number): number {
    return Math.ceil(fileSize / this.chunkSize)
  }

  /**
   * Create a single chunk from R2 object range
   */
  async createChunkFromRange(
    r2Object: R2Object,
    chunkIndex: number,
    totalSize: number
  ): Promise<UploadChunk> {
    const startByte = chunkIndex * this.chunkSize
    const endByte = Math.min(startByte + this.chunkSize - 1, totalSize - 1)
    const chunkSize = endByte - startByte + 1

    // Get range from R2
    const rangeStream = r2Object.body?.slice(startByte, endByte + 1)
    
    if (!rangeStream) {
      throw new Error(`Failed to get range ${startByte}-${endByte} from R2 object`)
    }

    return {
      chunkIndex,
      startByte,
      endByte,
      chunkSize,
      data: rangeStream
    }
  }

  /**
   * Create transform stream that limits data rate to prevent memory buildup
   */
  createRateLimitedTransform(maxBytesPerSecond?: number): TransformStream<Uint8Array, Uint8Array> {
    let lastTime = Date.now()
    let bytesThisSecond = 0

    return new TransformStream({
      async transform(chunk, controller) {
        const now = Date.now()
        const timeDelta = now - lastTime

        if (timeDelta >= 1000) {
          // Reset counter every second
          lastTime = now
          bytesThisSecond = 0
        }

        if (maxBytesPerSecond && bytesThisSecond + chunk.length > maxBytesPerSecond) {
          // Wait until next second if we've exceeded rate limit
          const waitTime = 1000 - timeDelta
          if (waitTime > 0) {
            await new Promise(resolve => setTimeout(resolve, waitTime))
          }
          lastTime = Date.now()
          bytesThisSecond = 0
        }

        bytesThisSecond += chunk.length
        controller.enqueue(chunk)
      }
    })
  }
}

/**
 * Memory-efficient stream splitter for parallel processing
 */
export class StreamSplitter {
  /**
   * Split stream into multiple parallel streams with backpressure handling
   */
  static split<T>(stream: ReadableStream<T>, numStreams: number): ReadableStream<T>[] {
    const readers: ReadableStreamDefaultReader<T>[] = []
    const controllers: ReadableStreamDefaultController<T>[] = []
    const streams: ReadableStream<T>[] = []
    
    let sourceReader: ReadableStreamDefaultReader<T> | null = null
    let reading = false

    // Create output streams
    for (let i = 0; i < numStreams; i++) {
      const stream = new ReadableStream<T>({
        start(controller) {
          controllers[i] = controller
        },
        cancel() {
          // Clean up when stream is cancelled
          if (sourceReader && !reading) {
            sourceReader.releaseLock()
          }
        }
      })
      streams.push(stream)
    }

    // Start reading from source
    sourceReader = stream.getReader()
    this.pumpStream(sourceReader, controllers)

    return streams
  }

  private static async pumpStream<T>(
    reader: ReadableStreamDefaultReader<T>,
    controllers: ReadableStreamDefaultController<T>[]
  ): Promise<void> {
    try {
      let streamIndex = 0
      
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          // Close all controllers
          controllers.forEach(controller => {
            try {
              controller.close()
            } catch (e) {
              // Controller might already be closed
            }
          })
          break
        }

        // Send to next controller in round-robin fashion
        const controller = controllers[streamIndex % controllers.length]
        
        try {
          controller.enqueue(value)
        } catch (error) {
          // Controller might be closed, skip
          console.warn('Failed to enqueue to controller:', error)
        }
        
        streamIndex++
      }
    } catch (error) {
      // Error all controllers
      controllers.forEach(controller => {
        try {
          controller.error(error)
        } catch (e) {
          // Controller might already be closed
        }
      })
    } finally {
      reader.releaseLock()
    }
  }
}

/**
 * Utility for handling upload resume after failures
 */
export class UploadResume {
  /**
   * Calculate which chunks need to be uploaded based on completed ranges
   */
  static getRequiredChunks(
    totalSize: number,
    chunkSize: number,
    completedRanges: Array<{ start: number; end: number }>
  ): number[] {
    const totalChunks = Math.ceil(totalSize / chunkSize)
    const requiredChunks: number[] = []
    
    for (let i = 0; i < totalChunks; i++) {
      const chunkStart = i * chunkSize
      const chunkEnd = Math.min(chunkStart + chunkSize - 1, totalSize - 1)
      
      const isCompleted = completedRanges.some(range => 
        range.start <= chunkStart && range.end >= chunkEnd
      )
      
      if (!isCompleted) {
        requiredChunks.push(i)
      }
    }
    
    return requiredChunks
  }

  /**
   * Merge overlapping ranges
   */
  static mergeRanges(ranges: Array<{ start: number; end: number }>): Array<{ start: number; end: number }> {
    if (ranges.length === 0) return []
    
    const sorted = [...ranges].sort((a, b) => a.start - b.start)
    const merged: Array<{ start: number; end: number }> = [sorted[0]]
    
    for (let i = 1; i < sorted.length; i++) {
      const current = sorted[i]
      const last = merged[merged.length - 1]
      
      if (current.start <= last.end + 1) {
        // Overlapping or adjacent ranges, merge them
        last.end = Math.max(last.end, current.end)
      } else {
        // Non-overlapping range, add it
        merged.push(current)
      }
    }
    
    return merged
  }
}
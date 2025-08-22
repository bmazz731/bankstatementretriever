/**
 * Input validation utilities for API endpoints
 */

export interface ValidationSchema {
  type: "object";
  properties: Record<string, FieldSchema>;
  required?: string[];
}

export interface FieldSchema {
  type: "string" | "number" | "boolean" | "array" | "object";
  enum?: string[];
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  items?: FieldSchema;
  properties?: Record<string, FieldSchema>;
  required?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  data?: any;
}

export function validateInput(
  data: any,
  schema: ValidationSchema,
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== "object") {
    return {
      valid: false,
      errors: [
        {
          field: "root",
          message: "Input must be an object",
          code: "INVALID_TYPE",
        },
      ],
    };
  }

  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (
        !(field in data) ||
        data[field] === null ||
        data[field] === undefined
      ) {
        errors.push({
          field,
          message: `Field '${field}' is required`,
          code: "REQUIRED_FIELD_MISSING",
        });
      }
    }
  }

  // Validate each property
  for (const [field, fieldSchema] of Object.entries(schema.properties)) {
    if (field in data && data[field] !== null && data[field] !== undefined) {
      const fieldErrors = validateField(data[field], fieldSchema, field);
      errors.push(...fieldErrors);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    data: errors.length === 0 ? data : undefined,
  };
}

function validateField(
  value: any,
  schema: FieldSchema,
  fieldName: string,
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Type validation
  switch (schema.type) {
    case "string":
      if (typeof value !== "string") {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be a string`,
          code: "INVALID_TYPE",
        });
        return errors;
      }

      if (schema.minLength && value.length < schema.minLength) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be at least ${schema.minLength} characters`,
          code: "MIN_LENGTH",
        });
      }

      if (schema.maxLength && value.length > schema.maxLength) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be at most ${schema.maxLength} characters`,
          code: "MAX_LENGTH",
        });
      }

      if (schema.pattern && !schema.pattern.test(value)) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' format is invalid`,
          code: "INVALID_FORMAT",
        });
      }

      if (schema.enum && !schema.enum.includes(value)) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be one of: ${schema.enum.join(", ")}`,
          code: "INVALID_ENUM",
        });
      }
      break;

    case "number":
      if (typeof value !== "number" || isNaN(value)) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be a number`,
          code: "INVALID_TYPE",
        });
        return errors;
      }

      if (schema.min !== undefined && value < schema.min) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be at least ${schema.min}`,
          code: "MIN_VALUE",
        });
      }

      if (schema.max !== undefined && value > schema.max) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be at most ${schema.max}`,
          code: "MAX_VALUE",
        });
      }
      break;

    case "boolean":
      if (typeof value !== "boolean") {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be a boolean`,
          code: "INVALID_TYPE",
        });
      }
      break;

    case "array":
      if (!Array.isArray(value)) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be an array`,
          code: "INVALID_TYPE",
        });
        return errors;
      }

      if (schema.items) {
        value.forEach((item, index) => {
          const itemErrors = validateField(
            item,
            schema.items!,
            `${fieldName}[${index}]`,
          );
          errors.push(...itemErrors);
        });
      }
      break;

    case "object":
      if (typeof value !== "object" || Array.isArray(value)) {
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' must be an object`,
          code: "INVALID_TYPE",
        });
        return errors;
      }

      if (schema.properties) {
        // Check required fields
        if (schema.required) {
          for (const field of schema.required) {
            if (
              !(field in value) ||
              value[field] === null ||
              value[field] === undefined
            ) {
              errors.push({
                field: `${fieldName}.${field}`,
                message: `Field '${fieldName}.${field}' is required`,
                code: "REQUIRED_FIELD_MISSING",
              });
            }
          }
        }

        // Validate properties
        for (const [prop, propSchema] of Object.entries(schema.properties)) {
          if (
            prop in value &&
            value[prop] !== null &&
            value[prop] !== undefined
          ) {
            const propErrors = validateField(
              value[prop],
              propSchema,
              `${fieldName}.${prop}`,
            );
            errors.push(...propErrors);
          }
        }
      }
      break;
  }

  return errors;
}

// Common validation schemas
export const ValidationSchemas = {
  backfillRequest: {
    type: "object" as const,
    properties: {
      range_start: {
        type: "string" as const,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
      },
      range_end: {
        type: "string" as const,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
      },
    },
    required: ["range_start", "range_end"],
  },

  createDestination: {
    type: "object" as const,
    properties: {
      type: {
        type: "string" as const,
        enum: ["google_drive", "dropbox", "onedrive", "webhook"],
      },
      name: {
        type: "string" as const,
        minLength: 1,
        maxLength: 100,
      },
      config: {
        type: "object" as const,
      },
      folder_path: {
        type: "string" as const,
        maxLength: 500,
      },
    },
    required: ["type", "name", "config"],
  },

  webhookConfig: {
    type: "object" as const,
    properties: {
      url: {
        type: "string" as const,
        pattern: /^https?:\/\/.+/,
      },
      secret: {
        type: "string" as const,
        minLength: 16,
        maxLength: 256,
      },
      events: {
        type: "array" as const,
        items: {
          type: "string" as const,
          enum: [
            "statement_delivered",
            "statement_failed",
            "reauth_required",
            "monthly_summary",
          ],
        },
      },
    },
    required: ["url", "secret"],
  },

  createRoute: {
    type: "object" as const,
    properties: {
      account_id: {
        type: "string" as const,
        pattern:
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      },
      destination_id: {
        type: "string" as const,
        pattern:
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      },
      folder_override: {
        type: "string" as const,
        maxLength: 500,
      },
      filename_template: {
        type: "string" as const,
        maxLength: 200,
      },
    },
    required: ["account_id", "destination_id"],
  },

  notificationPreferences: {
    type: "object" as const,
    properties: {
      preferences: {
        type: "array" as const,
        items: {
          type: "object" as const,
          properties: {
            channel: {
              type: "string" as const,
              enum: ["email", "webhook"],
            },
            event_type: {
              type: "string" as const,
              enum: [
                "statement_delivered",
                "statement_failed",
                "reauth_required",
                "monthly_summary",
              ],
            },
            enabled: {
              type: "boolean" as const,
            },
          },
          required: ["channel", "event_type", "enabled"],
        },
      },
    },
    required: ["preferences"],
  },
};

"use client";

import { useEffect, useState, ReactNode } from "react";

interface HydrationSafeProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A comprehensive wrapper component that prevents hydration mismatches
 * by ensuring content only renders after client-side hydration is complete.
 * Uses suppressHydrationWarning to prevent React hydration warnings.
 */
export function HydrationSafe({
  children,
  fallback = null,
  className,
  style,
}: HydrationSafeProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className={className} style={style} suppressHydrationWarning>
        {fallback}
      </div>
    );
  }

  return (
    <div className={className} style={style} suppressHydrationWarning>
      {children}
    </div>
  );
}

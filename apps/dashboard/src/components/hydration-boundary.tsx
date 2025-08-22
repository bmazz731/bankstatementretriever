"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth";

interface HydrationBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function HydrationBoundary({
  children,
  fallback,
}: HydrationBoundaryProps) {
  const [isMounted, setIsMounted] = useState(false);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !hasHydrated) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

"use client";

import { useNotificationStore } from "@/stores/dashboard";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { notifications } = useNotificationStore();

  return (
    <ToastProvider>
      {notifications.map(function ({ id, title, description, type, ...props }) {
        return (
          <Toast
            key={id}
            variant={type === "error" ? "destructive" : "default"}
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

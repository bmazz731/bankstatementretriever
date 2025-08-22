"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { getStatusColor, formatRelativeTime } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "@/stores/dashboard";
import apiClient from "@/lib/api";
import type { Destination } from "@/types";

interface DestinationGridProps {
  destinations: Destination[];
  isLoading: boolean;
}

function getDestinationIcon(type: string) {
  switch (type) {
    case "google_drive":
      return Icons.globe;
    case "dropbox":
      return Icons.upload;
    case "onedrive":
      return Icons.upload;
    case "webhook":
      return Icons.link;
    default:
      return Icons.upload;
  }
}

export function DestinationGrid({
  destinations,
  isLoading,
}: DestinationGridProps) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const testMutation = useMutation({
    mutationFn: (destinationId: string) =>
      apiClient.testWebhookDestination(destinationId),
    onSuccess: (data, destinationId) => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
      addNotification({
        type: data.data?.success ? "success" : "error",
        title: data.data?.success ? "Test successful" : "Test failed",
        description: data.data?.message || "Destination test completed",
      });
    },
    onError: (error: any) => {
      addNotification({
        type: "error",
        title: "Test failed",
        description: error.message || "Failed to test destination",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-center py-8">
        <Icons.upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">
          No destinations configured
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your first storage destination to start delivering statements
        </p>
        <Button className="mt-4">
          <Icons.plus className="mr-2 h-4 w-4" />
          Add Destination
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => {
        const statusColor = getStatusColor(destination.status);
        const IconComponent = getDestinationIcon(destination.type);

        return (
          <Card key={destination.id} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{destination.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {destination.type.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    statusColor === "green"
                      ? "success"
                      : statusColor === "yellow"
                        ? "warning"
                        : statusColor === "red"
                          ? "error"
                          : "secondary"
                  }
                >
                  {destination.status}
                </Badge>
              </div>

              <div className="mt-4 space-y-2">
                {destination.folder_path && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Folder:</span>
                    <span className="truncate max-w-[150px]">
                      {destination.folder_path}
                    </span>
                  </div>
                )}

                {destination.last_test && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last tested:</span>
                    <span>{formatRelativeTime(destination.last_test)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{formatRelativeTime(destination.created_at)}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                {destination.type === "webhook" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => testMutation.mutate(destination.id)}
                    disabled={testMutation.isPending}
                  >
                    {testMutation.isPending ? (
                      <Icons.spinner className="mr-2 h-3 w-3 animate-spin" />
                    ) : (
                      <Icons.zap className="mr-2 h-3 w-3" />
                    )}
                    Test
                  </Button>
                )}
                <Button size="sm" variant="outline" className="flex-1">
                  <Icons.settings className="mr-2 h-3 w-3" />
                  Configure
                </Button>
                <Button size="sm" variant="ghost">
                  <Icons.eye className="h-3 w-3" />
                </Button>
              </div>

              {destination.status === "error" && (
                <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-xs text-red-800 dark:text-red-200">
                    <Icons.warning className="inline mr-1 h-3 w-3" />
                    Connection issue detected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

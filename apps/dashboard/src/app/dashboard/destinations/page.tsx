"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { DestinationGrid } from "@/components/destinations/destination-grid";
import { CreateDestinationDialog } from "@/components/destinations/create-destination-dialog";
import apiClient from "@/lib/api";

export default function DestinationsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: destinations, isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => apiClient.getDestinations(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Destinations</h1>
          <p className="text-muted-foreground">
            Configure where your bank statements are delivered
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Icons.add className="mr-2 h-4 w-4" />
          Add Destination
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Storage Destinations</CardTitle>
          <CardDescription>
            Manage your cloud storage and webhook destinations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DestinationGrid
            destinations={(destinations as any)?.data?.destinations || []}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <CreateDestinationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}

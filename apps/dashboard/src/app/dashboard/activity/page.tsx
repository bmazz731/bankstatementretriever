"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { formatDateTime, getStatusColor } from "@/lib/utils";

// Mock activity data - in real app this would come from API
const mockActivities = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: "statement_delivered",
    account: "Chase Checking ••••1234",
    destination: "Google Drive",
    status: "success",
    details: "Statement for March 2024 delivered successfully",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: "sync_completed",
    account: "Bank of America Savings ••••5678",
    destination: null,
    status: "success",
    details: "Account sync completed, no new statements found",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    type: "reauth_required",
    account: "Wells Fargo Credit ••••9012",
    destination: null,
    status: "warning",
    details: "Bank connection requires re-authentication",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    type: "statement_failed",
    account: "Capital One Checking ••••3456",
    destination: "Dropbox",
    status: "error",
    details: "Failed to deliver statement: Storage quota exceeded",
  },
];

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || activity.status === statusFilter;
    const matchesType = typeFilter === "all" || activity.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
        <p className="text-muted-foreground">
          View detailed logs of all statement operations and events
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            All statement retrievals, deliveries, and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search activity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="statement_delivered">Delivered</option>
                <option value="statement_failed">Failed</option>
                <option value="sync_completed">Sync</option>
                <option value="reauth_required">Reauth</option>
              </select>
              <Button variant="outline">
                <Icons.download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {filteredActivities.map((activity) => {
                const statusColor = getStatusColor(activity.status);

                return (
                  <div key={activity.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              statusColor === "green"
                                ? "bg-green-500"
                                : statusColor === "yellow"
                                  ? "bg-yellow-500"
                                  : statusColor === "red"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                            }`}
                          />
                          <h4 className="font-medium">{activity.details}</h4>
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
                            {activity.status}
                          </Badge>
                        </div>

                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <p>
                            <strong>Account:</strong> {activity.account}
                          </p>
                          {activity.destination && (
                            <p>
                              <strong>Destination:</strong>{" "}
                              {activity.destination}
                            </p>
                          )}
                          <p>
                            <strong>Time:</strong>{" "}
                            {formatDateTime(activity.timestamp)}
                          </p>
                          <p>
                            <strong>Type:</strong>{" "}
                            {activity.type.replace("_", " ")}
                          </p>
                        </div>
                      </div>

                      <Button size="sm" variant="ghost">
                        <Icons.eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-8">
                <Icons.filter className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  No matching activity
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

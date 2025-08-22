"use client";

import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { formatRelativeTime } from "@/lib/utils";

// Mock data for recent activity - in real app this would come from API
const recentActivities = [
  {
    id: "1",
    type: "statement_delivered",
    description: "Statement delivered to Google Drive",
    account: "Chase Checking ••••1234",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: "success",
  },
  {
    id: "2",
    type: "sync_completed",
    description: "Account sync completed",
    account: "Bank of America Savings ••••5678",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: "success",
  },
  {
    id: "3",
    type: "reauth_required",
    description: "Reconnection required",
    account: "Wells Fargo Credit ••••9012",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    status: "warning",
  },
  {
    id: "4",
    type: "statement_failed",
    description: "Statement delivery failed",
    account: "Capital One Checking ••••3456",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    status: "error",
  },
  {
    id: "5",
    type: "account_connected",
    description: "New account connected",
    account: "American Express ••••7890",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    status: "success",
  },
];

function getActivityIcon(type: string) {
  switch (type) {
    case "statement_delivered":
      return Icons.check;
    case "sync_completed":
      return Icons.activity;
    case "reauth_required":
      return Icons.warning;
    case "statement_failed":
      return Icons.warning;
    case "account_connected":
      return Icons.plus;
    default:
      return Icons.activity;
  }
}

function getActivityBadgeVariant(status: string) {
  switch (status) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return "secondary";
  }
}

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => {
        const IconComponent = getActivityIcon(activity.type);

        return (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.status === "success"
                    ? "bg-green-100 dark:bg-green-900"
                    : activity.status === "warning"
                      ? "bg-yellow-100 dark:bg-yellow-900"
                      : activity.status === "error"
                        ? "bg-red-100 dark:bg-red-900"
                        : "bg-gray-100 dark:bg-gray-900"
                }`}
              >
                <IconComponent
                  className={`h-4 w-4 ${
                    activity.status === "success"
                      ? "text-green-600 dark:text-green-300"
                      : activity.status === "warning"
                        ? "text-yellow-600 dark:text-yellow-300"
                        : activity.status === "error"
                          ? "text-red-600 dark:text-red-300"
                          : "text-gray-600 dark:text-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">
                  {activity.description}
                </p>
                <Badge
                  variant={getActivityBadgeVariant(activity.status)}
                  className="text-xs"
                >
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.account}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      })}

      <div className="pt-2">
        <button className="text-sm text-primary hover:underline">
          View all activity →
        </button>
      </div>
    </div>
  );
}

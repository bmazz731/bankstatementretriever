"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import apiClient from "@/lib/api";

export function DashboardStats() {
  const { data: accounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => apiClient.getAccounts(),
  });

  const { data: destinations } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => apiClient.getDestinations(),
  });

  const accountData = accounts?.data?.accounts || [];
  const destinationData = destinations?.data?.destinations || [];

  const activeAccounts = accountData.filter(
    (account) => account.status === "active",
  ).length;
  const totalAccounts = accountData.length;
  const connectedAccounts = accountData.filter(
    (account) => account.connection?.status === "active",
  ).length;
  const reauthRequired = accountData.filter(
    (account) => account.connection?.status === "reauth_required",
  ).length;

  const stats = [
    {
      title: "Total Accounts",
      value: totalAccounts,
      description: `${activeAccounts} active`,
      icon: Icons.building,
      trend: null,
    },
    {
      title: "Connected",
      value: connectedAccounts,
      description: "Healthy connections",
      icon: Icons.zap,
      trend: connectedAccounts === totalAccounts ? "up" : null,
    },
    {
      title: "Need Attention",
      value: reauthRequired,
      description: "Reauth required",
      icon: Icons.warning,
      trend: reauthRequired > 0 ? "down" : null,
    },
    {
      title: "Destinations",
      value: destinationData.length,
      description: "Storage configured",
      icon: Icons.upload,
      trend: null,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

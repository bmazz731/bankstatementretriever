"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useNotificationStore } from "@/stores/dashboard";
import apiClient from "@/lib/api";
import type { Account } from "@/types";

interface AccountActionsProps {
  account: Account;
  onViewStatements: () => void;
  onBackfill: () => void;
}

export function AccountActions({
  account,
  onViewStatements,
  onBackfill,
}: AccountActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const syncMutation = useMutation({
    mutationFn: (accountId: string) => apiClient.syncAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      addNotification({
        type: "success",
        title: "Sync started",
        description: "Account sync has been queued successfully",
      });
    },
    onError: (error: any) => {
      addNotification({
        type: "error",
        title: "Sync failed",
        description: error.message || "Failed to start account sync",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (accountId: string) => apiClient.deleteAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      addNotification({
        type: "success",
        title: "Account deactivated",
        description: "Account has been successfully deactivated",
      });
    },
    onError: (error: any) => {
      addNotification({
        type: "error",
        title: "Deactivation failed",
        description: error.message || "Failed to deactivate account",
      });
    },
  });

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => syncMutation.mutate(account.id)}
        disabled={syncMutation.isPending}
      >
        {syncMutation.isPending ? (
          <Icons.spinner className="mr-2 h-3 w-3 animate-spin" />
        ) : (
          <Icons.activity className="mr-2 h-3 w-3" />
        )}
        Sync
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={onViewStatements}
        disabled={!account.statements_supported}
      >
        <Icons.eye className="mr-2 h-3 w-3" />
        Statements
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={onBackfill}
        disabled={!account.statements_supported}
      >
        <Icons.calendar className="mr-2 h-3 w-3" />
        Backfill
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          if (confirm("Are you sure you want to deactivate this account?")) {
            deleteMutation.mutate(account.id);
          }
        }}
        disabled={deleteMutation.isPending}
      >
        <Icons.trash className="h-3 w-3" />
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useNotificationStore } from "@/stores/dashboard";
import { formatDate } from "@/lib/utils";
import apiClient from "@/lib/api";
import type { Account } from "@/types";

interface BackfillDialogProps {
  account: Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BackfillDialog({
  account,
  open,
  onOpenChange,
}: BackfillDialogProps) {
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const backfillMutation = useMutation({
    mutationFn: ({
      accountId,
      range_start,
      range_end,
    }: {
      accountId: string;
      range_start: string;
      range_end: string;
    }) => apiClient.backfillAccount(accountId, range_start, range_end),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["statements", account.id] });
      addNotification({
        type: "success",
        title: "Backfill started",
        description: "Historical statement retrieval has been queued",
      });
      onOpenChange(false);
      setRangeStart("");
      setRangeEnd("");
    },
    onError: (error: any) => {
      addNotification({
        type: "error",
        title: "Backfill failed",
        description: error.message || "Failed to start backfill",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rangeStart || !rangeEnd) {
      addNotification({
        type: "error",
        title: "Invalid dates",
        description: "Please select both start and end dates",
      });
      return;
    }

    const startDate = new Date(rangeStart);
    const endDate = new Date(rangeEnd);

    if (startDate >= endDate) {
      addNotification({
        type: "error",
        title: "Invalid date range",
        description: "End date must be after start date",
      });
      return;
    }

    // Check 12-month limit
    const monthsDiff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (monthsDiff > 12) {
      addNotification({
        type: "error",
        title: "Date range too long",
        description: "Backfill range cannot exceed 12 months",
      });
      return;
    }

    backfillMutation.mutate({
      accountId: account.id,
      range_start: rangeStart,
      range_end: rangeEnd,
    });
  };

  const today = new Date().toISOString().split("T")[0];
  const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Backfill Statements</DialogTitle>
          <DialogDescription>
            Retrieve historical statements for {account.name}. Maximum range is
            12 months.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="start-date" className="text-sm font-medium">
              Start Date
            </label>
            <Input
              id="start-date"
              type="date"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              max={today}
              min={oneYearAgo}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="end-date" className="text-sm font-medium">
              End Date
            </label>
            <Input
              id="end-date"
              type="date"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              max={today}
              min={rangeStart || oneYearAgo}
              required
            />
          </div>

          {rangeStart && rangeEnd && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">
                <strong>Preview:</strong> Statements from{" "}
                {formatDate(rangeStart)} to {formatDate(rangeEnd)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This may take several minutes to complete depending on the date
                range.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={backfillMutation.isPending}>
              {backfillMutation.isPending ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Icons.calendar className="mr-2 h-4 w-4" />
                  Start Backfill
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

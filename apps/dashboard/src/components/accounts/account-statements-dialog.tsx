"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { formatDate } from "@/lib/utils";
import apiClient from "@/lib/api";
import type { Account } from "@/types";

interface AccountStatementsDialogProps {
  account: Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountStatementsDialog({
  account,
  open,
  onOpenChange,
}: AccountStatementsDialogProps) {
  const { data: statements, isLoading } = useQuery({
    queryKey: ["statements", account.id],
    queryFn: () => apiClient.getStatements(account.id),
    enabled: open,
  });

  const statementData = statements?.data?.statements || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Statements for {account.name}</DialogTitle>
          <DialogDescription>
            View statement history for this account
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse border rounded-lg p-3">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : statementData.length === 0 ? (
            <div className="text-center py-8">
              <Icons.file className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                No statements found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No statements have been retrieved for this account yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {statementData.map((statement: any) => (
                <div
                  key={statement.statement_id}
                  className="border rounded-lg p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">
                          {formatDate(statement.statement_date)}
                        </h4>
                        <Badge
                          variant={
                            statement.delivered ? "success" : "secondary"
                          }
                        >
                          {statement.delivered ? "Delivered" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Period: {formatDate(statement.period_start)} -{" "}
                        {formatDate(statement.period_end)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Type: {statement.file_type.toUpperCase()}
                        {statement.version > 1 && ` (v${statement.version})`}
                      </p>
                    </div>
                    <div className="text-right">
                      <Icons.file className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

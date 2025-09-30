'use client';

import type { ScanLog } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

export function UserLogsTable({ logs }: { logs: ScanLog[] }) {
  if (logs.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        No scans recorded for your pass yet.
      </p>
    );
  }

  return (
    <div className="border rounded-md shadow-lg hover:shadow-xl transition-shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Scan Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell className="font-mono text-xs">{log.qrData}</TableCell>
              <TableCell>
                <Badge variant={log.isValid ? 'default' : 'destructive'} className={log.isValid ? 'bg-green-500' : ''}>
                  {log.isValid ? (
                    <CheckCircle className="mr-1 h-4 w-4" />
                  ) : (
                    <XCircle className="mr-1 h-4 w-4" />
                  )}
                  {log.isValid ? 'Valid' : 'Invalid'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

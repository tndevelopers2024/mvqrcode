'use client';

import type { ValidationLog } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface ValidationLogsListProps {
  logs: ValidationLog[];
}

export function ValidationLogsList({ logs }: ValidationLogsListProps) {

  if (logs.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No validation attempts yet.</p>;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Scanned Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Validated User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell className="font-mono text-xs">{log.qrData}</TableCell>
              <TableCell>
                <Badge variant={log.isValid ? 'default' : 'destructive'} className={log.isValid ? 'bg-green-500' : ''}>
                  {log.isValid ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
                  {log.isValid ? 'Valid' : 'Invalid'}
                </Badge>
              </TableCell>
              <TableCell>{log.isValid ? log.validatedUserDetails?.name : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

'use client';

import { useEffect, useState, useMemo } from 'react';
import { getScanLogs, getUserLogs } from '@/lib/api';
import type { ValidationLog } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ValidationLogsList ({ userId }: { userId?: string }) {
  const [logs, setLogs] = useState<ValidationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'valid' | 'invalid'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);

        const res = userId
          ? await getUserLogs(userId) // user-specific logs
          : await getScanLogs();      // all logs (admin only)

        // Adapt backend response into ValidationLog[]
        const adaptedLogs: ValidationLog[] = res.data.map((log: any) => ({
          id: log._id,
          qrData: log.qrData,
          isValid: log.isValid,
          timestamp: log.timestamp,
          details: log.details,
          validatedUserDetails: log.user
            ? {
                name: log.user.name,
                designation: log.user.designation,
                city: log.user.city,
                registrationDate: log.user.createdAt,
              }
            : undefined,
          scannedBy: log.scannedBy
            ? {
                id: log.scannedBy._id,
                name: log.scannedBy.name,
                email: log.scannedBy.email,
                role: log.scannedBy.role,
              }
            : undefined,
        }));

        setLogs(adaptedLogs);
      } catch (err: any) {
        console.error('Failed to fetch logs:', err);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message || 'Failed to load logs',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [userId, toast]);

  // 🔍 Apply filter + search
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (filter === 'valid' && !log.isValid) return false;
      if (filter === 'invalid' && log.isValid) return false;

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const userName = log.validatedUserDetails?.name?.toLowerCase() || '';
        const userCity = log.validatedUserDetails?.city?.toLowerCase() || '';
        const scannedBy = log.scannedBy?.name?.toLowerCase() || '';
        if (
          !userName.includes(term) &&
          !userCity.includes(term) &&
          !scannedBy.includes(term)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [logs, filter, searchTerm]);

  if (loading) {
    return <p className="text-center text-muted-foreground mt-8">Loading logs...</p>;
  }

  if (filteredLogs.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No logs found.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex gap-2 items-center">
          <Select
            value={filter}
            onValueChange={(val) => setFilter(val as 'all' | 'valid' | 'invalid')}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="valid">Valid</SelectItem>
              <SelectItem value="invalid">Invalid</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search by name, city, or scanner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[250px]"
          />
        </div>
        <Button onClick={() => import('@/lib/utils').then(mod => mod.downloadAsExcel(filteredLogs, 'logs'))}>
          Download Excel
        </Button>
      </div>

      {/* Logs Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Scanned Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Validated User</TableHead>
              <TableHead>Scanned By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="font-mono text-xs">{log.qrData}</TableCell>
                <TableCell>
                  <Badge
                    variant={log.isValid ? 'default' : 'destructive'}
                    className={log.isValid ? 'bg-green-500' : ''}
                  >
                    {log.isValid ? (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    {log.isValid ? 'Valid' : 'Invalid'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {log.isValid
                    ? log.validatedUserDetails?.name || 'N/A'
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {log.scannedBy
                    ? `${log.scannedBy.name} (${log.scannedBy.role})`
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

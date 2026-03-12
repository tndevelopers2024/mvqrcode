'use client';

import { useEffect, useState } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AnalyticsDashboard } from '@/components/admin/analytics/AnalyticsDashboard';
import { getUsers, getScanLogs } from '@/lib/api';
import type { User, ScanLog } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<User[]>([]);
  const [validationLogs, setValidationLogs] = useState<ScanLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Fetch registrations (normal users only)
        const usersRes = await getUsers();
        setRegistrations(usersRes.data.filter((u) => u.role === 'user'));

        // ✅ Fetch scan logs
        const logsRes = await getScanLogs();
        setValidationLogs(logsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminDashboard activeTab="dashboard">
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#5d01f2]" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </AdminDashboard>
    );
  }

  return (
    <AdminDashboard activeTab="dashboard">
      <div className="mt-6">
        <AnalyticsDashboard registrations={registrations} validationLogs={validationLogs} />
      </div>
    </AdminDashboard>
  );
}

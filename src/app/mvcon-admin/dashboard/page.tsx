'use client';

import { useEffect, useState } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AnalyticsDashboard } from '@/components/admin/analytics/AnalyticsDashboard';
import { getUsers, getScanLogs } from '@/lib/api';
import type { User, ScanLog } from '@/lib/api';

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
        <p className="text-center text-muted-foreground mt-8">Loading dashboard...</p>
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

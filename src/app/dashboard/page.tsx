'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, getUserLogs } from '@/lib/api';
import type { User, ScanLog } from '@/lib/api';
import { UserProfileCard } from '@/components/user/UserProfileCard';
import { QRPassCard } from '@/components/user/QRPassCard';
import { UserLogsTable } from '@/components/user/UserLogsTable';
import { Loader2 } from 'lucide-react';
import Navbar from "@/components/navbar/navbar";

export default function UserDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await getCurrentUser();
        const currentUser = userRes.data;
        if (currentUser) {
          setUser(currentUser);

          const logsRes = await getUserLogs(currentUser._id || currentUser.id);
          setLogs(logsRes.data);
        }
      } catch (err) {
        console.error('Failed to load user dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-3" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-8">
        You must be logged in to view the dashboard.
      </p>
    );
  }

  return (
    <>
    <Navbar />
    <div className="space-y-6 max-w-7xl mx-auto pt-36">
      {/* Top Grid: Profile + QR */}
      <div className="grid gap-6 md:grid-cols-2">
        <UserProfileCard user={user} />
        <QRPassCard user={user} />
      </div>

      {/* Logs */}
      <UserLogsTable logs={logs} />
    </div>
    </>
  );
}

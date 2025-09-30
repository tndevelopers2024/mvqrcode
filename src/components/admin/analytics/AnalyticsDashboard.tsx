'use client';

import type { Registration, ValidationLog } from '@/lib/types';
import { StatCard } from './StatCard';
import { Users, Scan, CheckCircle, XCircle } from 'lucide-react';
import { RegistrationsChart } from './RegistrationsChart';

interface AnalyticsDashboardProps {
  registrations: Registration[];
  validationLogs: ValidationLog[];
}

export function AnalyticsDashboard({ registrations, validationLogs }: AnalyticsDashboardProps) {
  const totalRegistrations = registrations.length;
  const totalScans = validationLogs.length;
  const validScans = validationLogs.filter(log => log.isValid).length;
  const invalidScans = totalScans - validScans;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Registrations" value={totalRegistrations} icon={Users} />
        <StatCard title="Total Scans" value={totalScans} icon={Scan} />
        <StatCard title="Valid Scans" value={validScans} icon={CheckCircle} variant="success" />
        <StatCard title="Invalid Scans" value={invalidScans} icon={XCircle} variant="destructive" />
      </div>
      <RegistrationsChart registrations={registrations} />
    </div>
  );
}

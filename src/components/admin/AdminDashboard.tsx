'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardContent } from '../ui/card';
import { useRouter, usePathname } from 'next/navigation';

type AdminTab = 'dashboard' | 'validate' | 'registrations' | 'logs';

interface AdminDashboardProps {
  children: React.ReactNode;
  activeTab: AdminTab;
}

export function AdminDashboard({ children, activeTab }: AdminDashboardProps) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/admin/${value}`);
  };

  return (
    <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="validate">Validate QR</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        {children}
        </Tabs>
    </CardContent>
  );
}

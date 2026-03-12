'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardContent } from '../ui/card';
import { useRouter } from 'next/navigation';

type AdminTab = 'dashboard' | 'validate' | 'registrations' | 'abstracts' | 'logs';

interface AdminDashboardProps {
  children: React.ReactNode;
  activeTab: AdminTab;
}

export function AdminDashboard({ children, activeTab }: AdminDashboardProps) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/mvcon-admin/${value}`);
  };

  return (
    <CardContent>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="validate">Validate QR</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="abstracts">Abstracts</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </CardContent>
  );
}

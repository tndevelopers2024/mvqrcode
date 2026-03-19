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
        <TabsList className="w-full h-auto flex flex-nowrap overflow-x-auto justify-start md:grid md:grid-cols-5 md:h-10 md:justify-center p-1 mobile-scrollbar">
          <TabsTrigger value="dashboard" className="flex-shrink-0">Dashboard</TabsTrigger>
          <TabsTrigger value="validate" className="flex-shrink-0">Validate QR</TabsTrigger>
          <TabsTrigger value="registrations" className="flex-shrink-0">Registrations</TabsTrigger>
          <TabsTrigger value="abstracts" className="flex-shrink-0">Abstracts</TabsTrigger>
          <TabsTrigger value="logs" className="flex-shrink-0">Logs</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </CardContent>
  );
}

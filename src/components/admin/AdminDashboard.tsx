'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardContent } from '../ui/card';
import { useRouter } from 'next/navigation';

interface AdminDashboardProps {
  children: React.ReactNode;
  activeTab: 'validate' | 'registrations' | 'logs';
}

export function AdminDashboard({ children, activeTab }: AdminDashboardProps) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    if (value === 'validate') {
      router.push(`/admin`);
    } else {
      router.push(`/admin/${value}`);
    }
  };

  return (
    <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="validate">Validate QR</TabsTrigger>
            <TabsTrigger value="registrations">All Registrations</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        {children}
        </Tabs>
    </CardContent>
  );
}

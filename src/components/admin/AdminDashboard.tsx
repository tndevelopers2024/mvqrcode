'use client';

import type { Registration } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRValidator } from './QRValidator';
import { RegistrationsList } from './RegistrationsList';
import { CardContent } from '../ui/card';

interface AdminDashboardProps {
  initialRegistrations: Registration[];
}

export function AdminDashboard({ initialRegistrations }: AdminDashboardProps) {
  return (
    <CardContent>
        <Tabs defaultValue="validate">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="validate">Validate QR</TabsTrigger>
            <TabsTrigger value="registrations">All Registrations</TabsTrigger>
        </TabsList>
        <TabsContent value="validate" className="mt-6">
            <QRValidator />
        </TabsContent>
        <TabsContent value="registrations" className="mt-6">
            <RegistrationsList registrations={initialRegistrations} />
        </TabsContent>
        </Tabs>
    </CardContent>
  );
}

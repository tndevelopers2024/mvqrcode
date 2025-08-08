import { getAllRegistrations } from '@/app/actions';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Header } from '@/components/Header';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminPage() {
  const initialRegistrations = await getAllRegistrations();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Card className="w-full shadow-2xl">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
                <CardDescription>Validate QR codes and manage registered attendees.</CardDescription>
            </CardHeader>
            <AdminDashboard initialRegistrations={initialRegistrations} />
        </Card>
      </main>
    </div>
  );
}

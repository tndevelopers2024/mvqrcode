import { Header } from '@/components/Header';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Card className="w-full shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
                    <CardDescription>Validate QR codes, view logs and manage registered attendees.</CardDescription>
                </CardHeader>
                {children}
            </Card>
        </main>
    </div>
  );
}

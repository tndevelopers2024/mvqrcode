import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { RegistrationsList } from '@/components/admin/RegistrationsList';
import { AdminRegistrationForm } from '@/components/admin/AdminRegistrationForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function RegistrationsPage() {
    return (
        <AdminDashboard activeTab="registrations">
            <div className="mt-6">
                <Tabs defaultValue="list" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="list">All Registrations</TabsTrigger>
                        <TabsTrigger value="add">Add New Registration</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list">
                        <RegistrationsList />
                    </TabsContent>
                    <TabsContent value="add" className="max-w-4xl mx-auto py-4">
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">New Registration</h2>
                            <AdminRegistrationForm />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminDashboard>
    );
}


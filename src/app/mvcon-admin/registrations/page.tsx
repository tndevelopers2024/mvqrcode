import { getAllRegistrations } from '@/app/actions';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { RegistrationsList } from '@/components/admin/RegistrationsList';

export default async function RegistrationsPage() {
    const initialRegistrations = await getAllRegistrations();
    return (
        <AdminDashboard activeTab="registrations">
            <div className="mt-6">
                <RegistrationsList registrations={initialRegistrations} />
            </div>
        </AdminDashboard>
    );
}

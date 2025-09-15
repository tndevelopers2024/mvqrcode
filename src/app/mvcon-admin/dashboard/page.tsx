import { getAllRegistrations, getValidationLogs } from '@/app/actions';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AnalyticsDashboard } from '@/components/admin/analytics/AnalyticsDashboard';

export default async function DashboardPage() {
    const registrations = await getAllRegistrations();
    const validationLogs = await getValidationLogs();
    
    return (
        <AdminDashboard activeTab="dashboard">
            <div className="mt-6">
                <AnalyticsDashboard registrations={registrations} validationLogs={validationLogs} />
            </div>
        </AdminDashboard>
    );
}

import { getValidationLogs } from '@/app/actions';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ValidationLogsList } from '@/components/admin/ValidationLogsList';

export default async function LogsPage() {
    const validationLogs = await getValidationLogs();
    return (
        <AdminDashboard initialRegistrations={[]} activeTab="logs">
            <div className="mt-6">
                <ValidationLogsList logs={validationLogs} />
            </div>
        </AdminDashboard>
    );
}

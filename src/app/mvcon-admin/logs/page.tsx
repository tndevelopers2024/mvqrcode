import { getValidationLogs } from '@/app/actions';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import ValidationLogsList from '@/components/admin/ValidationLogsList';

export default async function LogsPage() {

    return (
        <AdminDashboard activeTab="logs">
            <div className="mt-6">
                <ValidationLogsList  />
            </div>
        </AdminDashboard>
    );
}

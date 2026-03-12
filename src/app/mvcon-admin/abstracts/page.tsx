import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AbstractsList } from '@/components/admin/AbstractsList';

export default function AdminAbstractsPage() {
    return (
        <AdminDashboard activeTab="abstracts">
            <div className="mt-6">
                <AbstractsList />
            </div>
        </AdminDashboard>
    );
}


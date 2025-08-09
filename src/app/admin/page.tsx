import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { QRValidator } from '@/components/admin/QRValidator';

export default function AdminPage() {
  return (
    <AdminDashboard initialRegistrations={[]} activeTab="validate">
        <div className="mt-6">
            <QRValidator />
        </div>
    </AdminDashboard>
  );
}

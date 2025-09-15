import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { QRValidator } from '@/components/admin/QRValidator';

export default function ValidatePage() {
  return (
    <AdminDashboard activeTab="validate">
        <div className="mt-6">
            <QRValidator />
        </div>
    </AdminDashboard>
  );
}

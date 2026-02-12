'use client';

import { useState, useMemo, useEffect } from 'react';
import type { User } from '@/lib/api';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Search, User as UserIcon, Mail, Loader2 } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
  DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QRCodeDisplay } from '../QRCodeDisplay';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { resendRegistrationEmail, getAllUserRoleUsers } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function RegistrationsList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [userToResend, setUserToResend] = useState<User | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();

  // Fetch users on mount
  useEffect(() => {
    (async () => {
      try {
        const roleUsers = await getAllUserRoleUsers();
        setUsers(roleUsers);
      } catch (err: any) {
        console.error('Failed to load users:', err.message);
      }
    })();
  }, []);

  const handleResendEmail = async (user: User) => {
    if (!user._id) return;

    setResendingId(user._id);
    try {
      await resendRegistrationEmail(user._id);
      toast({
        title: "Email Sent Successfully",
        description: `New credentials sent to ${user.email}`,
      });
    } catch (err: any) {
      toast({
        title: "Failed to Resend Email",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setResendingId(null);
      setUserToResend(null);
    }
  };

  // Filter search
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  if (users.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No users found.</p>;
  }
  console.log('Filtered Users:', filteredUsers);
  return (
    <>
      <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedUser(null)}>
        {/* Search Bar */}
        <div className="mb-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => {
            const imageBase = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space';
            const dataToExport = filteredUsers.map(u => ({
              ...u,
              profileImage: u.profileImage ? `${imageBase}${u.profileImage}` : '',
              qrCodeImage: u.qrCodeImage ? `${imageBase}${u.qrCodeImage}` : '',
            }));
            import('@/lib/utils').then(mod => mod.downloadAsExcel(dataToExport, 'registrations'));
          }}>
            Download Excel
          </Button>
        </div>

        {/* Users Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Designation</TableHead>
                <TableHead className="hidden md:table-cell">City</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, index) => (
                  <TableRow key={u._id ?? u.email ?? index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">

                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space'}${u.profileImage ?? ''}`} />
                          <AvatarFallback>
                            <UserIcon className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        {u.name}
                      </div>
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{u.designation}</TableCell>
                    <TableCell className="hidden md:table-cell">{u.city}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Resend Registration Email"
                        disabled={resendingId === u._id}
                        onClick={() => {
                          setUserToResend(u);
                          setIsConfirmOpen(true);
                        }}
                      >
                        {resendingId === u._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </Button>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedUser(u)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View QR Code</span>
                        </Button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* QR Dialog */}
        {selectedUser && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>QR Pass for {selectedUser.name}</DialogTitle>
            </DialogHeader>
            <div className="pt-4">
              {/* If QRCodeDisplay expects Registration type, map fields */}
              <QRCodeDisplay
                registration={{
                  id: (selectedUser._id || selectedUser.id)!,
                  name: selectedUser.name,
                  email: selectedUser.email,
                  designation: selectedUser.designation,
                  city: selectedUser.city,
                  registrationDate: new Date().toISOString(),
                  qrCodeImage: selectedUser.qrCodeImage ?? undefined,
                  qrCodeContent: selectedUser._id || selectedUser.id || '',
                  profileImage: selectedUser.profileImage ?? undefined,
                }}
              />
            </div>
          </DialogContent>
        )}
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resend Registration Email?</AlertDialogTitle>
            <AlertDialogDescription>
              This will generate a <strong>NEW password</strong> and send it along with the QR code to <strong>{userToResend?.email}</strong>. The old password will no longer work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToResend(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#5d01f2] hover:bg-[#4b01c4]"
              onClick={() => userToResend && handleResendEmail(userToResend)}
            >
              Confirm & Resend
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

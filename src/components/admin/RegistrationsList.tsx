'use client';

import { useState, useMemo, useEffect } from 'react';
import type { User } from '@/lib/api';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Search, User as UserIcon, Mail, Loader2, X, Trash2 } from 'lucide-react';
import { DatePickerWithRange } from '../ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';
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
import { resendRegistrationEmail, getAllUserRoleUsers, deleteUser } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function RegistrationsList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [userToResend, setUserToResend] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch users on mount
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const roleUsers = await getAllUserRoleUsers();
      setUsers(roleUsers);
    } catch (err: any) {
      console.error('Failed to load users:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  const handleDeleteUser = async () => {
    if (!userToDelete?._id) return;

    setIsDeleting(true);
    try {
      await deleteUser(userToDelete._id);
      
      setUsers(prev => prev.filter(u => u._id !== userToDelete._id));
      
      toast({
        title: "User Deleted",
        description: `Registration for ${userToDelete.name} has been removed.`,
      });
    } catch (err: any) {
      toast({
        title: "Failed to Delete User",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  // Filter search and date
  const filteredUsers = useMemo(() => {
    let results = users;

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date range filter
    if (dateRange?.from) {
      const from = startOfDay(dateRange.from);
      const to = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);
      
      results = results.filter((u) => {
        if (!u.createdAt && !u.registrationDate) return false;
        const regDate = new Date(u.registrationDate || u.createdAt!);
        return isWithinInterval(regDate, { start: from, end: to });
      });
    }

    return results;
  }, [searchTerm, dateRange, users]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-[#5d01f2]" />
        <p className="text-sm text-muted-foreground">Loading attendees...</p>
      </div>
    );
  }

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

          {/* Date Range Filter */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <DatePickerWithRange 
              date={dateRange} 
              setDate={setDateRange} 
            />
            {dateRange && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setDateRange(undefined)}
                className="h-9 w-9"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Button onClick={() => {
            const imageBase = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space';
            const dataToExport = filteredUsers.map(u => ({
              ...u,
              medicalCouncilNumber: u.medicalCouncilNumber || '',
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
                <TableHead className="hidden lg:table-cell">Medical Council No.</TableHead>
                <TableHead>Reg. Date</TableHead>
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
                    <TableCell className="hidden lg:table-cell">{u.medicalCouncilNumber || "N/A"}</TableCell>
                    <TableCell>
                      {u.registrationDate || u.createdAt 
                        ? new Date(u.registrationDate || u.createdAt!).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : 'N/A'
                      }
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                       <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Delete Registration"
                        onClick={() => {
                          setUserToDelete(u);
                          setIsDeleteConfirmOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
          <DialogContent className="sm:max-w-md" onCloseAutoFocus={(e) => e.preventDefault()}>
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
                  profession: selectedUser.profession,
                  designation: selectedUser.designation,
                  city: selectedUser.city,
                  registrationDate: new Date().toISOString(),
                  qrCodeImage: selectedUser.qrCodeImage ?? undefined,
                  qrCodeContent: selectedUser._id || selectedUser.id || '',
                  profileImage: selectedUser.profileImage ?? undefined,
                  registeredByAdmin: selectedUser.registeredByAdmin,
                }}
                forceBadge={true}
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
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the registration record for <strong>{userToDelete?.name}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteUser();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

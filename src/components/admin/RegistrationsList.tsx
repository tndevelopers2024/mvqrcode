'use client';

import { useState, useMemo, useEffect } from 'react';
import { getAllUserRoleUsers } from '@/lib/api'; // ⬅️ import API
import type { User } from '@/lib/api';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Search, User as UserIcon } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { QRCodeDisplay } from '../QRCodeDisplay';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function RegistrationsList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedUser(null)}>
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
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
  <TableRow key={u.id ?? u.email ?? index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
              
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`http://localhost:5001${u.profileImage ?? ''}`} />
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
                  <TableCell className="text-right">
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
                id: selectedUser.id!,
                name: selectedUser.name,
                email: selectedUser.email,
                designation: selectedUser.designation,
                city: selectedUser.city,
                registrationDate: new Date().toISOString(),
                qrCodeImage: selectedUser.qrCodeImage ?? undefined,
                qrCodeContent: selectedUser.id ?? '',
                profileImage: selectedUser.profileImage ?? undefined,
              }}
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

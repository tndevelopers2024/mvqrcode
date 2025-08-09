'use client';

import { useState, useMemo } from 'react';
import type { Registration } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QRCodeDisplay } from '../QRCodeDisplay';
import { Input } from '@/components/ui/input';

interface RegistrationsListProps {
  registrations: Registration[];
}

export function RegistrationsList({ registrations }: RegistrationsListProps) {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegistrations = useMemo(() => {
    if (!searchTerm) {
      return registrations;
    }
    return registrations.filter(
      (reg) =>
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, registrations]);

  if (registrations.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No registrations yet.</p>;
  }

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedRegistration(null)}>
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
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell className="font-medium">{reg.name}</TableCell>
                  <TableCell>{reg.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{reg.designation}</TableCell>
                  <TableCell className="hidden md:table-cell">{reg.city}</TableCell>
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedRegistration(reg)}>
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
                        No registrations found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedRegistration && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Pass for {selectedRegistration.name}</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <QRCodeDisplay registration={selectedRegistration} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

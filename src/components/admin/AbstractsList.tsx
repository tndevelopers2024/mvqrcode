"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllAbstracts, Abstract } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Search, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function AbstractsList() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch abstracts on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllAbstracts();
        setAbstracts(res);
      } catch (err: any) {
        console.error("Failed to load abstracts:", err.message);
      }
    })();
  }, []);

  // Filter search
  const filteredAbstracts = useMemo(() => {
    if (!searchTerm) return abstracts;
    return abstracts.filter(
      (a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.registerNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, abstracts]);

  if (abstracts.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        No abstracts found.
      </p>
    );
  }

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedAbstract(null)}>
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or register no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Abstracts Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Register No</TableHead>
              <TableHead className="hidden md:table-cell">Institute</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAbstracts.length > 0 ? (
              filteredAbstracts.map((a) => (
                <TableRow key={a._id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>{a.registerNo}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {a.institute}
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize">
                    {a.status}
                  </TableCell>
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedAbstract(a)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Abstract</span>
                      </Button>
                    </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No abstracts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Abstract Dialog */}
      {selectedAbstract && (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Abstract from {selectedAbstract.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Register No:</strong> {selectedAbstract.registerNo}
            </p>
            <p>
              <strong>Email:</strong> {selectedAbstract.email}
            </p>
            <p>
              <strong>Institute:</strong> {selectedAbstract.institute}
            </p>
            <p>
              <strong>Contact:</strong> {selectedAbstract.contact}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{selectedAbstract.status}</span>
            </p>
            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(selectedAbstract.createdAt).toLocaleString()}
            </p>
            <a
              href={`https://mvcon.space${selectedAbstract.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline mt-2"
            >
              <FileText className="h-4 w-4" />
              View Attached File
            </a>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

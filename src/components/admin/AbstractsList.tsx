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
import { Eye, Search, FileText, Trash2, Download, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { deleteAbstract, downloadAllAbstracts as apiDownloadAll } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function AbstractsList() {
  const { toast } = useToast();
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [abstractToDelete, setAbstractToDelete] = useState<Abstract | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

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

  const handleDelete = async () => {
    if (!abstractToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAbstract(abstractToDelete._id);
      setAbstracts((prev) => prev.filter((a) => a._id !== abstractToDelete._id));
      setAbstractToDelete(null);
      toast({
        title: "Successfully deleted",
        description: "The abstract submission has been removed.",
      });
    } catch (err: any) {
      console.error("Failed to delete abstract:", err.message);
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: err.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      await apiDownloadAll();
      toast({
        title: "Download started",
        description: "All abstract files are being downloaded.",
      });
    } catch (err: any) {
      console.error("Failed to download all abstracts:", err.message);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: err.message,
      });
    } finally {
      setIsDownloadingAll(false);
    }
  };

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
      <div className="mb-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or register no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            disabled={isDownloadingAll}
            onClick={handleDownloadAll}
            className="flex gap-2"
          >
            {isDownloadingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download All Files
          </Button>
          <Button onClick={() => {
            const imageBase = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space';
            const dataToExport = filteredAbstracts.map(a => ({
              ...a,
              file: a.file ? `${imageBase}${a.file}` : '',
            }));
            import('@/lib/utils').then(mod => mod.downloadAsExcel(dataToExport, 'abstracts'));
          }}>
            Download Excel
          </Button>
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
                    <div className="flex justify-end gap-1">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setAbstractToDelete(a)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Abstract</span>
                      </Button>
                    </div>
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
              href={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space'}${selectedAbstract.file}`}
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!abstractToDelete} onOpenChange={() => setAbstractToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the abstract submission from <strong>{abstractToDelete?.name}</strong> and remove the attached file from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

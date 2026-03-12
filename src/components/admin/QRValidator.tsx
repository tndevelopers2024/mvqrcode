'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { CheckCircle, Loader2, XCircle, Camera, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { scanQRCode } from '@/lib/api';   // ✅ use api.ts
import type { ValidationResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { QrScanner } from './QrScanner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeDisplay } from '@/components/QRCodeDisplay';

export function QRValidator() {
  const [qrData, setQrData] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isScannerOpen, setScannerOpen] = useState(false);
  const { toast } = useToast();
  const resultTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear result after 5 seconds
  const clearResult = () => {
    setValidationResult(null);
    if (resultTimeoutRef.current) {
      clearTimeout(resultTimeoutRef.current);
      resultTimeoutRef.current = null;
    }
  };

  const handleValidate = () => {
    if (!qrData.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Error',
        description: 'Please paste the QR code data to validate.',
      });
      return;
    }

    startTransition(async () => {
      clearResult();
      try {
        const res = await scanQRCode(qrData); // 🔥 backend API call
        const result: ValidationResult = res.isValid && res.user
          ? {
              isValid: true,
              userDetails: {
                name: res.user.name,
                designation: res.user.designation,
                city: res.user.city,
                registrationDate: res.user.createdAt,
                profileImage: res.user.profileImage,
                qrCodeImage: res.user.qrCodeImage,
              },
              scanCount: res.scanCount,
            }
          : { isValid: false };
        setValidationResult(result);
      } catch (err: any) {
        console.error("Validation failed:", err);
        setValidationResult({ isValid: false });
      }
    });
  };

  const handleScanSuccess = (decodedQrData: string) => {
    setScannerOpen(false);
    startTransition(async () => {
      clearResult();
      setQrData(decodedQrData);
      try {
        const res = await scanQRCode(decodedQrData); // 🔥 backend API call
        const result: ValidationResult = res.isValid && res.user
          ? {
              isValid: true,
              userDetails: {
                name: res.user.name,
                designation: res.user.designation,
                city: res.user.city,
                registrationDate: res.user.createdAt,
                profileImage: res.user.profileImage,
                qrCodeImage: res.user.qrCodeImage,
              },
              scanCount: res.scanCount,
            }
          : { isValid: false };
        setValidationResult(result);
      } catch (err: any) {
        console.error("Validation failed:", err);
        setValidationResult({ isValid: false });
      }
    });
  };

  // Removed auto-clear useEffect to keep popup visible until closed manually.

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Validation</CardTitle>
        <CardDescription>
          Scan a QR code or paste the text from a scanned QR code below to validate a conference pass.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Scanner */}
        <div className="flex gap-2">
          <Dialog open={isScannerOpen} onOpenChange={setScannerOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={clearResult}>
                <Camera className="mr-2" /> Scan QR Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Scan QR Code</DialogTitle>
              </DialogHeader>
              <QrScanner onScanSuccess={handleScanSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Manual input */}
        <div className="flex items-center gap-2">
          <Pencil className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Or paste data manually</span>
        </div>

        <Textarea
          placeholder="Paste QR code data here..."
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          rows={4}
          onClick={clearResult}
        />

        <Button onClick={handleValidate} disabled={isPending || !qrData}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Validate
        </Button>

        {/* Loading state */}
        {isPending && !validationResult && (
          <div className="flex items-center justify-center pt-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Validating...</p>
          </div>
        )}

        {/* Result */}
        {validationResult && (
          <div className="mt-6">
            {validationResult.isValid ? (
              <div className="flex flex-col items-center gap-4">
                 <div className="flex items-center gap-2 text-green-600 mb-2">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-bold text-lg">Pass is Valid</span>
                 </div>

                 {validationResult.scanCount !== undefined && (
                   <div className="bg-[#5d01f2] text-white px-6 py-2 rounded-full font-black text-2xl shadow-lg border-4 border-white animate-bounce">
                     Entry No: {validationResult.scanCount}
                   </div>
                 )}
                 
                 {validationResult.userDetails && (
                   // @ts-ignore - Constructing a partial registration object for display
                   <QRCodeDisplay registration={{
                     id: 'scanned-user',
                     name: validationResult.userDetails.name || '',
                     email: '', // Not needed for display
                     designation: validationResult.userDetails.designation || '',
                     city: validationResult.userDetails.city || '',
                     registrationDate: validationResult.userDetails.registrationDate || '',
                     profileImage: validationResult.userDetails.profileImage,
                     qrCodeImage: validationResult.userDetails.qrCodeImage,
                   }} />
                 )}

                 <Button 
                    variant="outline" 
                    className="mt-4 w-full border-[#5d01f2] text-[#5d01f2] hover:bg-[#5d01f2] hover:text-white font-bold"
                    onClick={() => {
                      setValidationResult(null);
                      setQrData('');
                    }}
                  >
                    Clear & Close Result
                  </Button>
              </div>
            ) : (
              <Card className="border-red-500">
                <CardHeader className="space-y-4">
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <XCircle className="h-6 w-6" />
                    Pass is Invalid
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold"
                    onClick={() => {
                      setValidationResult(null);
                      setQrData('');
                    }}
                  >
                    Close
                  </Button>
                </CardHeader>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

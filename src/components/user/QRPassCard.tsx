'use client';

import type { User, ScanLog } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, FileImage, FileText } from 'lucide-react';

interface QRPassCardProps {
  user: User;
  logs?: ScanLog[];
}

export function QRPassCard({ user, logs = [] }: QRPassCardProps) {
  const qrUrl = user.qrCodeImage
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://mvcon.space'}${user.qrCodeImage}`
    : null;

  const pdfUrl = user.certificateFile
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://mvcon.space'}${user.certificateFile}`
    : null;

  const imgUrl = user.certificateImage
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://mvcon.space'}${user.certificateImage}`
    : null;


  const handleDownload = (url: string | null, fileName: string) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Conference Pass</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {qrUrl ? (
          <>
            <Image
              src={qrUrl}
              alt="QR Code Pass"
              width={220}
              height={220}
              className="rounded-md border shadow-md"
            />
            <p className="text-sm text-muted-foreground text-center">
              Show this QR code at the event for verification.
            </p>
            <Button
              onClick={() => handleDownload(qrUrl, `MVCon-Pass-${user.name.replace(/\s+/g, '_')}.png`)}
              variant="outline"
              className="mt-2"
            >
              <Download className="mr-2 h-4 w-4" /> Download Pass
            </Button>

            {/* Certificates Section */}
            {user.certificateFile && user.certificateImage ? (
              <div className="flex flex-col items-center gap-2 mt-4">
                <p className="text-sm font-medium">
                  🎉 Certificate unlocked on{' '}
                
                </p>
                <div className="flex gap-2">
                  {pdfUrl && (
                    <Button
                      onClick={() =>
                        handleDownload(pdfUrl, `MVCon-Certificate-${user.name.replace(/\s+/g, '_')}.pdf`)
                      }
                      variant="secondary"
                    >
                      <FileText className="mr-2 h-4 w-4" /> PDF
                    </Button>
                  )}
                  {imgUrl && (
                    <Button
                      onClick={() =>
                        handleDownload(imgUrl, `MVCon-Certificate-${user.name.replace(/\s+/g, '_')}.png`)
                      }
                      variant="secondary"
                    >
                      <FileImage className="mr-2 h-4 w-4" /> Image
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-4">
                ✅ You must scan your pass at least once to unlock your certificate.
              </p>
            )}
          </>
        ) : (
          <p className="text-red-500">QR Code not available.</p>
        )}
      </CardContent>
    </Card>
  );
}

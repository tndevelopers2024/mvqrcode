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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://mvcon.space';

  const qrUrl = user.qrCodeImage ? `${backendUrl}${user.qrCodeImage}` : null;
  const pdfUrl = user.certificateFile ? `${backendUrl}${user.certificateFile}` : null;
  const imgUrl = user.certificateImage ? `${backendUrl}${user.certificateImage}` : null;

  const handleDownload = async (url: string | null, fileName: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed', error);
    }
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

            {/* Download Pass Button */}
            <Button
              onClick={() =>
                handleDownload(
                  qrUrl,
                  `MVCon-Pass-${(user.name || 'Guest').replace(/\s+/g, '_')}.png`
                )
              }
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
                  {logs.length > 0 ? new Date(logs[0].createdAt).toLocaleDateString() : 'completion'}
                </p>
                <div className="flex gap-2">
                  {pdfUrl && (
                    <Button
                      onClick={() =>
                        handleDownload(
                          pdfUrl,
                          `MVCon-Certificate-${(user.name || 'Guest').replace(/\s+/g, '_')}.pdf`
                        )
                      }
                      variant="secondary"
                    >
                      <FileText className="mr-2 h-4 w-4" /> PDF
                    </Button>
                  )}
                  {imgUrl && (
                    <Button
                      onClick={() =>
                        handleDownload(
                          imgUrl,
                          `MVCon-Certificate-${(user.name || 'Guest').replace(/\s+/g, '_')}.png`
                        )
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

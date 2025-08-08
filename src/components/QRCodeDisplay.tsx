'use client';

import Image from 'next/image';
import type { Registration } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

interface QRCodeDisplayProps {
  registration: Registration;
}

export function QRCodeDisplay({ registration }: QRCodeDisplayProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full shadow-2xl print:shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Registration Confirmed!</CardTitle>
        <CardDescription className="text-lg pt-2">Here is your conference pass. Please save it.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="p-4 bg-white rounded-lg shadow-inner">
          <Image
            src={registration.qrCodeDataUri}
            alt="Registration QR Code"
            width={256}
            height={256}
            className="rounded-md"
            data-ai-hint="qr code"
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl">{registration.name}</p>
          <p className="text-muted-foreground">{registration.designation} from {registration.city}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 print:hidden">
        <Button asChild>
          <a
            href={registration.qrCodeDataUri}
            download={`MV-Conference-Pass-${registration.name.replace(/\s/g, '_')}.png`}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print Pass
        </Button>
      </CardFooter>
    </Card>
  );
}

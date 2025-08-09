
'use client';

import Image from 'next/image';
import type { Registration } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, MountainIcon, Printer } from 'lucide-react';

interface QRCodeDisplayProps {
  registration: Registration;
}

const Logo = () => (
    <div className="flex items-center justify-center text-white">
      <MountainIcon className="h-8 w-8" />
    </div>
);

export function QRCodeDisplay({ registration }: QRCodeDisplayProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
        <div className="w-full max-w-md mx-auto">
            <Card className="w-full shadow-2xl print:shadow-none bg-gradient-to-br from-primary via-primary to-accent rounded-2xl">
              <div className="p-6 text-primary-foreground">
                <div className="flex items-center justify-between pb-4 border-b border-primary-foreground/20">
                    <div className="flex items-center gap-2">
                        <Logo />
                        <span className="font-bold text-lg">MV International Conference</span>
                    </div>
                </div>
              </div>
              <CardContent className="p-6 bg-card rounded-b-2xl">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-1 text-center sm:text-left">
                        <p className="font-bold text-3xl">{registration.name}</p>
                        <p className="text-muted-foreground text-lg">{registration.designation}</p>
                        <p className="text-muted-foreground">{registration.city}</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg shadow-inner">
                      <Image
                        src={registration.qrCodeDataUri}
                        alt="Registration QR Code"
                        width={128}
                        height={128}
                        className="rounded-md"
                        data-ai-hint="qr code"
                      />
                    </div>
                </div>
              </CardContent>
            </Card>
        </div>

        <div className="flex justify-center gap-4 mt-6 print:hidden">
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
        </div>
    </div>
  );
}

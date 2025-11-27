
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Registration } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, MountainIcon, Printer, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';


interface QRCodeDisplayProps {
  registration: Registration;
}


export function QRCodeDisplay({ registration }: QRCodeDisplayProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `MV-Conference-Pass-${registration.name}`,
  });

  const handleDownload = async () => {
    if (componentRef.current) {
      try {
        const canvas = await html2canvas(componentRef.current, {
          scale: 2, // Higher resolution
          backgroundColor: null, // Transparent background if needed
          useCORS: true, // Enable CORS for images
        });

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `MV-Conference-Pass-${(registration.name || 'pass').replace(/\s/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Failed to download card image:', error);
      }
    }
  };



  return (
    <div className="w-full">
        <div className="w-full max-w-md mx-auto">
            <div ref={componentRef} className="p-4">
            <Card className="w-full max-w-[350px] mx-auto shadow-xl print:shadow-none overflow-hidden border-0 rounded-xl">
              {/* Header */}
              <div className="bg-[#3b4d99] text-white py-3 text-center">
                 <h4 className="font-bold text-sm tracking-wide">MVCON 2026</h4>
              </div>

              <CardContent className="p-6 bg-white flex flex-col items-center gap-4">
                
                {/* Avatar and QR Row */}
                <div className="flex items-center justify-center gap-6 w-full">
                    {/* Avatar */}
                    <Avatar className="w-20 h-20 border-2 border-gray-100 shadow-sm">
                        <AvatarImage src={`https://mvcon.space${registration.profileImage}`} className="object-cover" />
                        <AvatarFallback>
                            <UserIcon className="w-8 h-8 text-gray-400" />
                        </AvatarFallback>
                    </Avatar>

                    {/* QR Code */}
                    <div className="bg-white p-1 rounded-lg">
                      <img
                        src={`https://mvcon.space${registration.qrCodeImage}`}
                        alt="QR Code"
                        className="w-24 h-24 object-contain" 
                        data-ai-hint="qr code"
                      />
                    </div>
                </div>

                {/* Text Details */}
                <div className="text-center mt-2">
                    <p className="font-bold text-2xl text-[#1e293b] tracking-tight">{registration.name}</p>
                    <p className="text-[#64748b] text-sm font-medium mt-1">{registration.designation}</p>
                    <p className="text-[#94a3b8] text-sm mt-0.5">{registration.city}</p>
                </div>

              </CardContent>
            </Card>
            </div>
        </div>

        <div className="flex justify-center gap-4 mt-6 print:hidden">
            <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
            <Button variant="outline" onClick={() => handlePrint()}>
              <Printer className="mr-2 h-4 w-4" />
              Print Pass
            </Button>
        </div>
    </div>
  );
}

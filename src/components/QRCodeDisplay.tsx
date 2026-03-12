
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Registration } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, MountainIcon, Printer, User as UserIcon, Loader2 } from 'lucide-react';
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
      <div className="w-full max-w-sm mx-auto">
        <div ref={componentRef} className="p-4 flex justify-center bg-gray-50 print:p-0 print:bg-white">
          {registration.registeredByAdmin ? (
            /* Badge-style Card adjusted for 10cm x 15cm size */
            <div className="w-[100mm] h-[150mm] border shadow-2xl rounded-2xl overflow-hidden bg-white flex flex-col items-center p-0 print:shadow-none print:border print:rounded-none">
              {/* Top Section with Logo */}
              <div className="w-full h-[40mm] bg-[#3b4d99] flex flex-col items-center justify-center p-4 relative">
                <div className="bg-white p-2 px-4 rounded-xl shadow-sm flex flex-col items-center gap-1">
                  <img src="/images/final-logo.png" alt="Logo" className="h-[15mm] object-contain" />
                  <span className="text-[14px] font-black text-[#3b4d99] tracking-[0.2em] leading-none">2026</span>
                </div>
              </div>

              {/* Badge Body */}
              <div className="flex-1 w-full flex flex-col items-center px-6 py-3 relative overflow-hidden">
                <div className="absolute -top-8 -left-10 w-32 h-32 rounded-full bg-[#3b4d99]/5 -z-0" />
                <div className="absolute -bottom-10 -right-12 w-40 h-40 rounded-full bg-[#3b4d99]/5 -z-0" />

                {registration.qrCodeImage ? (
                  <div className="relative z-10 bg-white rounded-2xl shadow-lg border border-slate-100 mb-2">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space'}${registration.qrCodeImage}`}
                      alt="QR Code"
                      className="w-[50mm] h-[50mm] object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-10" />
                )}

                <div className="relative z-10 text-center w-full mt-2">
                  <div className="space-y-2">
                    <h2 className="text-[24px] font-black text-[#1e293b] leading-tight uppercase tracking-tight break-words px-2">
                      {registration.name}
                    </h2>
                    <p className="text-[#3b4d99] font-black text-[18px] uppercase tracking-wider">
                      {registration.profession}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-2 flex flex-col gap-1">
                    <p className="text-[#64748b] text-[12px] font-bold uppercase tracking-widest leading-tight">
                      {registration.designation}
                    </p>
                    <p className="text-[#94a3b8] text-[12px] font-medium italic">
                      {registration.city}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex flex-col items-center gap-2 w-full relative z-10 pb-2">
                  <img src="/images/chennai.png" alt="Chennai Skyline" className="w-full h-[25mm] object-contain" />
                  <div className="text-[10px] text-slate-400 font-bold tracking-widest text-center uppercase">
                    Valid for Main Conference & Workshops
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Classic QR Pass View - Horizontal minimal design */
            <div className="w-full max-w-[400px] border shadow-xl rounded-2xl overflow-hidden bg-white print:shadow-none print:border">
              {/* Header Bar */}
              <div className="bg-[#3b4d99] py-3 flex justify-center items-center">
                <span className="text-white font-black text-sm tracking-[0.2em] uppercase">MVCON 2026</span>
              </div>

              {/* Main Content */}
              <div className="p-8 flex flex-col items-center">
                {/* Photo and QR Row */}
                <div className="flex items-center justify-center gap-6 mb-8 w-full">
                  {/* Avatar / Profile Photo */}
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg ring-1 ring-slate-100">
                      <AvatarImage src={registration.profileImage ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space'}${registration.profileImage}` : undefined} />
                      <AvatarFallback className="bg-slate-50">
                        <UserIcon className="w-12 h-12 text-slate-300" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-2 rounded-xl shadow-md border border-slate-50">
                    {registration.qrCodeImage ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space'}${registration.qrCodeImage}`}
                        alt="QR Code"
                        className="w-20 h-20 object-contain"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-slate-200" />
                      </div>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center space-y-1.5">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                    {registration.name}
                  </h3>
                  <p className="text-[#3b4d99] font-bold text-sm uppercase tracking-wide">
                    {registration.profession}
                  </p>
                  <p className="text-slate-400 font-medium text-xs italic">
                    {registration.city}
                  </p>
                </div>
              </div>

              {/* Decorative bottom accent if needed, otherwise leave clean */}
              <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#3b4d99]/5 to-transparent" />
            </div>
          )}
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

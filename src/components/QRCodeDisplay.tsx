
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
  forceBadge?: boolean;
}


export function QRCodeDisplay({ registration, forceBadge }: QRCodeDisplayProps) {
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



  const nameToDisplay = (() => {
    const rawName = (registration.name || '').trim();
    const profession = (registration.profession || '').trim().replace(/^DELEGATES$/i, 'DELEGATE').toUpperCase();
    
    // Check if profession matches PG, Delegate(s), Faculty, or Committee
    const isDoctorOrStudent = /^(PG|DELEGATE|FACULTY|ORGANISING COMMITTEE|COMMITTEE)/i.test(profession);
    
    // Check if name already has Dr. or Dr (case-insensitive)
    const alreadyHasPrefix = /^Dr\.?\s+/i.test(rawName);
    
    if (isDoctorOrStudent && !alreadyHasPrefix) {
      return `Dr. ${rawName.toUpperCase()}`;
    }
    return rawName.toUpperCase();
  })();

  return (
    <div className="w-full">
      <style>{`
        @media print {
          @page {
            size: 95mm 120mm;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .print-container {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
        }
      `}</style>
      <div className="w-full max-w-sm mx-auto">
        <div className="p-4 flex justify-center bg-gray-50 print-container print:p-0 print:m-0 print:bg-white">
          {forceBadge || registration.registeredByAdmin ? (
            /* Badge-style Card adjusted for custom size (95mm x 120mm) */
            <div 
              ref={componentRef}
              className="w-[95mm] h-[120mm] border shadow-2xl rounded-2xl overflow-hidden bg-white flex flex-col items-center p-0 print:shadow-none print:border-none print:rounded-none print:m-0"
            >
              {/* Top Section with Logo */}
              <div className="w-full h-[24mm] bg-[#3b4d99] flex flex-col items-center justify-center p-3 relative">
                <div className="bg-white p-1.5 px-3 rounded-xl shadow-sm flex flex-col items-center gap-0.5">
                  <img src="/images/final-logo.png" alt="Logo" className="h-[12mm] object-contain" />
                  <span className="text-[12px] font-black text-[#3b4d99] tracking-[0.2em] leading-none">2026</span>
                </div>
              </div>

              {/* Badge Body */}
              <div className="flex-1 w-full flex flex-col items-center px-4 py-2 relative overflow-hidden">
                <div className="absolute -top-6 -left-8 w-24 h-24 rounded-full bg-[#3b4d99]/5 -z-0" />
                <div className="absolute -bottom-8 -right-10 w-32 h-32 rounded-full bg-[#3b4d99]/5 -z-0" />

                {registration.qrCodeImage ? (
                  <div className="relative z-10 bg-white rounded-xl shadow-lg border border-slate-100 mb-1">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space'}${registration.qrCodeImage}`}
                      alt="QR Code"
                      className="w-[36mm] h-[36mm] object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-8" />
                )}

                <div className="relative z-10 text-center w-full mt-2">
                  <div className="space-y-1">
                    <h2 className="text-[28px] font-black text-[#f99511] leading-tight tracking-tight break-words pt-2 px-1">
                      {nameToDisplay}
                    </h2>
                    <p className="text-[#3b4d99] font-black pt-2 text-[22px] uppercase tracking-wider">
                      {registration.profession?.trim().replace(/^DELEGATES$/i, 'DELEGATE')}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex flex-col items-center gap-1.5 w-full relative z-10 pt-4 pb-1.5">
                  <div className="text-center">
                    <p className="text-[12px] font-bold text-[#3b4d99]">
                      Dates : 20,21,22 March 2026
                    </p>
                    <p className="text-[12px] font-bold text-[#1e293b] mt-0.5 leading-tight">
                      Venue : GReaT Ceremonies by GRT Hotels, Chennai
                    </p>
                  </div>
                  <img src="/images/chennai.png" alt="Chennai Skyline" className="w-full h-[18mm] object-contain" />
                </div>
              </div>
            </div>
          ) : (
            /* Classic QR Pass View - Horizontal minimal design */
            <div ref={componentRef} className="w-full max-w-[400px] border shadow-xl rounded-2xl overflow-hidden bg-white print:shadow-none print:border">
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
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    {nameToDisplay}
                  </h3>
                  <p className="text-[#3b4d99] font-bold text-sm uppercase tracking-wide">
                    {registration.profession?.trim().replace(/^DELEGATES$/i, 'DELEGATE')}
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

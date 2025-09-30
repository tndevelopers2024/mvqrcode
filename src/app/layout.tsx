import type {Metadata} from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'MVCon 2026',
  description: 'Welcome to MVCON 2026! Join leading experts, professionals, and innovators for an inspiring conference experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/images/finalLogo.png" />
      </head>
      <body className={`${montserrat.variable} font-body antialiased h-full`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

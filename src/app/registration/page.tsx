"use client";

import { useState } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import Navbar from "@/components/navbar/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Registration } from "@/lib/types";

export default function Home() {
  const [successfulRegistration, setSuccessfulRegistration] =
    useState<Registration | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mt-20 mx-auto px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome to MVCON 2026!
            </CardTitle>

            {/* 👇 Conditionally show description */}
            <CardDescription className="text-lg pt-2">
              {successfulRegistration ? (
                <>
                  <p className="mb-2">Congratulations!</p>
                  <p className="mb-2">Registration completed. Your spot is confirmed.</p>
                  <p>Your QR code is displayed below and has also been emailed to
                  you.<br/> Please download it and use it at the event check-in.</p>
                </>
              ) : (
                "Register now to secure your spot!"
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegistrationForm
              onSuccess={(reg: Registration) => setSuccessfulRegistration(reg)}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

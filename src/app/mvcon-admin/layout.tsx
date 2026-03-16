'use client';

// import { Header } from '@/components/Header';
import Navbar from "@/components/navbar/navbar"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed:", error);
      // Continue with client-side logout even if API fails
    } finally {
      localStorage.removeItem("token");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full max-w-8xl mt-20 mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Card className="w-full shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
                        <CardDescription>Validate QR codes, view logs and manage registered attendees.</CardDescription>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </CardHeader>
                {children}
            </Card>
        </main>
    </div>
  );
}

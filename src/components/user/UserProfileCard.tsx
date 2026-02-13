'use client';

import type { User } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Mail, Phone, MapPin, Briefcase, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function UserProfileCard({ user }: { user: User }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed:", error);
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
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Your Profile</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground hover:text-destructive hover:text-white transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="w-16 h-16 ring-2 ring-primary/30">
          <AvatarImage src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://mvcon.space'}${user.profileImage}`} />
          <AvatarFallback>
            <UserIcon className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-xl font-bold">{user.name}</p>
          <p className="flex items-center text-sm text-muted-foreground"><Mail className="mr-2 h-4 w-4" /> {user.email}</p>
          <p className="flex items-center text-sm text-muted-foreground"><Phone className="mr-2 h-4 w-4" /> {user.phone}</p>
          <p className="flex items-center text-sm text-muted-foreground"><Briefcase className="mr-2 h-4 w-4" /> {user.designation} ({user.profession})</p>
          <p className="flex items-center text-sm text-muted-foreground"><MapPin className="mr-2 h-4 w-4" /> {user.city}, {user.state}</p>
        </div>
      </CardContent>
    </Card>
  );
}

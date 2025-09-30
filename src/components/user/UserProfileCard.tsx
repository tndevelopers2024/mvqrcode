'use client';

import type { User } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export function UserProfileCard({ user }: { user: User }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="w-16 h-16 ring-2 ring-primary/30">
          <AvatarImage src={`http://localhost:5001${user.profileImage}`} />
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

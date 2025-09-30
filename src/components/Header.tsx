import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MountainIcon } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center justify-center">
      <MountainIcon className="h-8 w-8 text-primary" />
    </div>
);


export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors">
          <Logo />
          <span>MV International Conference</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Register</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

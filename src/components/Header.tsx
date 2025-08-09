import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="h-8 w-8 text-primary"
    fill="currentColor"
  >
    <path d="M20 20h60v60H20z" fillOpacity="0.1" />
    <path d="M35 35h30v30H35z" />
    <path d="M30 30h10v10H30z" fillOpacity="0.5" />
    <path d="M60 30h10v10H60z" fillOpacity="0.5" />
    <path d="M30 60h10v10H30z" fillOpacity="0.5" />
    <path d="M60 60h10v10H60z" fillOpacity="0.5" />
  </svg>
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

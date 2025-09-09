import HeroCarousel from "@/components/home/hero";
import About from "@/components/home/about"
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroCarousel />
      <About/>
    </main>
  );
}

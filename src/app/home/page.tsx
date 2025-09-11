import HeroCarousel from "@/components/home/hero";
import About from "@/components/home/about"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Navbar/>
      <HeroCarousel />
      <About/>
      <Footer/>
    </main>
  );
}

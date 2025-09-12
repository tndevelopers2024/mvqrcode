import HeroCarousel from "@/components/home/hero";
import About from "@/components/home/about"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import WelcomeSection from "@/components/home/president";
import CountdownBar from "@/components/home/coundown";
import Gallery from "@/components/home/gallery";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Navbar/>
      <HeroCarousel />
      <About/>
      <WelcomeSection/>
      <Gallery/>
      <CountdownBar/>
      <Footer/>
    </main>
  );
}

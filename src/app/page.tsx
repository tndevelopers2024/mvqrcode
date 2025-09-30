import HeroCarousel from "@/components/home/hero";
import About from "@/components/home/about"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import WelcomeSection from "@/components/home/president";
import Gallery from "@/components/home/gallery";
import ConferenceVenue from "@/components/home/venue"
import LaunchCountdown from "@/components/launchCountdown";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <LaunchCountdown/>
      <Navbar/>
      <HeroCarousel />
      <About/>
      <WelcomeSection/>
      <ConferenceVenue/>
      <Gallery/>
      <Footer/>
    </main>
  );
}

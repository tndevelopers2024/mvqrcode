import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"

export default function WithNavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

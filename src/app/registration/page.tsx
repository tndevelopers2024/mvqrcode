import { RegistrationForm } from "@/components/RegistrationForm";
// import { Header } from "@/components/Header";
import Navbar from "@/components/navbar/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mt-20 mx-auto px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome to MVCON 2026!</CardTitle>
            {/* <CardDescription className="text-lg pt-2">Register now to secure your spot!</CardDescription> */}
          </CardHeader>
          <div className="flex justify-center mb-6">
            <img src="/images/finalLogo.png" className="w-72" alt="" />
          </div>
          <CardContent>
            <h2 className="text-center text-3xl font-bold">Registration opens on 25th September, 2025. Stay tuned for an exciting conference experience.</h2>
            {/* <RegistrationForm /> */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

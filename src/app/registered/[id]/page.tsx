import { getRegistrationById } from "@/app/actions";
import { Header } from "@/components/Header";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

type RegisteredPageProps = {
  params: {
    id: string;
  };
};

export default async function RegisteredPage({ params }: RegisteredPageProps) {
  const registration = await getRegistrationById(params.id);

  if (!registration) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <QRCodeDisplay registration={registration} />
        </div>
      </main>
    </div>
  );
}

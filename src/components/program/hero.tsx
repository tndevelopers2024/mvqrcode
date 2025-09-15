"use client";

export default function ProgramHeader() {
  return (
    <header className="relative w-full mt-16 text-white bg-[url('/images/program-bg1.jpg')] bg-cover bg-top">
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-700/70"></div>

      <div className="relative py-32 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Scientific program
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          TNMC credits available
        </p>
      </div>
    </header>
  );
}

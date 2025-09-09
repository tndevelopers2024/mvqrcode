"use client";

export default function ProgramHeader() {
  return (
    <header className="relative w-full mt-16 text-white bg-[url('/images/program-bg.jpg')] bg-cover bg-top">
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-700/70"></div>

      <div className="relative py-32 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Program Proposal
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          Submit your innovative ideas and research for the upcoming MV
          International Conference. We welcome proposals that inspire knowledge
          sharing and collaboration.
        </p>
      </div>
    </header>
  );
}

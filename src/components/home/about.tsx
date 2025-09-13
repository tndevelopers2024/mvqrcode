import Link from "next/link";

export default function Section2() {
  const highlights = [
    {
      title: "Wide range of sessions",
      desc: "Talks on diabetes and management of its complications such as kidney, eye, heart and dedicated sessions on diabetic foot.",
    },
    {
      title: "Live workshops",
      desc: "Hands-on debridement practice and demonstrations of advanced techniques such as Negative Pressure Wound Therapy.",
    },
    {
      title: "Scientific exchanges",
      desc: "Symposiums, Panel discussions, Original research presentations (oral and poster), Quiz competition, and Debates.",
    },
    {
      title: "Networking opportunity",
      desc: "A dedicated Delegate Lounge for interaction with peers and faculty.",
    },
  ];

  return (
    <section className="w-full bg-white py-16" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Images */}
          <div className="flex-1">
            <div className="relative">
              <div className="mb-6">
                <img
                  src="/images/about-bg.jpg"
                  alt="About Image 1"
                  className="rounded-2xl shadow-lg animate-fadeIn"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <img
                  src="/images/about-bg2.jpg"
                  alt="About Image 2"
                  className="rounded-2xl shadow-md animate-fadeIn"
                />
                <img
                  src="/images/about-bg3.jpg"
                  alt="About Image 3"
                  className="rounded-2xl shadow-md animate-fadeIn"
                />
              </div>

              {/* Floating Button */}
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
                <div className="relative w-32 h-32 mx-auto">
                  {/* Rotating SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    fill="none"
                    className="animate-spin-slow w-full h-full"
                  >
                    <path
                      d="M93.8771 2.53621C96.8982 1.28483 98.4087 0.659138 100 0.659138C101.591 0.659138 103.102 1.28483 106.123 2.5362L164.588 26.7531C167.609 28.0045 169.119 28.6302 170.245 29.7554C171.37 30.8806 171.995 32.3912 173.247 35.4123L197.464 93.8771C198.715 96.8982 199.341 98.4087 199.341 100C199.341 101.591 198.715 103.102 197.464 106.123L173.247 164.588C171.995 167.609 171.37 169.119 170.245 170.245C169.119 171.37 167.609 171.995 164.588 173.247L106.123 197.464C103.102 198.715 101.591 199.341 100 199.341C98.4087 199.341 96.8982 198.715 93.8771 197.464L35.4123 173.247C32.3912 171.995 30.8806 171.37 29.7554 170.245C28.6302 169.119 28.0045 167.609 26.7531 164.588L2.53621 106.123C1.28483 103.102 0.659138 101.591 0.659138 100C0.659138 98.4087 1.28483 96.8982 2.5362 93.8771L26.7531 35.4123C28.0045 32.3912 28.6302 30.8806 29.7554 29.7554C30.8806 28.6302 32.3912 28.0045 35.4123 26.7531L93.8771 2.53621Z"
                      className="fill-blue-700"
                    />
                  </svg>

                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-14 h-14"
                      viewBox="0 0 512 512"
                      fill="white"
                    >
                      <path d="M256.054 426.786c-14.139 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6 25.6-11.462 25.6-25.6c0-14.139-11.462-25.6-25.6-25.6zm0 34.133a8.533 8.533 0 1 1 0-17.066 8.533 8.533 0 0 1 0 17.066z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 relative inline-block">
              About MVCon
              <span className="absolute left-0 -bottom-2 w-36 h-1 bg-yellow-400"></span>
            </h2>

            <p className="text-gray-600 text-md">
              MVCON is MV Hospital’s annual international conference dedicated
              to advancing excellence in diabetes and diabetic foot care. The
              event will bring together 250–300 healthcare professionals,
              including diabetologists, surgeons, and paramedics, to exchange
              ideas, explore innovations, and foster collaborations.
            </p>

            <p className="text-gray-600 text-md">
              This 3-day scientific program will feature talks, workshops,
              symposiums, and paper presentations—making MVCON a premier
              platform for knowledge-sharing and industry engagement.
            </p>

            {/* Highlights */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Conference Highlights
              </h3>
              <ul className="space-y-3">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition inline-block text-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

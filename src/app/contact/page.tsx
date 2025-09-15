'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <header className="relative w-full mt-16 text-white bg-[url('/images/submit-bg.jpg')] bg-cover bg-bottom">
        <div className="absolute inset-0 bg-blue-700/70" />
        <div className="relative py-32 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
        </div>
      </header>

      {/* Contact Section */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Address */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact Address
              </h2>
              <div className="space-y-5 text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 text-blue-600" />
                  <p>
                    <strong>
                      M.V. Hospital for Diabetes & Prof. M. Viswanathan
                      Diabetes Research Centre
                    </strong>
                    <br />
                    No.4, West Madha Church Street, Royapuram,
                    <br />
                    Chennai – 600 013, Tamil Nadu, India.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-600" />
                  <span>+91 8925955818</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" />
                  <a
                    href="mailto:mvcon@mvdiabetes.in"
                    className="hover:underline"
                  >
                    mvcon@mvdiabetes.in
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div>
              <img
                src="/images/contact-img.jpg"
                alt="Contact"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

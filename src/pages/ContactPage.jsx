import React from "react";
import GoogleMapEmbed from "../components/GoogleMapEmbed";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
        Contact & Location
      </h1>

      {/* Contact Info Card */}
      <div className="bg-white dark:bg-[#041c2f] shadow rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          ஆதி அரிசி அங்காடி (Aadhi Arisi Angaadi)
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Wholesale & Retail</p>

        {/* Phone */}
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">📞 Phone</p>
          <a
            href="tel:+918220220300"
            className="text-green-700 dark:text-green-400 font-bold"
          >
            +91 82202 20300
          </a>
        </div>

        {/* WhatsApp */}
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">📱 WhatsApp Order</p>
          <a
            href="https://wa.me/918220220300"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow mt-1"
          >
            Click to Chat
          </a>
        </div>
      </div>

      {/* Map Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          🗺️ Shop Location
        </h2>
        <GoogleMapEmbed />
      </section>
    </div>
  );
}

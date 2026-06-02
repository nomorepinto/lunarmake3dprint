import { useState } from "react";
import Head from "next/head";
import contactData from "@/public/contact.json";

export default function ContactPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <>
      <Head>
        <title>Contact Information | LunarMake 3D Print</title>
        <meta
          name="description"
          content="View our contact details, delivery address, and payment information for LunarMake 3D printing orders."
        />
      </Head>

      <div className="flex-grow px-margin_mobile md:px-margin_desktop max-w-container_max_width mx-auto w-full py-16 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-heading text-4xl text-primary mb-3 font-semibold">
              Contact Information
            </h1>
            <p className="text-on-surface-variant font-sans text-body-lg">
              Below are the official contact details, delivery address, and GCash account for your payments.
            </p>
          </div>

          {/* Cards Container */}
          <div className="space-y-6">
            {/* Contact Name Card */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">person</span>
              </div>
              <div className="flex-grow font-sans">
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
                  Contact Name
                </span>
                <span className="font-heading text-xl font-bold text-primary">
                  {contactData.name}
                </span>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <div className="flex-grow font-sans pr-0 sm:pr-16">
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
                  Delivery Address
                </span>
                <span className="text-body-lg text-on-background font-medium leading-relaxed block">
                  {contactData.address}
                </span>
              </div>
              <button
                onClick={() => handleCopy(contactData.address, "address")}
                className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0 ml-auto p-2.5 rounded-xl border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary bg-surface transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1.5 self-center"
                title="Copy Address"
              >
                <span className="material-symbols-outlined text-lg">
                  {copiedField === "address" ? "check" : "content_copy"}
                </span>
                <span className="font-mono text-xs font-bold uppercase">
                  {copiedField === "address" ? "Copied" : "Copy"}
                </span>
              </button>
            </div>

            {/* GCash Card */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <div className="flex-grow font-sans pr-0 sm:pr-16">
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
                  GCash Number
                </span>
                <span className="font-mono text-xl font-bold text-primary tracking-wide block">
                  {contactData.gcashNumber}
                </span>
              </div>
              <button
                onClick={() => handleCopy(contactData.gcashNumber, "gcash")}
                className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0 ml-auto p-2.5 rounded-xl border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary bg-surface transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1.5 self-center"
                title="Copy GCash Number"
              >
                <span className="material-symbols-outlined text-lg">
                  {copiedField === "gcash" ? "check" : "content_copy"}
                </span>
                <span className="font-mono text-xs font-bold uppercase">
                  {copiedField === "gcash" ? "Copied" : "Copy"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

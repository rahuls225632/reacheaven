"use client";

import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/config";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-400"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-navy-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}

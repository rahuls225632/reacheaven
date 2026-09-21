"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="font-medium text-ink">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-slate-soft transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-royal-600" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              className={`grid transition-all duration-200 ease-in-out ${
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden px-6">
                <p className="text-sm leading-relaxed text-slate">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

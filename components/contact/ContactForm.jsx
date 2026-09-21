"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { businessTypes, budgetOptions } from "@/data/contact-options";
import { whatsappHref } from "@/lib/config";

const initialState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  serviceRequired: "",
  budget: "",
  description: "",
};

const REQUIRED_FIELDS = ["name", "email", "phone", "serviceRequired"];

function buildWhatsAppMessage(values) {
  const lines = [
    "Hi, I'd like a free consultation for my business.",
    "",
    `Name: ${values.name}`,
  ];
  if (values.businessName) lines.push(`Business Name: ${values.businessName}`);
  lines.push(`Email: ${values.email}`, `Phone: ${values.phone}`);
  if (values.businessType) lines.push(`Business Type: ${values.businessType}`);
  lines.push(`Service Required: ${values.serviceRequired}`);
  if (values.budget) lines.push(`Approximate Budget: ${values.budget}`);
  if (values.description) lines.push("", `Project Description: ${values.description}`);
  return lines.join("\n");
}

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [error, setError] = useState("");

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const missing = REQUIRED_FIELDS.filter((field) => !values[field].trim());
    if (missing.length) {
      setError("Please fill in your name, email, phone and the service you need.");
      setStatus("error");
      return;
    }

    setError("");
    window.open(whatsappHref(buildWhatsAppMessage(values)), "_blank", "noopener,noreferrer");
    setStatus("success");
    setValues(initialState);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-royal-600" />
        <h3 className="font-display text-lg font-semibold text-ink">You&rsquo;re almost there</h3>
        <p className="max-w-sm text-sm text-slate">
          We&rsquo;ve opened WhatsApp with your details prefilled — just hit send and
          we&rsquo;ll get back to you shortly.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className="form-input"
            autoComplete="name"
          />
        </Field>

        <Field label="Business Name" htmlFor="businessName">
          <input
            id="businessName"
            value={values.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className="form-input"
            autoComplete="organization"
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="form-input"
            autoComplete="email"
          />
        </Field>

        <Field label="Phone / WhatsApp" htmlFor="phone">
          <input
            id="phone"
            type="tel"
            required
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="form-input"
            autoComplete="tel"
          />
        </Field>

        <Field label="Business Type" htmlFor="businessType">
          <select
            id="businessType"
            value={values.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            className="form-input"
          >
            <option value="">Select one</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Service Required" htmlFor="serviceRequired">
          <select
            id="serviceRequired"
            required
            value={values.serviceRequired}
            onChange={(e) => update("serviceRequired", e.target.value)}
            className="form-input"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Approximate Budget" htmlFor="budget" className="sm:col-span-2">
          <select
            id="budget"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="form-input"
          >
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project Description" htmlFor="description" className="sm:col-span-2">
          <textarea
            id="description"
            rows={4}
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            className="form-input resize-none"
            placeholder="Tell us briefly what you need built."
          />
        </Field>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full sm:w-auto" icon={MessageCircle}>
        Request a Free Consultation
      </Button>
      <p className="mt-3 text-xs text-slate-soft">
        Sends your details to us on WhatsApp — no account or sign-up needed.
      </p>
    </form>
  );
}

function Field({ label, htmlFor, className, children }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm ${className || ""}`}>
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FIRM } from "@/data/firm";

const fieldInputClass =
  "h-12 rounded-xl border-[color:var(--border-color)] bg-[color:var(--paper)] text-[15px] text-[color:var(--ink-950)] focus-visible:border-[color:var(--accent-500)] focus-visible:ring-[color:var(--accent-500)]/20";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const reference = `UE-${Math.floor(Math.random() * 9000 + 1000)}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="ue-section">
      <div className="ue-container">
        <p className="ue-eyebrow">Contact</p>
        <h1 className="ue-h1" style={{ maxWidth: "12ch" }}>Get in touch.</h1>
        <p className="ue-lead" style={{ marginTop: 32 }}>
          Project enquiry, partnership, or a general question — drop us a
          note and the right person will respond within two business days.
        </p>

        <div
          className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-20"
          style={{ marginTop: 72 }}
        >
          {!sent ? (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="grid gap-2">
                  <Label
                    htmlFor="name"
                    className="text-[13px] text-[color:var(--ink-700)]"
                  >
                    Your name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className={fieldInputClass}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="company"
                    className="text-[13px] text-[color:var(--ink-700)]"
                  >
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    className={fieldInputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-[13px] text-[color:var(--ink-700)]"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className={fieldInputClass}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="phone"
                    className="text-[13px] text-[color:var(--ink-700)]"
                  >
                    Phone <span className="text-[color:var(--fg-muted)]">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={fieldInputClass}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-[13px] text-[color:var(--ink-700)]">
                  What's this about?
                </Label>
                <Select defaultValue="Project enquiry">
                  <SelectTrigger
                    className={fieldInputClass + " w-full data-[size=default]:h-12"}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Project enquiry">Project enquiry</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Careers">Careers</SelectItem>
                    <SelectItem value="Media or press">Media or press</SelectItem>
                    <SelectItem value="General question">General question</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="message"
                  className="text-[13px] text-[color:var(--ink-700)]"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A few lines on what you're working on — location, scope, timeline if you have them. We'll take it from there."
                  className="rounded-xl border-[color:var(--border-color)] bg-[color:var(--paper)] text-[15px] text-[color:var(--ink-950)] leading-[1.55] focus-visible:border-[color:var(--accent-500)] focus-visible:ring-[color:var(--accent-500)]/20"
                />
              </div>
              <div className="mt-2">
                <Button
                  type="submit"
                  className="rounded-full h-11 px-6 text-[15px] font-medium"
                >
                  Send message
                </Button>
              </div>
            </form>
          ) : (
            <div
              style={{
                padding: 32,
                border: "1px solid var(--border-color)",
                borderRadius: 16,
                background: "var(--paper-soft)",
              }}
            >
              <div className="ue-chip ue-chip--accent">Received</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "-0.018em",
                  margin: "16px 0 8px",
                }}
              >
                Thanks — we'll be in touch · {reference}
              </h3>
              <p style={{ color: "var(--ink-500)", margin: 0, fontSize: 15, lineHeight: 1.55 }}>
                The right person at Unique Engineers will respond within two
                business days.
              </p>
            </div>
          )}

          <aside>
            <div style={{ borderTop: "1px solid var(--border-color)" }}>
              <ContactItem label={FIRM.headquarters.label} value={FIRM.headquarters.address} />
              <ContactItem
                label="Email"
                value={FIRM.contactEmail}
              />
              <ContactItem
                label="Phone"
                value={FIRM.headquarters.phone}
              />
              <ContactItem label="Hours" value={FIRM.hours} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "20px 0",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 8 }}>{label}</div>
      <div
        style={{
          whiteSpace: "pre-line",
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--ink-950)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

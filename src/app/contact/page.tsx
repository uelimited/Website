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
import { sendEmailForm } from "@/lib/emailjs";

const fieldInputClass =
  "h-12 rounded-xl border-[color:var(--border-color)] bg-[color:var(--paper)] text-[15px] text-[color:var(--ink-950)] focus-visible:border-[color:var(--accent-500)] focus-visible:ring-[color:var(--accent-500)]/20";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState("");
  const [topic, setTopic] = useState("Project enquiry");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const ref = `UE-${Math.floor(Math.random() * 9000 + 1000)}`;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!name || !email || !message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }

    setError("");
    setSending(true);
    try {
      await sendEmailForm(form);
      setReference(ref);
      setSent(true);
      setShowSuccessPopup(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Please try again in a moment.";
      setError(`We couldn't send your message: ${message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="ue-section">
      {showSuccessPopup ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ink-950)]/45 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--paper)] p-6 shadow-[0_24px_80px_rgba(10,12,16,0.12)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-50)] text-[28px] text-[color:var(--accent-600)]">
              ✓
            </div>
            <h2
              id="contact-success-title"
              className="text-[28px] font-medium tracking-[-0.03em] text-[color:var(--ink-950)]"
            >
              Sent successfully.
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-[color:var(--ink-600)]">
              Your enquiry has been sent to the team. We&apos;ll get back to you
              shortly.
            </p>
            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-[12px] font-medium tracking-[0.08em] text-[color:var(--accent-600)] uppercase">
                Reference {reference || "UE"}
              </span>
              <Button
                type="button"
                onClick={() => setShowSuccessPopup(false)}
                className="rounded-full h-10 px-5 text-[14px] font-medium"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="ue-container">
        <p className="ue-eyebrow">Contact</p>
        <h1 className="ue-h1" style={{ maxWidth: "12ch" }}>
          Get in touch.
        </h1>
        <p className="ue-lead" style={{ marginTop: 32 }}>
          Project enquiry, partnership, or a general question — drop us a note
          and the right person will respond within two business days.
        </p>

        <div
          className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-20"
          style={{ marginTop: 72 }}
        >
          {!sent ? (
            <form method="post" onSubmit={handleSubmit} className="grid gap-5">
              {error ? (
                <div
                  className="rounded-xl border border-[color:var(--stop)]/25 bg-[color:var(--stop)]/5 px-4 py-3 text-[14px] text-[color:var(--ink-950)]"
                >
                  {error}
                </div>
              ) : null}
              <input type="hidden" name="form_type" value="Contact enquiry" />
              <input type="hidden" name="topic" value={topic} />
              <input type="hidden" name="subject" value={`Contact enquiry: ${topic}`} />
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
                    Phone{" "}
                    <span className="text-[color:var(--fg-muted)]">
                      (optional)
                    </span>
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
                  What&apos;s this about?
                </Label>
                <Select
                  value={topic}
                  onValueChange={(value) => setTopic(value ?? topic)}
                >
                  <SelectTrigger
                    className={
                      fieldInputClass + " w-full data-[size=default]:h-12"
                    }
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Project enquiry">
                      Project enquiry
                    </SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Careers">Careers</SelectItem>
                    <SelectItem value="Media or press">
                      Media or press
                    </SelectItem>
                    <SelectItem value="General question">
                      General question
                    </SelectItem>
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
                  placeholder="A few lines on what you're working on — location, scope, timeline if you have them."
                  className="rounded-xl border-[color:var(--border-color)] bg-[color:var(--paper)] text-[15px] text-[color:var(--ink-950)] leading-[1.55] focus-visible:border-[color:var(--accent-500)] focus-visible:ring-[color:var(--accent-500)]/20"
                />
              </div>
              <div className="mt-2">
                <Button
                  type="submit"
                  disabled={sending}
                  className="rounded-full h-11 px-6 text-[15px] font-medium"
                >
                  {sending ? "Sending..." : "Send message"}
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
              <div className="ue-chip ue-chip--accent">
                Sent · {reference}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "-0.018em",
                  margin: "16px 0 8px",
                }}
              >
                Your message has been sent.
              </h3>
              <p
                style={{
                  color: "var(--ink-500)",
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.55,
                }}
              >
                Your enquiry has reached the team. Prefer to write directly?{" "}
                <a
                  href={`mailto:${FIRM.contactEmail}`}
                  style={{ color: "var(--accent-500)" }}
                >
                  {FIRM.contactEmail}
                </a>
                . The right person will respond within two business days.
              </p>
            </div>
          )}

          <aside>
            <div style={{ borderTop: "1px solid var(--border-color)" }}>
              <ContactItem
                label={FIRM.headquarters.label}
                value={FIRM.headquarters.address}
              />
              <ContactItem label="Email" value={FIRM.contactEmail} />
              <ContactItem label="Phone" value={FIRM.headquarters.phone} />
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
      <div style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 8 }}>
        {label}
      </div>
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

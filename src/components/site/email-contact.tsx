"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site-content";
export function EmailContact({ topic }: { topic: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setStatus("Email address copied.");
    } catch {
      setStatus("Select and copy the email address above.");
    }
  }
  return (
    <div className="ue-inner-contact">
      <p className="ue-eyebrow">Project enquiries</p>
      <h2>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </h2>
      <p>
        Include your project location, service requirements and expected
        programme. You can attach drawings or a brief in your email.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button asChild className="rounded-full px-6 h-11">
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(topic)}`}>
            Open email
          </a>
        </Button>
        <Button
          variant="outline"
          className="rounded-full px-6 h-11"
          onClick={copy}
        >
          Copy email address
        </Button>
      </div>
      <p style={{ fontSize: 13, marginTop: 18 }}>
        Opens your email app. Send the message there to contact our team.
      </p>
      <p
        role="status"
        aria-live="polite"
        style={{ fontSize: 14, minHeight: 22 }}
      >
        {status}
      </p>
    </div>
  );
}

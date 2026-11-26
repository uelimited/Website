

"use client";



import Image from "next/image";

import { useState, type FormEvent } from "react";

import { ArrowLeft, ArrowRight, FileText, Upload } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { CAREERS_HERO } from "@/data/careers";

import { sendEmailForm } from "@/lib/emailjs";



const departments = [

  "Design & BIM engineering",

  "Civil & structural",

  "Mechanical / HVAC",

  "Electrical",

  "Plumbing & firefighting",

  "Site execution & project management",

  "Testing & commissioning",

  "QA / QC",

  "Health, safety & environment",

  "Operations & maintenance",

  "Other",

];



const inputClass =

  "h-12 w-full rounded-md border border-[color:var(--border-color)] bg-white px-3 text-[15px] text-[color:var(--ink-950)] focus-visible:border-[color:var(--accent-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-500)]/20";



export function ApplicationForm({

  initialRole,

  initialDepartment,

}: {

  initialRole: string;

  initialDepartment: string;

}) {

  const [department, setDepartment] = useState(initialDepartment);

  const [selectedRole] = useState(initialRole);

  const [resume, setResume] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const [sending, setSending] = useState(false);

  const [submitError, setSubmitError] = useState("");



  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();
    if (sending) return;



    const form = event.currentTarget;



    setSubmitError("");

    setSending(true);



    try {

      await sendEmailForm(form, "careers");

      setSubmitted(true);

    } catch (error) {

      const message =

        error instanceof Error ? error.message : "Please try again in a moment.";


      setSubmitError(`We couldn't send your application: ${message}`);

    } finally {

      setSending(false);

    }

  }



  return (

    <section

      className="ue-section"

      style={{ padding: "72px 0 96px" }}

    >

      <div className="ue-container">

        <Link

          href="/careers"

          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--ink-600)] transition-colors hover:text-[color:var(--accent-600)]"

        >

          <ArrowLeft aria-hidden className="size-4" />

          Back to Careers

        </Link>



        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">

          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">

            <p className="ue-eyebrow">Careers · Application</p>



            <h1

              className="ue-h1 max-w-[12ch]"

              style={{ fontSize: "clamp(38px, 5vw, 60px)" }}

            >

              {selectedRole || "Make your next move count."}

            </h1>



            <p className="ue-lead mt-5" style={{ fontSize: 18 }}>

              Tell us where your experience fits. Choose a department, share

              a little about yourself.

            </p>



            <figure className="relative mt-9 aspect-[5/3] overflow-hidden rounded-md bg-[color:var(--ink-100)]">

              <Image

                src={CAREERS_HERO.image}

                alt={CAREERS_HERO.imageAlt}

                fill

                priority

                sizes="(max-width: 1024px) 100vw, 40vw"

                className="object-cover"

              />



              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12 text-sm text-white">

                Work across disciplines. Build what lasts.

              </figcaption>

            </figure>



            <p className="mt-5 border-l-2 border-[color:var(--accent-500)] pl-4 text-sm leading-6 text-[color:var(--ink-600)]">

              You can select a résumé for reference. The file stays on your device.


            </p>

          </div>



          <form
            method="post"

            onSubmit={handleSubmit}

            className="grid gap-6 rounded-md border border-[color:var(--border-color)] bg-[color:var(--paper-soft)] p-5 shadow-[0_18px_48px_rgba(14,25,35,0.06)] sm:p-8"

          >

            <div>

              <p className="font-mono text-[11px] uppercase text-[color:var(--accent-600)]">

                Candidate profile

              </p>



              <h2 className="mt-2 text-2xl font-medium text-[color:var(--ink-950)]">

                Your details

              </h2>



              {selectedRole && (

                <p className="mt-2 text-sm text-[color:var(--ink-600)]">

                  Applying for: {selectedRole}

                </p>

              )}

            </div>



            <input

              type="hidden"

              name="form_type"

              value="Career application"

            />



            <input
              type="hidden"
              name="subject"
              value={`Career application: ${selectedRole || "General"}`}
            />

            <input
              type="hidden"
              name="position"
              value={selectedRole}
            />



            <div className="grid gap-5 sm:grid-cols-2">

              <div className="grid gap-2 sm:col-span-2">

                <Label htmlFor="candidate-name">Full name *</Label>

                <Input

                  id="candidate-name"

                  name="name"

                  autoComplete="name"

                  className={inputClass}

                  required

                />
              </div>

              <div className="grid gap-2">

                <Label htmlFor="candidate-email">Email address *</Label>

                <Input

                  id="candidate-email"

                  name="email"

                  type="email"

                  autoComplete="email"

                  className={inputClass}

                  required

                />

              </div>



              <div className="grid gap-2">

                <Label htmlFor="candidate-phone">Phone number *</Label>

                <Input

                  id="candidate-phone"

                  name="phone"

                  type="tel"

                  autoComplete="tel"

                  className={inputClass}

                  required

                />

              </div>



              <div className="grid gap-2">

                <Label htmlFor="candidate-department">Department *</Label>

                <select

                  id="candidate-department"

                  name="department"

                  value={department}

                  onChange={(event) => setDepartment(event.target.value)}

                  className={inputClass}

                  required

                >

                  <option value="" disabled>

                    Select a department

                  </option>



                  {departments.map((item) => (

                    <option key={item} value={item}>

                      {item}

                    </option>

                  ))}

                </select>

              </div>



              <div className="grid gap-2">

                <Label htmlFor="candidate-experience">

                  Years of experience *

                </Label>



                <select

                  id="candidate-experience"

                  name="experience"

                  defaultValue=""

                  className={inputClass}

                  required

                >

                  <option value="" disabled>

                    Select experience

                  </option>

                  <option value="0-1">0–1 years</option>

                  <option value="2-5">2–5 years</option>

                  <option value="6-10">6–10 years</option>

                  <option value="11+">11+ years</option>

                </select>

              </div>



              <div className="grid gap-2">

                <Label htmlFor="candidate-location">Current city *</Label>

                <Input

                  id="candidate-location"

                  name="location"

                  autoComplete="address-level2"

                  className={inputClass}

                  required

                />

              </div>



              <div className="grid gap-2 sm:col-span-2">

                <Label htmlFor="candidate-link">

                  LinkedIn or portfolio

                </Label>



                <Input

                  id="candidate-link"

                  name="profileLink"

                  type="url"

                  className={inputClass}

                  placeholder="https\://"

                />

              </div>



              <div className="grid gap-2 sm:col-span-2">

                <Label htmlFor="candidate-note">

                  A short note about your application

                </Label>



                <Textarea

                  id="candidate-note"

                  name="note"

                  rows={4}

                  className="rounded-md border border-[color:var(--border-color)] bg-white text-[15px] leading-6 text-[color:var(--ink-950)] focus-visible:border-[color:var(--accent-500)] focus-visible:ring-[color:var(--accent-500)]/20"

                  placeholder="What kind of work are you looking to do next?"

                />

              </div>

            </div>



            <div className="grid gap-2">

              <Label htmlFor="candidate-resume">Résumé (optional)</Label>



              <label

                htmlFor="candidate-resume"

                className="relative flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-[color:var(--border-strong)] bg-white px-5 py-5 text-center transition-colors hover:border-[color:var(--accent-500)] focus-within:outline-2 focus-within:outline-[color:var(--accent-500)] focus-within:outline-offset-2"

              >

                {resume ? (

                  <FileText

                    aria-hidden

                    className="size-5 text-[color:var(--accent-600)]"

                  />

                ) : (

                  <Upload

                    aria-hidden

                    className="size-5 text-[color:var(--accent-600)]"

                  />

                )}



                <span className="text-sm font-medium text-[color:var(--ink-800)]">

                  {resume ? `Selected: ${resume.name}` : "Choose a résumé file"}

                </span>



                <span className="text-xs text-[color:var(--ink-500)]">

                  PDF, DOC, or DOCX

                </span>



                <Input

                  id="candidate-resume"

                  type="file"

                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"

                  onChange={(event) => setResume(event.currentTarget.files?.[0] ?? null)}

                />

              </label>

            </div>



            <div className="border-t border-[color:var(--border-color)] pt-5">

              {submitError && (

                <p

                  role="alert"

                  className="mb-4 text-sm text-[color:var(--stop)]"

                >

                  {submitError}

                </p>

              )}



              <p className="text-xs leading-5 text-[color:var(--ink-500)]">

                Your application details will be emailed to the recruitment team.

              </p>



              <Button

                type="submit"

                disabled={sending}

                className="mt-5 h-12 w-full rounded-md text-[15px] font-medium"

              >

                {sending ? "Sending application..." : "Submit application"}

                <ArrowRight aria-hidden className="ml-2 size-4" />

              </Button>

            </div>

          </form>

        </div>

      </div>



      {submitted && (

        <div

          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ink-950)]/55 px-4"

          role="dialog"

          aria-modal="true"

          aria-labelledby="application-ready-title"

        >

          <div className="w-full max-w-md bg-white p-6 shadow-[0_24px_80px_rgba(10,12,16,0.18)] sm:p-8">

            <p className="font-mono text-[11px] uppercase text-[color:var(--accent-600)]">

              Application received

            </p>



            <h2

              id="application-ready-title"

              className="mt-3 text-[28px] font-medium text-[color:var(--ink-950)]"

            >

              Your application has been sent.

            </h2>



            <p className="mt-3 text-[15px] leading-6 text-[color:var(--ink-600)]">

              Your application details were sent to the recruitment team.




            </p>



            <Button

              type="button"

              onClick={() => setSubmitted(false)}

              className="mt-6 h-11 rounded-md px-6"

            >

              Back to form

            </Button>

          </div>

        </div>

      )}

    </section>

  );

}

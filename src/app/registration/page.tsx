"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmailForm } from "@/lib/emailjs";

type Person = { name: string; email: string; phone: string };
type AuthorizedPerson = Person & {
  designation: string;
  landline: string;
  fax: string;
};
type Address = { label: string; address: string; state: string; city: string; pin: string };

const inputClass =
  "h-12 w-full rounded-md border border-[color:var(--border-color)] bg-[color:var(--paper)] px-3 text-[15px] text-[color:var(--ink-950)] focus-visible:border-[color:var(--accent-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-500)]/20";
const textAreaClass =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[color:var(--paper)] px-3 py-3 text-[15px] leading-6 text-[color:var(--ink-950)] placeholder:text-[color:var(--ink-400)] focus-visible:border-[color:var(--accent-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-500)]/20";

const newContact = (): Person => ({ name: "", email: "", phone: "" });
const newAuthorizedPerson = (): AuthorizedPerson => ({
  ...newContact(),
  designation: "",
  landline: "",
  fax: "",
});
const newAddress = (): Address => ({
  label: "",
  address: "",
  state: "",
  city: "",
  pin: "",
});

export default function RegistrationPage() {
  const [contactPersons, setContactPersons] = useState<Person[]>([
    newContact(),
    newContact(),
  ]);
  const [authorizedPeople, setAuthorizedPeople] = useState<AuthorizedPerson[]>([
    newAuthorizedPerson(),
    newAuthorizedPerson(),
  ]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    setError("");
    setSending(true);
    try {
      await sendEmailForm(form);
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? `We couldn't send your registration: ${submissionError.message}`
          : "We couldn't send your registration. Please try again in a moment.",
      );
    } finally {
      setSending(false);
    }
  }

  function updateContact(index: number, key: keyof Person, value: string) {
    setContactPersons((people) =>
      people.map((person, personIndex) =>
        personIndex === index ? { ...person, [key]: value } : person,
      ),
    );
  }

  function updateAuthorized(
    index: number,
    key: keyof AuthorizedPerson,
    value: string,
  ) {
    setAuthorizedPeople((people) =>
      people.map((person, personIndex) =>
        personIndex === index ? { ...person, [key]: value } : person,
      ),
    );
  }

  function updateAddress(index: number, key: keyof Address, value: string) {
    setAddresses((items) =>
      items.map((address, addressIndex) =>
        addressIndex === index ? { ...address, [key]: value } : address,
      ),
    );
  }

  return (
    <section
      className="ue-section bg-[color:var(--paper-soft)]"
      style={{ padding: "72px 0 96px" }}
    >
      <div className="ue-container">
        <div className="grid gap-8 border-b border-[color:var(--border-color)] pb-10 md:grid-cols-[minmax(0,1fr)_240px] md:items-end">
          <div>
            <p className="ue-eyebrow">Vendor onboarding form</p>
            <h1
              className="ue-h1 mt-3 max-w-[14ch]"
              style={{ fontSize: "clamp(38px, 5.1vw, 58px)" }}
            >
              Vendor registration
            </h1>
            <p className="ue-lead mt-4 max-w-[62ch]" style={{ fontSize: 18 }}>
              Register your company to supply products or services to Unique
              Engineers Limited. Complete the required sections to submit your
              registration.
            </p>
          </div>
          <aside className="border-l-2 border-[color:var(--accent-500)] pl-5">
            <p className="font-mono text-[11px] uppercase text-[color:var(--ink-400)]">
              Application
            </p>
            <p className="mt-2 text-2xl font-medium text-[color:var(--ink-950)]">
              07 sections
            </p>
            <p className="mt-2 text-sm leading-5 text-[color:var(--ink-500)]">
              Fields marked <span className="text-[color:var(--stop)]">*</span> are required
            </p>
          </aside>
        </div>

        <form
          method="POST"
          onSubmit={handleSubmit}
          className="mt-2"
        >
          <input type="hidden" name="form_type" value="Vendor registration" />
          <input type="hidden" name="subject" value="Vendor registration application" />
          {error ? (
            <p role="alert" className="mb-4 border border-[color:var(--stop)]/25 bg-[color:var(--stop)]/5 px-4 py-3 text-sm text-[color:var(--ink-950)]">
              {error}
            </p>
          ) : null}
          <FormSection
            number="01"
            title="Registration profile"
            description="Tell us what you supply and where you operate."
          >
            <Field id="vendor-states" label="States where supply / service will be provided" required>
              <Input
                id="vendor-states"
                name="serviceStates"
                className={inputClass}
                placeholder="For example: Haryana, Delhi, Maharashtra"
                required
              />
            </Field>
            <Field id="vendor-registration-for" label="Vendor registration for" required>
              <select id="vendor-registration-for" name="registrationFor" className={inputClass} defaultValue="" required>
                <option value="" disabled>Select registration type</option>
                <option>Goods / materials</option>
                <option>Services</option>
                <option>Works / subcontracting</option>
                <option>Manpower</option>
              </select>
            </Field>
            <Field id="vendor-legal-name" label="Name of individual / firm / company" required>
              <Input id="vendor-legal-name" name="legalName" className={inputClass} autoComplete="organization" required />
            </Field>
            <Field id="vendor-profile" label="Company profile">
              <FileInput id="vendor-profile" accept=".pdf,.doc,.docx,.ppt,.pptx" />
            </Field>
          </FormSection>

          <FormSection
            number="02"
            title="Contact persons"
            description="Provide at least two primary contacts for this registration."
          >
            {contactPersons.map((person, index) => (
              <div className="grid gap-4 rounded-md border border-[color:var(--ink-100)] bg-white p-4 sm:col-span-2 sm:grid-cols-3" key={`contact-${index}`}>
                <Field id={`contact-name-${index}`} label={`Contact ${index + 1} name`} required>
                  <Input id={`contact-name-${index}`} name={`contacts.${index}.name`} value={person.name} onChange={(event) => updateContact(index, "name", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`contact-email-${index}`} label="Email" required>
                  <Input id={`contact-email-${index}`} name={`contacts.${index}.email`} type="email" value={person.email} onChange={(event) => updateContact(index, "email", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`contact-phone-${index}`} label="Contact number" required>
                  <Input id={`contact-phone-${index}`} name={`contacts.${index}.phone`} type="tel" value={person.phone} onChange={(event) => updateContact(index, "phone", event.target.value)} className={inputClass} required />
                </Field>
                {contactPersons.length > 2 && (
                  <RemoveButton label={`Remove contact ${index + 1}`} onClick={() => setContactPersons((people) => people.filter((_, personIndex) => personIndex !== index))} />
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              <AddButton onClick={() => setContactPersons((people) => [...people, newContact()])}>Add contact person</AddButton>
            </div>
          </FormSection>

          <FormSection
            number="03"
            title="Entity details and address"
            description="Enter the registered entity address and business information."
          >
            <Field id="entity-address" label="Full address" required className="sm:col-span-2">
              <Textarea id="entity-address" name="entityAddress" rows={3} className={textAreaClass} required />
            </Field>
            <Field id="entity-country" label="Country" required>
              <Input id="entity-country" name="country" className={inputClass} defaultValue="India" required />
            </Field>
            <Field id="entity-state" label="State" required>
              <Input id="entity-state" name="state" className={inputClass} required />
            </Field>
            <Field id="entity-city" label="City" required>
              <Input id="entity-city" name="city" className={inputClass} required />
            </Field>
            <Field id="entity-pin" label="PIN code" required>
              <Input id="entity-pin" name="pinCode" inputMode="numeric" className={inputClass} required />
            </Field>
            <Field id="entity-email" label="Entity email" required>
              <Input id="entity-email" name="entityEmail" type="email" className={inputClass} required />
            </Field>
            <Field id="entity-mobile" label="Entity mobile" required>
              <Input id="entity-mobile" name="entityMobile" type="tel" className={inputClass} required />
            </Field>
            <Field id="entity-website" label="Website (if any)">
              <Input id="entity-website" name="website" type="url" className={inputClass} placeholder="https://" />
            </Field>
            <Field id="entity-type" label="Type of entity" required>
              <select id="entity-type" name="entityType" className={inputClass} defaultValue="" required>
                <option value="" disabled>Select entity type</option>
                <option>Private limited company</option>
                <option>Public limited company</option>
                <option>Partnership firm</option>
                <option>Limited liability partnership</option>
                <option>Proprietorship</option>
                <option>Other</option>
              </select>
            </Field>
            <YesNoField id="has-aadhaar" label="Do you have an Aadhaar card?" name="hasAadhaar" />
            <Field id="business-nature" label="Nature of business: services / products offered" required className="sm:col-span-2">
              <Textarea id="business-nature" name="businessNature" rows={4} className={textAreaClass} required />
            </Field>
            <Field id="vendor-type" label="Vendor type" required className="sm:col-span-2">
              <select id="vendor-type" name="vendorType" className={inputClass} defaultValue="" required>
                <option value="" disabled>Select vendor type</option>
                <option>Manufacturer</option>
                <option>Stockist</option>
                <option>Distributor</option>
                <option>Dealer</option>
                <option>C&amp;F agency</option>
                <option>Retailer</option>
                <option>Trader</option>
                <option>Petty contractor</option>
                <option>Manpower contractor</option>
                <option>Other</option>
              </select>
            </Field>
            <YesNoField id="is-msme" label="Is the entity registered as an MSME?" name="isMsme" />
            <Field id="msme-certificate" label="MSME registration certificate">
              <FileInput id="msme-certificate" accept=".pdf,.jpg,.jpeg,.png" />
            </Field>
          </FormSection>

          <FormSection
            number="04"
            title="Authorized contacts and compliance"
            description="Add at least two authorized representatives and confirm registration details."
          >
            {authorizedPeople.map((person, index) => (
              <div className="grid gap-4 rounded-md border border-[color:var(--ink-100)] bg-white p-4 sm:col-span-2 sm:grid-cols-2 lg:grid-cols-3" key={`authorized-${index}`}>
                <Field id={`authorized-name-${index}`} label={`Authorized contact ${index + 1}`} required>
                  <Input id={`authorized-name-${index}`} name={`authorized.${index}.name`} value={person.name} onChange={(event) => updateAuthorized(index, "name", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`authorized-designation-${index}`} label="Designation" required>
                  <Input id={`authorized-designation-${index}`} name={`authorized.${index}.designation`} value={person.designation} onChange={(event) => updateAuthorized(index, "designation", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`authorized-mobile-${index}`} label="Mobile number" required>
                  <Input id={`authorized-mobile-${index}`} name={`authorized.${index}.phone`} type="tel" value={person.phone} onChange={(event) => updateAuthorized(index, "phone", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`authorized-landline-${index}`} label="Landline number">
                  <Input id={`authorized-landline-${index}`} name={`authorized.${index}.landline`} type="tel" value={person.landline} onChange={(event) => updateAuthorized(index, "landline", event.target.value)} className={inputClass} />
                </Field>
                <Field id={`authorized-fax-${index}`} label="Fax number">
                  <Input id={`authorized-fax-${index}`} name={`authorized.${index}.fax`} value={person.fax} onChange={(event) => updateAuthorized(index, "fax", event.target.value)} className={inputClass} />
                </Field>
                <Field id={`authorized-email-${index}`} label="Email" required>
                  <Input id={`authorized-email-${index}`} name={`authorized.${index}.email`} type="email" value={person.email} onChange={(event) => updateAuthorized(index, "email", event.target.value)} className={inputClass} required />
                </Field>
                {authorizedPeople.length > 2 && (
                  <RemoveButton label={`Remove authorized contact ${index + 1}`} onClick={() => setAuthorizedPeople((people) => people.filter((_, personIndex) => personIndex !== index))} />
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              <AddButton onClick={() => setAuthorizedPeople((people) => [...people, newAuthorizedPerson()])}>Add authorized contact</AddButton>
            </div>
            <div className="grid gap-5 border-t border-[color:var(--ink-100)] pt-5 sm:col-span-2 sm:grid-cols-2">
              <YesNoField id="has-pan" label="Do you have a PAN?" name="hasPan" />
              <YesNoField id="has-gst" label="Do you have GST registration?" name="hasGst" />
              <Field id="pan-document" label="PAN document">
                <FileInput id="pan-document" accept=".pdf,.jpg,.jpeg,.png" />
              </Field>
            </div>
          </FormSection>

          <FormSection
            number="05"
            title="Additional business addresses"
            description="Register other business locations associated with the same GST number, if applicable."
          >
            {addresses.map((address, index) => (
              <div className="grid gap-4 rounded-md border border-[color:var(--ink-100)] bg-white p-4 sm:col-span-2 sm:grid-cols-2 lg:grid-cols-3" key={`address-${index}`}>
                <Field id={`address-label-${index}`} label="Location / address name" required>
                  <Input id={`address-label-${index}`} name={`addresses.${index}.label`} value={address.label} onChange={(event) => updateAddress(index, "label", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`address-pin-${index}`} label="PIN code" required>
                  <Input id={`address-pin-${index}`} name={`addresses.${index}.pin`} value={address.pin} onChange={(event) => updateAddress(index, "pin", event.target.value)} inputMode="numeric" className={inputClass} required />
                </Field>
                <Field id={`address-city-${index}`} label="City" required>
                  <Input id={`address-city-${index}`} name={`addresses.${index}.city`} value={address.city} onChange={(event) => updateAddress(index, "city", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`address-state-${index}`} label="State" required>
                  <Input id={`address-state-${index}`} name={`addresses.${index}.state`} value={address.state} onChange={(event) => updateAddress(index, "state", event.target.value)} className={inputClass} required />
                </Field>
                <Field id={`address-full-${index}`} label="Full address" required className="sm:col-span-2">
                  <Textarea id={`address-full-${index}`} name={`addresses.${index}.address`} rows={2} value={address.address} onChange={(event) => updateAddress(index, "address", event.target.value)} className={textAreaClass} required />
                </Field>
                <RemoveButton label={`Remove business address ${index + 1}`} onClick={() => setAddresses((items) => items.filter((_, addressIndex) => addressIndex !== index))} />
              </div>
            ))}
            <div className="sm:col-span-2">
              <AddButton onClick={() => setAddresses((items) => [...items, newAddress()])}>Add business address</AddButton>
            </div>
          </FormSection>

          <FormSection
            number="06"
            title="Bank details"
            description="Provide the account details for payments."
          >
            <Field id="bank-name" label="Name of bank" required>
              <Input id="bank-name" name="bankName" className={inputClass} required />
            </Field>
            <Field id="bank-branch" label="Bank branch" required>
              <Input id="bank-branch" name="bankBranch" className={inputClass} required />
            </Field>
            <Field id="bank-holder" label="Name of account holder" required>
              <Input id="bank-holder" name="accountHolder" className={inputClass} required />
            </Field>
            <Field id="bank-account" label="Bank account number" required>
              <Input id="bank-account" name="accountNumber" inputMode="numeric" className={inputClass} required />
            </Field>
            <Field id="bank-ifsc" label="RTGS / IFSC code" required>
              <Input id="bank-ifsc" name="ifsc" className={inputClass} required />
            </Field>
            <Field id="bank-state" label="State" required>
              <Input id="bank-state" name="bankState" className={inputClass} required />
            </Field>
            <Field id="bank-city" label="City" required>
              <Input id="bank-city" name="bankCity" className={inputClass} required />
            </Field>
            <Field id="bank-address" label="Bank address" required className="sm:col-span-2">
              <Textarea id="bank-address" name="bankAddress" rows={2} className={textAreaClass} required />
            </Field>
            <Field id="cancelled-cheque" label="Cancelled cheque">
              <FileInput id="cancelled-cheque" accept=".pdf,.jpg,.jpeg,.png" />
            </Field>
          </FormSection>

          <FormSection
            number="07"
            title="Supporting documents and declaration"
            description="You can select documents for reference. Files stay on your device."
          >
            <Field id="pf-document" label="PF registration / certificate">
              <FileInput id="pf-document" accept=".pdf,.jpg,.jpeg,.png" />
            </Field>
            <Field id="esi-document" label="ESI registration / certificate">
              <FileInput id="esi-document" accept=".pdf,.jpg,.jpeg,.png" />
            </Field>
            <Field id="insurance-document" label="Insurance certificate">
              <FileInput id="insurance-document" accept=".pdf,.jpg,.jpeg,.png" />
            </Field>
            <Field id="other-documents" label="Other supporting documents" className="sm:col-span-2">
              <FileInput id="other-documents" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" multiple />
            </Field>
            <Field id="relative-details" label="Details of any relative working at Unique Engineers Limited" className="sm:col-span-2">
              <Textarea id="relative-details" name="relativeDetails" rows={2} className={textAreaClass} placeholder="Enter names and relationship, or write None." />
            </Field>
            <label className="flex items-start gap-3 border-t border-[color:var(--ink-100)] pt-5 text-sm leading-6 text-[color:var(--ink-700)] sm:col-span-2">
              <input name="declaration" type="checkbox" required className="mt-1 size-4 accent-[color:var(--accent-600)]" />
              <span>
                I certify that the vendor / company / firm represented in this
                application is not blacklisted by any government agency or
                Unique Engineers Limited. I understand that SITC vendors must
                provide PF, ESI, and insurance documents where applicable.
                <span className="ml-1 text-[color:var(--stop)]">*</span>
              </span>
            </label>
          </FormSection>

          <div className="flex flex-col gap-4 border-t border-[color:var(--border-color)] py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[64ch] text-sm leading-6 text-[color:var(--ink-500)]">
              Your registration details will be emailed to marketing@uelimited.com.
              Selected files stay on your device.
            </p>
            <Button type="submit" disabled={sending} className="h-12 rounded-md px-7 text-[15px] font-medium">
              {sending ? "Sending registration..." : "Submit vendor registration"}
            </Button>
          </div>
        </form>
      </div>

      {submitted ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ink-950)]/45 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-success-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--paper)] p-6 shadow-[0_24px_80px_rgba(10,12,16,0.12)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-50)] text-[26px] text-[color:var(--accent-600)]">
              ✓
            </div>
            <h2 id="registration-success-title" className="text-[28px] font-medium text-[color:var(--ink-950)]">
              Registration sent.
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-[color:var(--ink-600)]">
              Your registration details were emailed to
              marketing@uelimited.com.
            </p>
            <div className="mt-6 flex justify-end">
              <Button type="button" onClick={() => setSubmitted(false)} className="h-10 rounded-full px-5 text-[14px] font-medium">
                Done
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-b border-[color:var(--border-color)] py-8 md:grid-cols-[minmax(190px,0.65fr)_minmax(0,1.35fr)] md:gap-10 md:py-11">
      <header>
        <p className="font-mono text-[11px] uppercase text-[color:var(--accent-600)]">Section {number}</p>
        <h2 className="mt-2 text-[24px] font-medium leading-tight text-[color:var(--ink-950)]">
          {title}
        </h2>
        <p className="mt-2 max-w-[34ch] text-sm leading-6 text-[color:var(--ink-500)]">
          {description}
        </p>
      </header>
      <div className="grid content-start gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`grid content-start gap-2 ${className ?? ""}`}>
      <Label htmlFor={id} className="text-[13px] text-[color:var(--ink-700)]">
        {label}
        {required && <span className="ml-1 text-[color:var(--stop)]">*</span>}
      </Label>
      {children}
    </div>
  );
}

function FileInput({
  id,
  accept,
  multiple,
}: {
  id: string;
  accept: string;
  multiple?: boolean;
}) {
  return (
    <Input
      id={id}
      type="file"
      accept={accept}
      multiple={multiple}
      className="min-h-12 w-full rounded-xl border-[color:var(--border-color)] bg-[color:var(--paper)] px-3 py-2 text-sm text-[color:var(--ink-700)] file:mr-3 file:rounded-full file:border-0 file:bg-[color:var(--accent-50)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[color:var(--accent-700)]"
    />
  );
}

function YesNoField({
  id,
  label,
  name,
}: {
  id: string;
  label: string;
  name: string;
}) {
  return (
    <Field id={id} label={label} required>
      <select id={id} name={name} className={inputClass} defaultValue="" required>
        <option value="" disabled>Select one</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </Field>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2 text-sm font-medium text-[color:var(--ink-700)] transition-colors hover:border-[color:var(--accent-400)] hover:text-[color:var(--accent-700)]"
    >
      <Plus aria-hidden className="size-4" />
      {children}
    </button>
  );
}

function RemoveButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex w-fit items-center gap-2 self-start rounded-md px-2 py-2 text-sm text-[color:var(--stop)] hover:bg-[color:var(--ink-50)]"
    >
      <Trash2 aria-hidden className="size-4" />
      Remove
    </button>
  );
}

import { EmailJSResponseStatus, send } from "@emailjs/browser";
import { CAREERS_EMAIL } from "@/data/careers";

const fieldLabels: Record<string, string> = {
  name: "Full name",
  email: "Email address",
  phone: "Phone number",
  department: "Department",
  position: "Applied role",
  experience: "Experience",
  location: "Current location",
  profileLink: "Profile link",
  note: "Application note",
  serviceStates: "States served",
  registrationFor: "Registration for",
  legalName: "Legal entity name",
  entityAddress: "Registered address",
  country: "Country",
  state: "State",
  city: "City",
  pinCode: "PIN code",
  entityEmail: "Company email",
  entityMobile: "Company mobile",
  website: "Website",
  entityType: "Entity type",
  hasAadhaar: "Has Aadhaar card",
  businessNature: "Nature of business",
  vendorType: "Vendor type",
  isMsme: "MSME registration",
  designation: "Designation",
  landline: "Landline",
  fax: "Fax",
  hasPan: "Has PAN",
  hasGst: "GST registration",
  label: "Address label",
  pin: "PIN code",
  address: "Full address",
  bankName: "Bank name",
  bankBranch: "Branch",
  accountHolder: "Account holder",
  accountNumber: "Account number",
  ifsc: "RTGS / IFSC code",
  bankState: "Bank state",
  bankCity: "Bank city",
  bankAddress: "Bank address",
  relativeDetails: "Relative details",
  declaration: "Declaration",
};

const repeatLabels: Record<string, string> = {
  contacts: "Contact person",
  authorized: "Authorized person",
  addresses: "Additional address",
};

function getFieldLabel(field: string) {
  const repeatedField = /^(contacts|authorized|addresses)\.(\d+)\.(\w+)$/.exec(field);
  if (repeatedField) {
    const [, group, index, property] = repeatedField;
    return `${repeatLabels[group]} ${Number(index) + 1} — ${fieldLabels[property] ?? property}`;
  }

  return fieldLabels[field] ?? field;
}

function getEmailParams(form: HTMLFormElement) {
  const fields = Object.fromEntries(
    Array.from(new FormData(form)).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  const { form_type, subject, ...details } = fields;

  if (form_type === "Contact enquiry") {
    return { ...fields, show_contact: true, is_vendor: false };
  }

  const detail_rows = Object.entries(details).map(([key, value]) => ({
    label: getFieldLabel(key),
    value: key === "declaration" && value === "on" ? "Accepted" : value.trim() || "—",
  }));

  return {
    form_type,
    subject,
    email: details.email || details.entityEmail,
    is_vendor: form_type === "Vendor registration",
    detail_rows,
  };
}

export async function sendEmailForm(
  form: HTMLFormElement,
  channel: "general" | "careers" = "general",
) {
  const isCareers = channel === "careers";
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const templateId = isCareers
    ? process.env.NEXT_PUBLIC_EMAILJS_CAREERS_TEMPLATE_ID
    : process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !publicKey || !templateId) {
    throw new Error("Email delivery is unavailable. Please try again later.");
  }

  try {
    const params = getEmailParams(form);
    await send(
      serviceId,
      templateId,
      isCareers ? { ...params, to_email: CAREERS_EMAIL } : params,
      { publicKey },
    );
  } catch (error) {
    if (error instanceof EmailJSResponseStatus && error.status === 413) {
      throw new Error("The form text is too long. Shorten it and try again.");
    }

    throw new Error("Please try again in a moment.");
  }
}

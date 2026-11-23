import type { Metadata } from "next";
import { ApplicationForm } from "./application-form";

export const metadata: Metadata = {
  title: "Apply for a role — Careers at Unique Engineers",
  description:
    "Share your profile and choose a department to apply for a role at Unique Engineers.",
};

export default async function CareerApplicationPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; department?: string }>;
}) {
  const { role, department } = await searchParams;

  return (
    <ApplicationForm
      initialRole={role ?? ""}
      initialDepartment={department ?? ""}
    />
  );
}
"use client";

import { Tabs } from "@base-ui/react/tabs";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const DOCUMENT_GROUPS = [
  {
    id: "name-change",
    label: "Name Change",
    documents: [
      { title: "Name Change", file: "name-change.pdf" },
    ],
  },
  {
    id: "annual-returns",
    label: "Annual Returns",
    documents: [
      { title: "Annual Return FY 2024–25", file: "annual-return-fy-24-25.pdf" },
      { title: "Annual Return FY 2023–24", file: "annual-return-fy-23-24.pdf" },
      { title: "Annual Return FY 2022–23", file: "annual-return-fy-22-23.pdf" },
      { title: "Annual Return FY 2021–22", file: "annual-return-fy-21-22.pdf" },
      { title: "Annual Return FY 2020–21", file: "annual-return-fy-20-21.pdf" },
    ],
  },
  {
    id: "policy",
    label: "Policy",
    documents: [
      { title: "Whistle Blower Policy", file: "whistle-blower-policy.pdf" },
      { title: "Corporate Social Responsibility Policy", file: "corporate-social-responsibility-policy.pdf" },
      { title: "Code of Conduct for Independent Directors", file: "code-of-conduct-independent-directors.pdf" },
      { title: "POSH Policy", file: "posh-policy.pdf" },
    ],
  },
];

export function InvestorDocuments() {
  return (
    <section className="ue-section" aria-labelledby="investor-documents-title">
      <div className="ue-container">
        <header className="ue-investors__section-head">
          <h2 id="investor-documents-title">Investor documents</h2>
        </header>

        <Tabs.Root defaultValue="name-change">
          <Tabs.List
            aria-label="Investor document categories"
            className="flex flex-wrap gap-2 border-b border-[var(--border-color)] pb-3"
          >
            {DOCUMENT_GROUPS.map((group) => (
              <Tabs.Tab
                key={group.id}
                value={group.id}
                className="min-h-11 cursor-pointer rounded-full px-4 text-sm font-medium text-[var(--ink-700)] hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-active:bg-primary data-active:text-primary-foreground"
              >
                {group.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {DOCUMENT_GROUPS.map((group) => (
            <Tabs.Panel key={group.id} value={group.id}>
              <ul className="m-0 list-none divide-y divide-[var(--border-color)] p-0">
                {group.documents.map(({ title, file }) => {
                  const href = `/investor-documents/${file}`;
                  return (
                    <li
                      key={file}
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4"
                    >
                      <div className="flex min-w-0 flex-1 basis-48 items-center gap-3">
                        <FileText className="size-5 shrink-0 text-primary" aria-hidden />
                        <span className="font-medium">{title}</span>
                      </div>
                      <div className="ml-auto flex shrink-0 items-center gap-2">
                        <Button asChild variant="outline" size="lg">
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${title} (opens in a new tab)`}
                          >
                            View <ArrowUpRight aria-hidden />
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                          <a href={href} download aria-label={`Download ${title}`}>
                            Download <Download aria-hidden />
                          </a>
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, ArrowRight } from "lucide-react";
import { NAV, SECTOR_NAV } from "@/data/firm";
import { SERVICES } from "@/data/site-content";
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/utils";
import { getCompanyFactDisplay } from "@/data/company-facts";

type NavItem = {
  href: string;
  label: string;
  menu?: "capabilities" | "sectors" | "firm";
};

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isItemActive = (item: NavItem) =>
    isActive(item.href) ||
    (item.menu === "capabilities" &&
      pathname.startsWith("/execution-library")) ||
    (item.menu === "firm" &&
      [
        "/leadership",
        "/culture",
        "/engineering-strength",
        "/workforce",
        "/journey",
        "/innovation-ai",
        "/corporate-snapshot",
        "/quality-safety",
        "/technology",
        "/approach",
        "/careers",
      ].some((href) => pathname.startsWith(href)));

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn("ue-header", scrolled && "ue-header--scrolled")}
    >
      <div className="inner">
        <Link href="/" className="brand" aria-label="Unique Engineers — home">
          <Wordmark />
        </Link>

        {/* Desktop nav — four peers (Capabilities, Industries, Projects, Company).
            Capabilities, Industries and Company open mega-menus.
            The wordmark is the home link, so Home is not repeated. */}
        <NavigationMenu className="hidden md:flex ml-auto" align="start">
          <NavigationMenuList className="gap-0">
            {(NAV as NavItem[]).map((item) =>
              item.menu ? (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger
                    className={cn(
                      "ue-nav-link",
                      isItemActive(item) && "ue-nav-link--active",
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    {item.menu === "sectors" ? (
                      <SectorsMenu />
                    ) : item.menu === "firm" ? (
                      <FirmMenu />
                    ) : (
                      <CapabilitiesMenu />
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={<Link href={item.href} />}
                    data-active={isItemActive(item) ? "" : undefined}
                    className={cn(
                      "ue-nav-link",
                      isItemActive(item) && "ue-nav-link--active",
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto md:ml-4 flex items-center gap-2">
          <Button
            asChild
            className="rounded-full px-5 h-9 text-[14px] font-medium"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function FirmMenu() {
  const links = [
    {
      href: "/about",
      name: "Our story",
      blurb: "Who we are and how the practice has grown.",
    },
    {
      href: "/leadership",
      name: "Leadership",
      blurb: "The people responsible for our direction and delivery.",
    },
    {
      href: "/approach",
      name: "How we deliver",
      blurb: "Engineering, site execution, quality and safety.",
    },
    {
      href: "/careers",
      name: "Careers",
      blurb: "Build your career with Unique Engineers.",
    },
  ];

  return (
    <div className="ue-services-menu">
      <div className="ue-services-menu__head">
        <div className="ue-eyebrow" style={{ margin: 0 }}>
          About Unique
        </div>
        <p
          className="text-[color:var(--ink-500)]"
          style={{ fontSize: 14, margin: "8px 0 0", maxWidth: "36ch" }}
        >
          Our history, our people and the way we work.
        </p>
      </div>
      <div className="ue-services-menu__grid">
        {links.map((item, index) => (
          <NavigationMenuLink
            key={item.href}
            render={<Link href={item.href} />}
            className="ue-services-menu__item group"
          >
            <span className="num">{String(index + 1).padStart(2, "0")}</span>
            <span className="body">
              <span className="name">{item.name}</span>
              <span className="blurb">{item.blurb}</span>
            </span>
          </NavigationMenuLink>
        ))}
      </div>
      <div className="ue-services-menu__foot">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent-500)] hover:text-[color:var(--accent-700)]"
        >
          Get to know Unique <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function CapabilitiesMenu() {
  return (
    <div className="ue-services-menu">
      <div className="ue-services-menu__head">
        <div className="ue-eyebrow" style={{ margin: 0 }}>
          Services
        </div>
        <p
          className="text-[color:var(--ink-500)]"
          style={{ fontSize: 14, margin: "8px 0 0", maxWidth: "36ch" }}
        >
          {getCompanyFactDisplay("delivery_disciplines")} under one delivery
          standard.
        </p>
      </div>
      <div className="ue-services-menu__grid">
        {SERVICES.map((d, index) => (
          <NavigationMenuLink
            key={d.slug}
            render={<Link href={`/services/${d.slug}`} />}
            className="ue-services-menu__item group"
          >
            <span className="num">{String(index + 1).padStart(2, "0")}</span>
            <span className="body">
              <span className="name">{d.name}</span>
              <span className="blurb">{d.description}</span>
            </span>
          </NavigationMenuLink>
        ))}
      </div>
      <div className="ue-services-menu__foot">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent-500)] hover:text-[color:var(--accent-700)]"
          >
            View all services <ArrowRight className="size-3.5" aria-hidden />
          </Link>
          <Link
            href="/execution-library"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--ink-700)] hover:text-[color:var(--accent-700)]"
          >
            Execution Library <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectorsMenu() {
  return (
    <div className="ue-services-menu">
      <div className="ue-services-menu__head">
        <div className="ue-eyebrow" style={{ margin: 0 }}>
          Industries
        </div>
        <p
          className="text-[color:var(--ink-500)]"
          style={{ fontSize: 14, margin: "8px 0 0", maxWidth: "36ch" }}
        >
          Nine industries — led by data centres, semiconductor and airports.
        </p>
      </div>
      <div className="ue-services-menu__grid">
        {SECTOR_NAV.map((s, i) => (
          <NavigationMenuLink
            key={s.slug}
            render={<Link href={`/sectors/${s.slug}`} />}
            className="ue-services-menu__item group"
          >
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span className="body">
              <span className="name">{s.name}</span>
              <span className="blurb">{s.blurb}</span>
            </span>
          </NavigationMenuLink>
        ))}
      </div>
      <div className="ue-services-menu__foot">
        <Link
          href="/sectors"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent-500)] hover:text-[color:var(--accent-700)]"
        >
          View all industries <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function MobileMenu() {
  const primary = NAV as NavItem[];
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  const firmLinks = [
    { href: "/about", label: "Our story" },
    { href: "/leadership", label: "Leadership" },
    { href: "/approach", label: "How we deliver" },
    { href: "/careers", label: "Careers" },
  ];
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open menu"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[color:var(--border-color)] bg-transparent text-[color:var(--ink-950)] transition-colors hover:bg-[color:var(--ink-50)] focus-visible:outline-2 focus-visible:outline-[color:var(--accent-500)] focus-visible:outline-offset-2"
        >
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-[color:var(--paper)] border-l-[color:var(--border-color)] overflow-y-auto"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div
            className="pt-12 px-6 flex flex-col gap-1"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            {primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-[17px] font-medium text-[color:var(--ink-950)] border-b border-[color:var(--border-color)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-5 pb-1 text-[12px] font-medium tracking-[0.02em] text-[color:var(--ink-400)]">
              About Unique
            </div>
            {firmLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-[15px] text-[color:var(--ink-700)]"
              >
                {item.label}
              </Link>
            ))}
            {/* Sector quick-links — surface the high-value verticals directly */}
            <div className="pt-5 pb-1 text-[12px] font-medium tracking-[0.02em] text-[color:var(--ink-400)]">
              Industries
            </div>
            {SECTOR_NAV.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                href={`/sectors/${s.slug}`}
                className="py-2 text-[15px] text-[color:var(--ink-700)]"
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="/execution-library"
              className="mt-3 py-3 text-[15px] font-medium text-[color:var(--accent-600)] border-y border-[color:var(--border-color)]"
            >
              Execution Library
            </Link>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[color:var(--accent-500)] px-5 h-11 text-[15px] font-medium text-white"
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

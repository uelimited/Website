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
import { NAV, SECTOR_NAV, DISCIPLINES } from "@/data/firm";
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/utils";

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
    href === "/"
      ? pathname === "/"
      : href === "/firm"
        ? pathname === "/firm"
        : pathname.startsWith(href);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn("ue-header", scrolled && "ue-header--scrolled")}
    >
      <div className="inner">
        <Link href="/" className="brand" aria-label="Unique Engineers — home">
          <Wordmark />
        </Link>

        {/* Desktop nav — Capabilities, Sectors, and The firm open menus;
          Projects and Careers remain direct links.
            The wordmark is the home link, so Home is not repeated. */}
        <NavigationMenu className="hidden lg:flex ml-auto" align="start">
          <NavigationMenuList className="gap-0">
            {(NAV as NavItem[]).map((item) =>
              item.menu ? (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger
                    className={cn(
                      "ue-nav-link",
                      isActive(item.href) && "ue-nav-link--active",
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    {item.menu === "sectors" ? (
                      <SectorsMenu />
                    ) : item.menu === "capabilities" ? (
                      <CapabilitiesMenu />
                    ) : (
                      <FirmMenu />
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={<Link href={item.href} />}
                    data-active={isActive(item.href) ? "" : undefined}
                    className={cn(
                      "ue-nav-link",
                      isActive(item.href) && "ue-nav-link--active",
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              asChild
              className="rounded-full px-5 h-9 text-[14px] font-medium"
            >
              <Link href="/contact">Contact</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-5 h-9 text-[14px] font-medium"
            >
              <Link href="/registration">Vendors Registration</Link>
            </Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function CapabilitiesMenu() {
  return (
    <div className="ue-services-menu">
      <div className="ue-services-menu__head">
        <div className="ue-eyebrow" style={{ margin: 0 }}>
          Capabilities
        </div>
        <p
          className="text-[color:var(--ink-500)]"
          style={{ fontSize: 14, margin: "8px 0 0", maxWidth: "36ch" }}
        >
          Eight disciplines under one delivery standard.
        </p>
      </div>
      <div className="ue-services-menu__grid">
        {DISCIPLINES.map((d) => (
          <NavigationMenuLink
            key={d.slug}
            render={<Link href={`/services/${d.slug}`} />}
            className="ue-services-menu__item group"
          >
            <span className="num">{d.num}</span>
            <span className="body">
              <span className="name">{d.name}</span>
              <span className="blurb">{d.blurb}</span>
            </span>
          </NavigationMenuLink>
        ))}
      </div>
      <div className="ue-services-menu__foot">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent-500)] hover:text-[color:var(--accent-700)]"
        >
          View all capabilities <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function SectorsMenu() {
  return (
    <div className="ue-services-menu">
      <div className="ue-services-menu__head">
        <div className="ue-eyebrow" style={{ margin: 0 }}>
          Sectors
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
          View all sectors <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function FirmMenu() {
  return (
    <div className="ue-services-menu">
      <div className="ue-services-menu__head">
        <div className="ue-eyebrow" style={{ margin: 0 }}>
          The firm
        </div>
        <p
          className="text-[color:var(--ink-500)]"
          style={{ fontSize: 14, margin: "8px 0 0", maxWidth: "36ch" }}
        >
          Meet the people and explore opportunities at Unique Engineers.
        </p>
      </div>
      <div className="ue-services-menu__grid">
        <NavigationMenuLink
          render={<Link href="/firm#our-story" />}
          className="ue-services-menu__item group"
        >
          <span className="num">01</span>
          <span className="body">
            <span className="name">Our Story</span>
            <span className="blurb">
              See the history and momentum behind the firm.
            </span>
          </span>
        </NavigationMenuLink>
        <NavigationMenuLink
          render={<Link href="/firm#how-we-deliver" />}
          className="ue-services-menu__item group"
        >
          <span className="num">02</span>
          <span className="body">
            <span className="name">How We Deliver</span>
            <span className="blurb">
              Precision planning, execution and accountability on every site.
            </span>
          </span>
        </NavigationMenuLink>
        <NavigationMenuLink
          render={<Link href="/firm#leadership" />}
          className="ue-services-menu__item group"
        >
          <span className="num">03</span>
          <span className="body">
            <span className="name">Our Leadership</span>
            <span className="blurb">
              Meet the engineers behind the practice.
            </span>
          </span>
        </NavigationMenuLink>
        <NavigationMenuLink
          render={<Link href="/firm/culture" />}
          className="ue-services-menu__item group"
        >
          <span className="num">04</span>
          <span className="body">
            <span className="name">Culture</span>
            <span className="blurb">Meet the people and values behind the work.</span>
          </span>
        </NavigationMenuLink>
        <NavigationMenuLink
          render={<Link href="/investors" />}
          className="ue-services-menu__item group"
        >
          <span className="num">05</span>
          <span className="body">
            <span className="name">Investors</span>
            <span className="blurb">Company profile, scale and project record.</span>
          </span>
        </NavigationMenuLink>
      </div>
      <div className="ue-services-menu__foot">
        <Link
          href="/firm"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent-500)] hover:text-[color:var(--accent-700)]"
        >
          Firm overview <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function MobileMenu() {
  const primary = NAV as NavItem[];
  return (
    <div className="lg:hidden">
      <Sheet>
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
          <div className="pt-12 px-6 flex flex-col gap-1">
            {primary.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-[17px] font-medium text-[color:var(--ink-950)] border-b border-[color:var(--border-color)]"
                >
                  {item.label}
                </Link>
                {item.menu === "firm" && (
                  <div className="ue-mobile-firm-links">
                    <Link href="/firm#our-story">Our Story</Link>
                    <Link href="/firm#how-we-deliver">How We Deliver</Link>
                    <Link href="/firm#leadership">Our Leadership</Link>
                    <Link href="/firm/culture">Culture</Link>
                    <Link href="/investors">Investors</Link>
                  </div>
                )}
              </div>
            ))}
            {/* Sector quick-links — surface the high-value verticals directly */}
            <div className="pt-5 pb-1 text-[12px] font-medium tracking-[0.02em] text-[color:var(--ink-400)]">
              Sectors
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
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[color:var(--accent-500)] px-5 h-11 text-[15px] font-medium text-white"
            >
              Contact
            </Link>
            <Link
              href="/registration"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-color)] px-5 h-11 text-[15px] font-medium text-[color:var(--ink-950)]"
            >
              Vendors Registration
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

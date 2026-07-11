"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";

export type SubServiceItem = {
  slug: string;
  num: string;
  name: string;
  blurb: string;
  href: string;
};

/**
 * Sub-services as a single clean accordion — replaces the old
 * three-taxonomy card grid. One row per sub-discipline, big type;
 * opening a row reveals a short description and a link to its page.
 * The first row starts open so the pattern is self-explanatory.
 */
export function SubServicesList({ items }: { items: SubServiceItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="ue-subx">
      {items.map((c, i) => {
        const isOpen = open === i;
        return (
          <div
            key={c.slug}
            className="ue-subx__item"
            data-open={isOpen ? "" : undefined}
          >
            <button
              type="button"
              className="ue-subx__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="ue-subx__num">{c.num}</span>
              <span className="ue-subx__name">{c.name}</span>
              <span className="ue-subx__icon" aria-hidden>
                <Plus />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="ue-subx__body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="ue-subx__body-inner">
                    <p className="ue-subx__blurb">{c.blurb}</p>
                    <Link href={c.href} className="ue-subx__link">
                      Explore {c.name}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { themes } from "@/data/home";

export function SiteHeader({ tone = "plain" }: { tone?: "hero" | "plain" }) {
  const [open, setOpen] = useState(false);
  const onHero = tone === "hero";

  return (
    <>
      <header
        className={
          onHero
            ? "sticky top-0 z-40 border-b border-line bg-white lg:absolute lg:inset-x-0 lg:border-0 lg:bg-transparent"
            : "sticky top-0 z-40 border-b border-line bg-white"
        }
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link href="/" className="leading-tight">
            <span
              className={`block text-lg font-semibold tracking-tight ${onHero ? "text-navy lg:text-white" : "text-navy"}`}
            >
              Marketplace
            </span>
            <span
              className={`block text-xs font-medium uppercase tracking-[0.16em] ${onHero ? "text-ocean lg:text-glacier" : "text-ocean"}`}
            >
              Formation
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
            <Link
              href="/recherche"
              className={`text-sm font-medium ${onHero ? "text-white hover:text-glacier" : "text-ink hover:text-ocean"}`}
            >
              Formations
            </Link>
            <Link
              href="/espace-centre"
              className={`text-sm font-medium ${onHero ? "text-white hover:text-glacier" : "text-ink hover:text-ocean"}`}
            >
              Espace centre
            </Link>
          </nav>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${onHero ? "border-line text-navy" : "border-line text-navy"}`}
            aria-expanded={open}
            aria-controls="menu-categories"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Ouvrir les catégories</span>
          </button>
        </div>
      </header>

      {open ? (
        <div id="menu-categories" className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex h-14 items-center justify-between bg-navy px-4 text-white">
            <p className="font-semibold">Toutes les catégories</p>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Fermer le menu</span>
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto px-2 py-2">
            {themes.map((theme) => (
              <li key={theme}>
                <Link
                  href={`/recherche?q=${encodeURIComponent(theme)}`}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-foam"
                  onClick={() => setOpen(false)}
                >
                  {theme}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

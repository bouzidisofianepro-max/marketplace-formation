"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { deconnecter } from "@/app/espace-centre/actions";

const onglets = [
  { id: "tableau", label: "Tableau de bord" },
  { id: "demandes", label: "Mes demandes de contact" },
  { id: "statistique", label: "Statistique" },
  { id: "profil", label: "Profil" },
  { id: "formations", label: "Formations" },
  { id: "actions", label: "Actions" },
  { id: "sessions", label: "Sessions" },
] as const;

export function CoquilleCentre({
  nom,
  onglet,
  children,
}: {
  nom: string;
  onglet: string;
  children: React.ReactNode;
}) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-navy"
            aria-expanded={ouvert}
            aria-controls="menu-centre"
            onClick={() => setOuvert(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Ouvrir le menu</span>
          </button>

          <Link href="/" className="shrink-0 leading-tight">
            <span className="block text-lg font-semibold tracking-tight text-navy">Marketplace</span>
            <span className="block text-xs font-medium uppercase tracking-[0.16em] text-ocean">Formation</span>
          </Link>

          <div className="min-w-0 border-l border-line pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ocean">Espace centre</p>
            <p className="truncate text-sm font-semibold text-ink">{nom}</p>
          </div>
        </div>
      </header>

      {ouvert ? (
        <div className="fixed inset-0 z-50 flex">
          <aside id="menu-centre" className="flex h-full w-72 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <p className="font-semibold text-ink">Menu</p>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center text-navy"
                onClick={() => setOuvert(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Fermer le menu</span>
              </button>
            </div>
            <nav className="flex-1 px-2 py-2" aria-label="Gestion du centre">
              {onglets.map((item) => (
                <Link
                  key={item.id}
                  href={`/espace-centre?onglet=${item.id}`}
                  className={`block rounded-xl px-3 py-3 text-base font-medium ${
                    onglet === item.id ? "bg-navy text-white" : "text-ink hover:bg-foam"
                  }`}
                  onClick={() => setOuvert(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <form action={deconnecter} className="border-t border-line p-4">
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-navy text-sm font-semibold text-white hover:bg-navy-deep"
              >
                Se déconnecter
              </button>
            </form>
          </aside>
          <button
            type="button"
            className="h-full flex-1 bg-ink/40"
            aria-label="Fermer le menu"
            onClick={() => setOuvert(false)}
          />
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}

import type { Metadata } from "next";
import { lireEspace } from "@marketplace/data/centre";
import { AuthPanel } from "@/components/espace-centre/auth-panel";
import { Bureau } from "@/components/espace-centre/bureau";
import { CentreHighlights } from "@/components/espace-centre/highlights";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Espace centre — Marketplace Formation",
  description:
    "Connexion et inscription des centres de formation pour publier leurs sessions et suivre les demandes.",
};

const ongletsConnus = ["tableau", "demandes", "statistique", "profil", "formations", "actions", "sessions"];

export default async function EspaceCentrePage({
  searchParams,
}: {
  searchParams: Promise<{ onglet?: string; ok?: string; erreur?: string }>;
}) {
  const params = await searchParams;
  const espace = await lireEspace();

  if (espace) {
    const onglet = ongletsConnus.includes(params.onglet ?? "") ? (params.onglet ?? "tableau") : "tableau";
    return (
      <Bureau
        centre={espace.centre}
        formations={espace.formations}
        actions={espace.actions}
        sessions={espace.sessions}
        demandes={espace.demandes}
        stats={espace.stats}
        onglet={onglet}
        ok={params.ok === "1"}
        erreur={params.erreur ?? ""}
      />
    );
  }

  return (
    <>
      <div className="relative">
        <SiteHeader tone="hero" />
        <section className="bg-navy text-white">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:pb-16 lg:pt-28">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-glacier">
                Espace centre
              </p>
              <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                Publiez vos formations et suivez les demandes.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 md:text-base">
                L&apos;espace est réservé aux organismes de formation. Connectez-vous, créez un compte, ou récupérez un mot de passe.
              </p>
              <ul className="mt-6 max-w-lg space-y-3 text-sm leading-6 text-white/90">
                <li>Présentez vos sessions aux personnes qui cherchent à se former.</li>
                <li>Gardez les dates, les places et les villes à jour.</li>
                <li>Répondez aux demandes depuis le même compte.</li>
              </ul>
            </div>
            <AuthPanel />
          </div>
        </section>
      </div>
      <main className="flex-1">
        <CentreHighlights />
      </main>
      <SiteFooter />
    </>
  );
}

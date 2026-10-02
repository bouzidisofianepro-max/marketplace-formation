import { Building2, CalendarDays, Inbox, type LucideIcon } from "lucide-react";

const features: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Vos formations",
    text: "Décrivez le métier, le rythme, le lieu et si la session peut être financée avec le CPF.",
    icon: Building2,
  },
  {
    title: "Les demandes",
    text: "Voyez qui souhaite une place et répondez sans quitter l’espace.",
    icon: Inbox,
  },
  {
    title: "Vos sessions",
    text: "Mettez à jour les dates, les places restantes et les villes où vous formez.",
    icon: CalendarDays,
  },
];

const steps = [
  { n: "1", title: "Créez le compte", text: "Avec l’e-mail du centre et un mot de passe." },
  { n: "2", title: "Ajoutez une formation", text: "Le titre, le public et le mode : en centre ou à distance." },
  { n: "3", title: "Suivez les demandes", text: "Chaque nouvelle demande apparaît dans votre espace." },
];

export function CentreHighlights() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16">
        <h2 className="text-xl font-semibold text-ink md:text-2xl">Ce que vous faites dans l’espace</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(11,61,110,0.06)] ring-1 ring-line"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foam text-ocean">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16">
          <h2 className="text-xl font-semibold text-ink md:text-2xl">Comment ça se passe</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl bg-mist p-5 ring-1 ring-line">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {step.n}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

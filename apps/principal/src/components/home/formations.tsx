import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Formation } from "@/data/home";

export function FormationCard({ formation }: { formation: Formation }) {
  const initials = formation.centre
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(11,61,110,0.06)] ring-1 ring-line">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-ink">{formation.title}</h3>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foam text-xs font-semibold text-navy">
            {initials}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">{formation.centre}</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-ink">
          <MapPin className="h-4 w-4 text-ocean" aria-hidden="true" />
          {formation.place}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {formation.cpf ? (
            <span className="rounded-lg bg-glacier px-2 py-1 text-xs font-semibold text-navy">Finançable CPF</span>
          ) : null}
          <span className="text-sm text-ink">{formation.price}</span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-1 text-sm text-muted">
          <Star className="h-4 w-4 fill-ocean text-ocean" aria-hidden="true" />
          <span>{formation.rating}</span>
        </p>
        <Link
          href={`/recherche?q=${encodeURIComponent(formation.title)}`}
          className="rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep"
        >
          Voir la formation
        </Link>
      </div>
    </article>
  );
}

export function Formations({ items }: { items: Formation[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10">
      <h2 className="text-xl font-semibold text-ink md:text-2xl">Les formations les plus consultées</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((formation) => (
          <FormationCard key={formation.id} formation={formation} />
        ))}
      </div>
    </section>
  );
}

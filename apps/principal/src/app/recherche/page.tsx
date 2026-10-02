import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FormationCard } from "@/components/home/formations";
import { formations } from "@/data/home";

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = one(params.q).trim().toLowerCase();
  const place = one(params.lieu).trim().toLowerCase();
  const cpfOnly = one(params.cpf) === "1";

  const results = formations.filter((formation) => {
    const haystack = `${formation.title} ${formation.centre} ${formation.place} ${formation.tags.join(" ")}`.toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (place && !formation.place.toLowerCase().includes(place)) return false;
    if (cpfOnly && !formation.cpf) return false;
    return true;
  });

  const summary = [
    query ? `« ${one(params.q).trim()} »` : null,
    place ? one(params.lieu).trim() : null,
    cpfOnly ? "finançable CPF" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-semibold text-ink md:text-3xl">Résultats</h1>
        <p className="mt-2 text-sm text-muted">
          {summary ? summary : "Toutes les formations pour le moment."} — {results.length} formation
          {results.length > 1 ? "s" : ""}
        </p>
        {results.length === 0 ? (
          <p className="mt-8 rounded-2xl bg-white p-6 text-ink ring-1 ring-line">
            Aucune formation ne correspond. Essayez un autre métier ou une autre ville.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { articles, centres, cities, jobs, themes } from "@/data/home";

export function Themes() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12">
      <h2 className="text-xl font-semibold text-ink">Thématiques</h2>
      <ul className="mt-5 flex flex-wrap gap-3">
        {themes.map((theme) => (
          <li key={theme}>
            <Link
              href={`/recherche?q=${encodeURIComponent(theme)}`}
              className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm ring-1 ring-line hover:bg-foam"
            >
              {theme}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function News() {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold text-ink md:text-2xl">À lire avant de choisir</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="overflow-hidden rounded-2xl ring-1 ring-line transition hover:-translate-y-0.5"
            >
              <div className="h-28 bg-gradient-to-br from-navy to-sky" />
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ocean">{article.kicker}</p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{article.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProBanner() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-glacier md:text-2xl">La formation professionnelle</h2>
          <p className="mt-3 text-sm leading-7 text-white/85 md:text-base">
            Une formation sert à apprendre un métier, à changer de poste ou à faire reconnaître ce que vous savez déjà faire. Certaines sont en centre, d&apos;autres à distance, et une partie peut être financée avec le CPF.
          </p>
          <Link
            href="/recherche?q=professionnelle"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy"
          >
            Voir les formations professionnelles
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Je veux me former</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {jobs.map((job) => (
              <li key={job}>
                <Link
                  href={`/recherche?q=${encodeURIComponent(job)}`}
                  className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/20"
                >
                  {job}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Cities() {
  const featured = cities.slice(0, 4);
  const rest = cities.slice(4);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="text-xl font-semibold text-ink md:text-2xl">Les formations par ville</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((city) => (
          <Link
            key={city}
            href={`/recherche?lieu=${encodeURIComponent(city)}`}
            className="flex h-36 items-end rounded-3xl bg-gradient-to-br from-navy to-sky p-5 text-lg font-semibold text-white"
          >
            {city}
          </Link>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {rest.map((city) => (
          <li key={city}>
            <Link
              href={`/recherche?lieu=${encodeURIComponent(city)}`}
              className="inline-flex rounded-lg border border-ocean px-3 py-1 text-sm font-semibold text-ocean hover:bg-ocean hover:text-white"
            >
              {city}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Centres() {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold text-ink">Ils proposent leurs formations ici</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {centres.map((centre) => {
            const initials = centre
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase();
            return (
              <li key={centre} className="rounded-2xl bg-mist p-5 ring-1 ring-line">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {initials}
                </span>
                <p className="mt-3 font-semibold text-ink">{centre}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

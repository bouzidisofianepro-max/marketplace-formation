import Image from "next/image";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto flex w-full max-w-6xl items-end gap-12 px-4 py-10 lg:py-0 lg:pt-20">
        <div className="relative hidden h-[380px] w-[300px] shrink-0 overflow-hidden rounded-t-[2rem] lg:block">
          <Image
            src="/hero-formation.jpg"
            alt="Une personne en formation, ordinateur portable en main"
            fill
            priority
            sizes="300px"
            className="object-cover object-[center_20%]"
          />
        </div>

        <div className="w-full max-w-2xl lg:py-14">
          <h1 className="text-3xl font-semibold leading-tight text-glacier md:text-4xl">
            Trouvez la formation qui correspond à votre projet.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
            Métier, diplôme ou compétence, en centre ou à distance. Gardez seulement les formations que le CPF peut financer.
          </p>

          <form action="/recherche" method="get" className="mt-6 flex flex-col gap-3" role="search">
            <div className="flex flex-col gap-3 md:flex-row">
              <label className="block w-full">
                <span className="sr-only">Que recherchez-vous ?</span>
                <input
                  name="q"
                  type="search"
                  placeholder="Métier, diplôme, compétence..."
                  className="h-12 w-full rounded-xl border border-white/40 bg-white px-4 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-glacier"
                />
              </label>
              <label className="block w-full">
                <span className="sr-only">Où ?</span>
                <input
                  name="lieu"
                  type="search"
                  placeholder="Ville ou à distance"
                  className="h-12 w-full rounded-xl border border-white/40 bg-white px-4 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-glacier"
                />
              </label>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-white">
                <input
                  type="checkbox"
                  name="cpf"
                  value="1"
                  className="h-4 w-4 rounded border-white/50 accent-ocean"
                />
                Finançable CPF
              </label>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-navy hover:bg-glacier"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

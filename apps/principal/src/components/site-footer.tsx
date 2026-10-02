import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-glacier">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="text-lg font-semibold text-white">Marketplace Formation</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/recherche" className="hover:text-white">
                Rechercher une formation
              </Link>
            </li>
            <li>
              <Link href="/espace-centre" className="hover:text-white">
                Espace centre
              </Link>
            </li>
            <li>
              <Link href="/recherche?cpf=1" className="hover:text-white">
                Formations finançables CPF
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl bg-navy p-6">
          <p className="text-lg font-semibold text-white">Vous êtes un centre de formation ?</p>
          <p className="mt-2 text-sm leading-6 text-glacier">
            Publiez vos sessions et présentez-les aux personnes qui cherchent à se former.
          </p>
          <Link
            href="/espace-centre"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy"
          >
            Accéder à l&apos;espace centre
          </Link>
        </div>
      </div>
    </footer>
  );
}

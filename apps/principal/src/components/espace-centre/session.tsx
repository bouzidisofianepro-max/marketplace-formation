import { deconnecter } from "@/app/espace-centre/actions";

const roles: Record<string, string> = {
  proprietaire: "Propriétaire",
  editeur: "Éditeur",
  lecteur: "Lecteur",
};

export function CentreSession({
  nom,
  email,
  role,
}: {
  nom: string;
  email: string;
  role: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 text-ink shadow-xl sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ocean">Connecté</p>
      <h2 className="mt-2 text-2xl font-semibold">{nom}</h2>
      <p className="mt-3 text-sm text-muted">{email}</p>
      <p className="mt-1 text-sm text-muted">Rôle : {roles[role] ?? role}</p>
      <form action={deconnecter} className="mt-6">
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-navy text-sm font-semibold text-white hover:bg-navy-deep"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}

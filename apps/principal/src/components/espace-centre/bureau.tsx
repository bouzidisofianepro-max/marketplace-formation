import Link from "next/link";
import type {
  ActionCentre,
  DemandeCentre,
  FormationCentre,
  LigneStats,
  ProfilCentre,
  SessionCentre,
} from "@marketplace/data/centre";
import {
  ajouterAction,
  ajouterFormation,
  ajouterSession,
  retirerAction,
  retirerFormation,
  retirerSession,
  sauverAction,
  sauverDemande,
  sauverFormation,
  sauverProfil,
  sauverSession,
} from "@/app/espace-centre/actions";
import { CoquilleCentre } from "@/components/espace-centre/coquille";

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none focus:border-navy focus:ring-2 focus:ring-glacier";
const areaClass = `${inputClass} h-auto py-3`;

const modalites = [
  { value: "presentiel", label: "En centre" },
  { value: "distance", label: "À distance" },
  { value: "mixte", label: "Mixte" },
];

const statuts = [
  { value: "nouvelle", label: "Nouvelle" },
  { value: "en_cours", label: "En cours" },
  { value: "traitee", label: "Traitée" },
  { value: "perdue", label: "Perdue" },
];

const libellesStats: Record<string, string> = {
  impression: "Affichages",
  vue: "Vues",
  clic_appel: "Appels",
  clic_whatsapp: "WhatsApp",
  clic_site: "Clics vers le site",
  clic_email: "E-mails",
  clic_itineraire: "Itinéraires",
  clic_cpf: "Clics CPF",
  formulaire: "Formulaires",
};

function libelleStatut(value: string) {
  return statuts.find((item) => item.value === value)?.label ?? value;
}

function dateCourte(value: string | null) {
  const journee = value?.slice(0, 10) ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(journee)) return "";
  const [annee, mois, jour] = journee.split("-");
  return `${jour}/${mois}/${annee}`;
}

function libelleModalite(value: string | null) {
  return modalites.find((item) => item.value === value)?.label ?? "Modalité à préciser";
}

function jour(value: string | null) {
  return value ? value.slice(0, 10) : "";
}

function Bouton({ children }: { children: string }) {
  return (
    <button
      type="submit"
      className="inline-flex h-11 items-center justify-center rounded-full bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-deep"
    >
      {children}
    </button>
  );
}

function Publie({ checked }: { checked: boolean }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm font-medium text-ink">
      <input type="checkbox" name="publie" value="1" defaultChecked={checked} className="h-4 w-4 accent-navy" />
      Visible sur le site
    </label>
  );
}

export function Bureau({
  centre,
  formations,
  actions,
  sessions,
  demandes,
  stats,
  onglet,
  ok,
  erreur,
}: {
  centre: ProfilCentre;
  formations: FormationCentre[];
  actions: ActionCentre[];
  sessions: SessionCentre[];
  demandes: DemandeCentre[];
  stats: LigneStats[];
  onglet: string;
  ok: boolean;
  erreur: string;
}) {
  const formationParId = new Map(formations.map((formation) => [formation.id, formation]));
  const actionParId = new Map(actions.map((action) => [action.id, action]));

  return (
    <CoquilleCentre nom={centre.nom} onglet={onglet}>
      {ok ? (
        <p className="mb-6 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-navy ring-1 ring-line">
          C’est enregistré.
        </p>
      ) : null}
      {erreur ? (
        <p className="mb-6 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-line">
          {erreur}
        </p>
      ) : null}

      {onglet === "demandes" ? (
        <DemandesPanel demandes={demandes} formationParId={formationParId} />
      ) : onglet === "statistique" ? (
        <StatsPanel stats={stats} />
      ) : onglet === "profil" ? (
        <ProfilPanel centre={centre} />
      ) : onglet === "formations" ? (
        <FormationsPanel formations={formations} />
      ) : onglet === "actions" ? (
        <ActionsPanel formations={formations} actions={actions} formationParId={formationParId} />
      ) : onglet === "sessions" ? (
        <SessionsPanel
          actions={actions}
          sessions={sessions}
          formationParId={formationParId}
          actionParId={actionParId}
        />
      ) : (
        <TableauPanel
          formations={formations}
          actions={actions}
          sessions={sessions}
          demandes={demandes}
          formationParId={formationParId}
          actionParId={actionParId}
        />
      )}
    </CoquilleCentre>
  );
}

function TableauPanel({
  formations,
  actions,
  sessions,
  demandes,
  formationParId,
  actionParId,
}: {
  formations: FormationCentre[];
  actions: ActionCentre[];
  sessions: SessionCentre[];
  demandes: DemandeCentre[];
  formationParId: Map<string, FormationCentre>;
  actionParId: Map<string, ActionCentre>;
}) {
  const aTraiter = demandes.filter((demande) => demande.statut === "nouvelle" || demande.statut === "en_cours");
  const aujourdHui = new Date().toISOString().slice(0, 10);
  const prochaines = sessions
    .filter((session) => !session.dateDebut || session.dateDebut.slice(0, 10) >= aujourdHui)
    .slice(0, 3);

  const cartes = [
    { href: "/espace-centre?onglet=formations", label: "Formations", valeur: formations.length },
    { href: "/espace-centre?onglet=actions", label: "Actions", valeur: actions.length },
    { href: "/espace-centre?onglet=sessions", label: "Sessions", valeur: sessions.length },
    { href: "/espace-centre?onglet=demandes", label: "Demandes à traiter", valeur: aTraiter.length },
  ];

  return (
    <div className="grid gap-4">
      <section>
        <h2 className="text-xl font-semibold text-ink">Tableau de bord</h2>
        <p className="mt-2 text-sm leading-6 text-muted">L’essentiel de votre centre, en un coup d’œil.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cartes.map((carte) => (
            <Link key={carte.label} href={carte.href} className="rounded-3xl bg-white p-6 ring-1 ring-line hover:ring-navy">
              <p className="text-sm font-medium text-muted">{carte.label}</p>
              <p className="mt-2 text-3xl font-semibold text-ink">{carte.valeur}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
        <h3 className="text-base font-semibold text-ink">Prochaines sessions</h3>
        {prochaines.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Aucune session à venir.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {prochaines.map((session) => {
              const action = actionParId.get(session.actionId);
              const formation = action ? formationParId.get(action.formationId)?.intitule : "Formation";
              return (
                <li key={session.id} className="text-sm text-ink">
                  <span className="font-semibold">{formation}</span>
                  <span className="text-muted">
                    {" "}
                    · {dateCourte(session.dateDebut) || "Date à préciser"}
                    {session.places != null ? ` · ${session.places} places` : ""}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold text-ink">Dernières demandes</h3>
          <Link href="/espace-centre?onglet=demandes" className="text-sm font-semibold text-navy">
            Tout voir
          </Link>
        </div>
        {demandes.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Aucune demande pour l’instant.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {demandes.slice(0, 3).map((demande) => (
              <li key={demande.id} className="text-sm text-ink">
                <span className="font-semibold">{demande.nom || "Sans nom"}</span>
                <span className="text-muted">
                  {" "}
                  · {libelleStatut(demande.statut)} · {dateCourte(demande.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function DemandesPanel({
  demandes,
  formationParId,
}: {
  demandes: DemandeCentre[];
  formationParId: Map<string, FormationCentre>;
}) {
  return (
    <div className="grid gap-4">
      <section>
        <h2 className="text-xl font-semibold text-ink">Mes demandes de contact</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Les personnes qui vous ont écrit. Indiquez où en est chaque demande.
        </p>
      </section>
      {demandes.length === 0 ? (
        <p className="text-sm text-muted">Aucune demande pour l’instant.</p>
      ) : (
        demandes.map((demande) => (
          <details key={demande.id} className="rounded-3xl bg-white p-6 ring-1 ring-line">
            <summary className="cursor-pointer text-base font-semibold text-ink">
              {demande.nom || "Sans nom"}
              <span className="ml-2 text-sm font-medium text-muted">
                {libelleStatut(demande.statut)} · {dateCourte(demande.createdAt)}
              </span>
            </summary>
            <dl className="mt-6 grid gap-3 text-sm text-ink md:grid-cols-2">
              <div>
                <dt className="font-medium text-muted">E-mail</dt>
                <dd>{demande.email || "Non indiqué"}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Téléphone</dt>
                <dd>{demande.telephone || "Non indiqué"}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Formation</dt>
                <dd>
                  {demande.formationId
                    ? (formationParId.get(demande.formationId)?.intitule ?? "Formation")
                    : "Non précisée"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Financement</dt>
                <dd>{demande.financement || "Non précisé"}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-medium text-muted">Message</dt>
                <dd className="whitespace-pre-wrap">{demande.message || "Pas de message."}</dd>
              </div>
            </dl>
            <form action={sauverDemande} className="mt-6 grid gap-4">
              <input type="hidden" name="id" value={demande.id} />
              <label className="block">
                <span className="text-sm font-medium text-ink">Statut</span>
                <select name="statut" defaultValue={demande.statut} className={`${inputClass} mt-1.5`}>
                  {statuts.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink">Notes</span>
                <textarea name="notes" rows={3} defaultValue={demande.notes ?? ""} className={`${areaClass} mt-1.5`} />
              </label>
              <Bouton>Enregistrer</Bouton>
            </form>
          </details>
        ))
      )}
    </div>
  );
}

function StatsPanel({ stats }: { stats: LigneStats[] }) {
  return (
    <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
      <h2 className="text-xl font-semibold text-ink">Statistique</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Ce que les visiteurs font sur vos formations : affichages, vues et clics.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="py-3 pr-4 font-medium">Indicateur</th>
              <th className="py-3 pr-4 font-medium">Total</th>
              <th className="py-3 font-medium">30 derniers jours</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((ligne) => (
              <tr key={ligne.type} className="border-b border-line last:border-0">
                <td className="py-3 pr-4 font-medium text-ink">{libellesStats[ligne.type] ?? ligne.type}</td>
                <td className="py-3 pr-4 text-ink">{ligne.total}</td>
                <td className="py-3 text-ink">{ligne.trenteJours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProfilPanel({ centre }: { centre: ProfilCentre }) {
  return (
    <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
      <h2 className="text-xl font-semibold text-ink">Profil du centre</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Ces informations décrivent votre organisme. Cochez « Visible sur le site » pour le montrer aux visiteurs.
      </p>
      <form action={sauverProfil} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-ink">Nom</span>
          <input name="nom" required defaultValue={centre.nom} className={`${inputClass} mt-1.5`} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-ink">Description</span>
          <textarea name="description" rows={4} defaultValue={centre.description ?? ""} className={`${areaClass} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Adresse</span>
          <input name="adresse" defaultValue={centre.adresse ?? ""} className={`${inputClass} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Code postal</span>
          <input name="codePostal" defaultValue={centre.codePostal ?? ""} className={`${inputClass} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Téléphone</span>
          <input name="telephone" defaultValue={centre.telephone ?? ""} className={`${inputClass} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">E-mail public</span>
          <input
            name="emailPublic"
            type="email"
            defaultValue={centre.emailPublic ?? ""}
            className={`${inputClass} mt-1.5`}
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-ink">Site web</span>
          <input name="siteWeb" defaultValue={centre.siteWeb ?? ""} className={`${inputClass} mt-1.5`} />
        </label>
        <div className="md:col-span-2">
          <Publie checked={centre.publie} />
        </div>
        <div>
          <Bouton>Enregistrer le profil</Bouton>
        </div>
      </form>
    </section>
  );
}

function FormationsPanel({ formations }: { formations: FormationCentre[] }) {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
        <h2 className="text-xl font-semibold text-ink">Ajouter une formation</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Le métier ou le diplôme que vous proposez.</p>
        <form action={ajouterFormation} className="mt-6 grid gap-4">
          <ChampsFormation />
          <Bouton>Ajouter la formation</Bouton>
        </form>
      </section>
      {formations.length === 0 ? (
        <p className="text-sm text-muted">Aucune formation pour l’instant.</p>
      ) : (
        formations.map((formation) => (
          <details key={formation.id} className="rounded-3xl bg-white p-6 ring-1 ring-line">
            <summary className="cursor-pointer text-base font-semibold text-ink">
              {formation.intitule}
              <span className="ml-2 text-sm font-medium text-muted">{formation.publie ? "Visible" : "Brouillon"}</span>
            </summary>
            <form action={sauverFormation} className="mt-6 grid gap-4">
              <input type="hidden" name="id" value={formation.id} />
              <ChampsFormation formation={formation} />
              <Bouton>Enregistrer</Bouton>
            </form>
            <form action={retirerFormation} className="mt-3">
              <input type="hidden" name="id" value={formation.id} />
              <button type="submit" className="text-sm font-semibold text-red-700">
                Supprimer
              </button>
            </form>
          </details>
        ))
      )}
    </div>
  );
}

function ChampsFormation({ formation }: { formation?: FormationCentre }) {
  return (
    <>
      <label className="block">
        <span className="text-sm font-medium text-ink">Intitulé</span>
        <input name="intitule" required defaultValue={formation?.intitule ?? ""} className={`${inputClass} mt-1.5`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Objectif</span>
        <textarea name="objectif" rows={3} defaultValue={formation?.objectif ?? ""} className={`${areaClass} mt-1.5`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Contenu</span>
        <textarea name="contenu" rows={4} defaultValue={formation?.contenu ?? ""} className={`${areaClass} mt-1.5`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Prérequis</span>
        <textarea name="prerequis" rows={3} defaultValue={formation?.prerequis ?? ""} className={`${areaClass} mt-1.5`} />
      </label>
      <Publie checked={formation?.publie ?? false} />
    </>
  );
}

function ActionsPanel({
  formations,
  actions,
  formationParId,
}: {
  formations: FormationCentre[];
  actions: ActionCentre[];
  formationParId: Map<string, FormationCentre>;
}) {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
        <h2 className="text-xl font-semibold text-ink">Ajouter une action</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Une action, c’est une façon de suivre une formation : en centre, à distance ou en mixte, avec son prix et sa durée.
        </p>
        {formations.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Ajoutez d’abord une formation.</p>
        ) : (
          <form action={ajouterAction} className="mt-6 grid gap-4 md:grid-cols-2">
            <ChampsAction formations={formations} />
            <div className="md:col-span-2">
              <Bouton>Ajouter l’action</Bouton>
            </div>
          </form>
        )}
      </section>
      {actions.length === 0 ? (
        <p className="text-sm text-muted">Aucune action pour l’instant.</p>
      ) : (
        actions.map((action) => (
          <details key={action.id} className="rounded-3xl bg-white p-6 ring-1 ring-line">
            <summary className="cursor-pointer text-base font-semibold text-ink">
              {formationParId.get(action.formationId)?.intitule ?? "Formation"}
              <span className="ml-2 text-sm font-medium text-muted">{libelleModalite(action.modalite)}</span>
            </summary>
            <form action={sauverAction} className="mt-6 grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={action.id} />
              <ChampsAction formations={formations} action={action} />
              <div className="md:col-span-2">
                <Bouton>Enregistrer</Bouton>
              </div>
            </form>
            <form action={retirerAction} className="mt-3">
              <input type="hidden" name="id" value={action.id} />
              <button type="submit" className="text-sm font-semibold text-red-700">
                Supprimer
              </button>
            </form>
          </details>
        ))
      )}
    </div>
  );
}

function ChampsAction({ formations, action }: { formations: FormationCentre[]; action?: ActionCentre }) {
  return (
    <>
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-ink">Formation</span>
        <select
          name="formationId"
          required
          defaultValue={action?.formationId ?? ""}
          className={`${inputClass} mt-1.5`}
        >
          <option value="">Choisir</option>
          {formations.map((formation) => (
            <option key={formation.id} value={formation.id}>
              {formation.intitule}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Modalité</span>
        <select name="modalite" defaultValue={action?.modalite ?? ""} className={`${inputClass} mt-1.5`}>
          <option value="">Choisir</option>
          {modalites.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Durée (heures)</span>
        <input
          name="dureeHeures"
          type="number"
          min="0"
          step="1"
          defaultValue={action?.dureeHeures ?? ""}
          className={`${inputClass} mt-1.5`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Prix TTC</span>
        <input
          name="prixTtc"
          type="number"
          min="0"
          step="0.01"
          defaultValue={action?.prixTtc ?? ""}
          className={`${inputClass} mt-1.5`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Code postal</span>
        <input name="codePostal" defaultValue={action?.codePostal ?? ""} className={`${inputClass} mt-1.5`} />
      </label>
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-ink">Adresse</span>
        <input name="adresse" defaultValue={action?.adresse ?? ""} className={`${inputClass} mt-1.5`} />
      </label>
      <div className="md:col-span-2">
        <Publie checked={action?.publie ?? false} />
      </div>
    </>
  );
}

function SessionsPanel({
  actions,
  sessions,
  formationParId,
  actionParId,
}: {
  actions: ActionCentre[];
  sessions: SessionCentre[];
  formationParId: Map<string, FormationCentre>;
  actionParId: Map<string, ActionCentre>;
}) {
  function titreAction(actionId: string) {
    const action = actionParId.get(actionId);
    if (!action) return "Action";
    const formation = formationParId.get(action.formationId)?.intitule ?? "Formation";
    return `${formation} — ${libelleModalite(action.modalite)}`;
  }

  return (
    <div className="grid gap-4">
      <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
        <h2 className="text-xl font-semibold text-ink">Ajouter une session</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Une session, c’est une date et des places pour une action.
        </p>
        {actions.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Ajoutez d’abord une action.</p>
        ) : (
          <form action={ajouterSession} className="mt-6 grid gap-4 md:grid-cols-2">
            <ChampsSession actions={actions} titreAction={titreAction} />
            <div className="md:col-span-2">
              <Bouton>Ajouter la session</Bouton>
            </div>
          </form>
        )}
      </section>
      {sessions.length === 0 ? (
        <p className="text-sm text-muted">Aucune session pour l’instant.</p>
      ) : (
        sessions.map((item) => (
          <details key={item.id} className="rounded-3xl bg-white p-6 ring-1 ring-line">
            <summary className="cursor-pointer text-base font-semibold text-ink">
              {titreAction(item.actionId)}
              <span className="ml-2 text-sm font-medium text-muted">
                {jour(item.dateDebut) || "Date à préciser"}
              </span>
            </summary>
            <form action={sauverSession} className="mt-6 grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <ChampsSession actions={actions} session={item} titreAction={titreAction} />
              <div className="md:col-span-2">
                <Bouton>Enregistrer</Bouton>
              </div>
            </form>
            <form action={retirerSession} className="mt-3">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-sm font-semibold text-red-700">
                Supprimer
              </button>
            </form>
          </details>
        ))
      )}
    </div>
  );
}

function ChampsSession({
  actions,
  session,
  titreAction,
}: {
  actions: ActionCentre[];
  session?: SessionCentre;
  titreAction: (actionId: string) => string;
}) {
  return (
    <>
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-ink">Action</span>
        <select name="actionId" required defaultValue={session?.actionId ?? ""} className={`${inputClass} mt-1.5`}>
          <option value="">Choisir</option>
          {actions.map((action) => (
            <option key={action.id} value={action.id}>
              {titreAction(action.id)}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Date de début</span>
        <input name="dateDebut" type="date" defaultValue={jour(session?.dateDebut ?? null)} className={`${inputClass} mt-1.5`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Date de fin</span>
        <input name="dateFin" type="date" defaultValue={jour(session?.dateFin ?? null)} className={`${inputClass} mt-1.5`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Places</span>
        <input
          name="places"
          type="number"
          min="0"
          step="1"
          defaultValue={session?.places ?? ""}
          className={`${inputClass} mt-1.5`}
        />
      </label>
      <label className="inline-flex items-center gap-2 self-end text-sm font-medium text-ink">
        <input
          type="checkbox"
          name="complet"
          value="1"
          defaultChecked={session?.complet ?? false}
          className="h-4 w-4 accent-navy"
        />
        Complet
      </label>
    </>
  );
}

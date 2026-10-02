import "server-only";
import { supabaseConfigured } from "./env";
import { createClient } from "./server";

export type ProfilCentre = {
  id: string;
  nom: string;
  email: string;
  role: string;
  description: string | null;
  adresse: string | null;
  codePostal: string | null;
  telephone: string | null;
  emailPublic: string | null;
  siteWeb: string | null;
  publie: boolean;
};

export type FormationCentre = {
  id: string;
  intitule: string;
  objectif: string | null;
  contenu: string | null;
  prerequis: string | null;
  publie: boolean;
};

export type ActionCentre = {
  id: string;
  formationId: string;
  modalite: string | null;
  dureeHeures: number | null;
  prixTtc: number | null;
  adresse: string | null;
  codePostal: string | null;
  publie: boolean;
};

export type SessionCentre = {
  id: string;
  actionId: string;
  dateDebut: string | null;
  dateFin: string | null;
  places: number | null;
  complet: boolean;
};

export type DemandeCentre = {
  id: string;
  nom: string | null;
  email: string | null;
  telephone: string | null;
  message: string | null;
  financement: string | null;
  statut: string;
  notes: string | null;
  luLe: string | null;
  createdAt: string;
  formationId: string | null;
};

export type LigneStats = {
  type: string;
  total: number;
  trenteJours: number;
};

const typesEvenement = [
  "impression",
  "vue",
  "clic_appel",
  "clic_whatsapp",
  "clic_site",
  "clic_email",
  "clic_itineraire",
  "clic_cpf",
  "formulaire",
] as const;

const statutsDemande = ["nouvelle", "en_cours", "traitee", "perdue"] as const;

function message(error: { code?: string; message: string } | null) {
  if (!error) return null;
  if (error.code === "23503") return "Cet élément est encore lié à une action ou une session.";
  if (error.code === "23514") return "Une valeur n'est pas acceptée.";
  return "L'enregistrement a échoué.";
}

async function clientConnecte() {
  if (!supabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { supabase, user };
}

export async function lireMonCentre(): Promise<ProfilCentre | null> {
  const session = await clientConnecte();
  if (!session) return null;

  const { data } = await session.supabase
    .from("etablissement_membres")
    .select(
      "role, etablissements(id, nom, description, adresse, code_postal, telephone_public, email_public, site_web, publie)",
    )
    .eq("user_id", session.user.id)
    .limit(1)
    .maybeSingle();

  const lie = data?.etablissements;
  const centre = Array.isArray(lie) ? lie[0] : lie;
  if (!centre) return null;

  return {
    id: centre.id,
    nom: centre.nom,
    email: session.user.email ?? "",
    role: data?.role ?? "proprietaire",
    description: centre.description,
    adresse: centre.adresse,
    codePostal: centre.code_postal,
    telephone: centre.telephone_public,
    emailPublic: centre.email_public,
    siteWeb: centre.site_web,
    publie: centre.publie,
  };
}

export async function lireEspace() {
  const centre = await lireMonCentre();
  if (!centre) return null;

  const session = await clientConnecte();
  if (!session) return null;
  const { supabase } = session;

  const { data: formationsData } = await supabase
    .from("formations")
    .select("id, intitule, objectif, contenu, prerequis, publie, created_at")
    .eq("etablissement_id", centre.id)
    .order("created_at", { ascending: false });

  const formations: FormationCentre[] = (formationsData ?? []).map((formation) => ({
    id: formation.id,
    intitule: formation.intitule,
    objectif: formation.objectif,
    contenu: formation.contenu,
    prerequis: formation.prerequis,
    publie: formation.publie,
  }));

  const formationIds = formations.map((formation) => formation.id);
  let actions: ActionCentre[] = [];
  if (formationIds.length > 0) {
    const { data: actionsData } = await supabase
      .from("actions")
      .select("id, formation_id, modalite, duree_heures, prix_ttc, adresse, code_postal, publie, created_at")
      .in("formation_id", formationIds)
      .order("created_at", { ascending: false });
    actions = (actionsData ?? []).map((action) => ({
      id: action.id,
      formationId: action.formation_id,
      modalite: action.modalite,
      dureeHeures: action.duree_heures,
      prixTtc: action.prix_ttc,
      adresse: action.adresse,
      codePostal: action.code_postal,
      publie: action.publie,
    }));
  }

  const actionIds = actions.map((action) => action.id);
  let sessions: SessionCentre[] = [];
  if (actionIds.length > 0) {
    const { data: sessionsData } = await supabase
      .from("sessions")
      .select("id, action_id, date_debut, date_fin, places, complet, created_at")
      .in("action_id", actionIds)
      .order("date_debut", { ascending: true });
    sessions = (sessionsData ?? []).map((item) => ({
      id: item.id,
      actionId: item.action_id,
      dateDebut: item.date_debut,
      dateFin: item.date_fin,
      places: item.places,
      complet: item.complet,
    }));
  }

  const { data: demandesData } = await supabase
    .from("demandes")
    .select("id, nom, email, telephone, message, financement, statut, notes, lu_le, created_at, formation_id")
    .eq("etablissement_id", centre.id)
    .order("created_at", { ascending: false });

  const demandes: DemandeCentre[] = (demandesData ?? []).map((demande) => ({
    id: demande.id,
    nom: demande.nom,
    email: demande.email,
    telephone: demande.telephone,
    message: demande.message,
    financement: demande.financement,
    statut: demande.statut,
    notes: demande.notes,
    luLe: demande.lu_le,
    createdAt: demande.created_at,
    formationId: demande.formation_id,
  }));

  const { data: evenementsData } = await supabase
    .from("evenements")
    .select("type, created_at")
    .eq("etablissement_id", centre.id);

  const seuil = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const stats: LigneStats[] = typesEvenement.map((type) => {
    const lignes = (evenementsData ?? []).filter((evenement) => evenement.type === type);
    return {
      type,
      total: lignes.length,
      trenteJours: lignes.filter((evenement) => new Date(evenement.created_at).getTime() >= seuil).length,
    };
  });

  return { centre, formations, actions, sessions, demandes, stats };
}

export async function traiterDemande(id: string, valeurs: { statut: string; notes: string | null }) {
  const centre = await lireMonCentre();
  if (!centre) return "Connectez-vous pour traiter une demande.";
  if (!statutsDemande.includes(valeurs.statut as (typeof statutsDemande)[number])) {
    return "Une valeur n'est pas acceptée.";
  }

  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour traiter une demande.";

  const { error } = await session.supabase
    .from("demandes")
    .update({
      statut: valeurs.statut,
      notes: valeurs.notes,
      lu_le: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("etablissement_id", centre.id);

  return message(error);
}

export async function enregistrerProfil(profil: {
  nom: string;
  description: string | null;
  adresse: string | null;
  codePostal: string | null;
  telephone: string | null;
  emailPublic: string | null;
  siteWeb: string | null;
  publie: boolean;
}) {
  const centre = await lireMonCentre();
  if (!centre) return "Connectez-vous pour enregistrer le profil.";
  if (!profil.nom) return "Le nom du centre est obligatoire.";

  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour enregistrer le profil.";

  const { error } = await session.supabase
    .from("etablissements")
    .update({
      nom: profil.nom,
      description: profil.description,
      adresse: profil.adresse,
      code_postal: profil.codePostal,
      telephone_public: profil.telephone,
      email_public: profil.emailPublic,
      site_web: profil.siteWeb,
      publie: profil.publie,
    })
    .eq("id", centre.id);

  return message(error);
}

export async function creerFormation(valeurs: {
  intitule: string;
  objectif: string | null;
  contenu: string | null;
  prerequis: string | null;
  publie: boolean;
}) {
  const centre = await lireMonCentre();
  if (!centre) return "Connectez-vous pour ajouter une formation.";
  if (!valeurs.intitule) return "L'intitulé est obligatoire.";

  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour ajouter une formation.";

  const { error } = await session.supabase.from("formations").insert({
    etablissement_id: centre.id,
    intitule: valeurs.intitule,
    objectif: valeurs.objectif,
    contenu: valeurs.contenu,
    prerequis: valeurs.prerequis,
    publie: valeurs.publie,
    source: "centre",
  });

  return message(error);
}

export async function modifierFormation(
  id: string,
  valeurs: {
    intitule: string;
    objectif: string | null;
    contenu: string | null;
    prerequis: string | null;
    publie: boolean;
  },
) {
  const centre = await lireMonCentre();
  if (!centre) return "Connectez-vous pour modifier une formation.";
  if (!valeurs.intitule) return "L'intitulé est obligatoire.";

  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour modifier une formation.";

  const { error } = await session.supabase
    .from("formations")
    .update({
      intitule: valeurs.intitule,
      objectif: valeurs.objectif,
      contenu: valeurs.contenu,
      prerequis: valeurs.prerequis,
      publie: valeurs.publie,
    })
    .eq("id", id)
    .eq("etablissement_id", centre.id);

  return message(error);
}

export async function supprimerFormation(id: string) {
  const centre = await lireMonCentre();
  if (!centre) return "Connectez-vous pour supprimer une formation.";
  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour supprimer une formation.";

  const { error } = await session.supabase
    .from("formations")
    .delete()
    .eq("id", id)
    .eq("etablissement_id", centre.id);

  return message(error);
}

export async function creerAction(valeurs: {
  formationId: string;
  modalite: string | null;
  dureeHeures: number | null;
  prixTtc: number | null;
  adresse: string | null;
  codePostal: string | null;
  publie: boolean;
}) {
  const centre = await lireMonCentre();
  if (!centre) return "Connectez-vous pour ajouter une action.";
  if (!valeurs.formationId) return "Choisissez une formation.";

  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour ajouter une action.";

  const { error } = await session.supabase.from("actions").insert({
    formation_id: valeurs.formationId,
    modalite: valeurs.modalite,
    duree_heures: valeurs.dureeHeures,
    prix_ttc: valeurs.prixTtc,
    adresse: valeurs.adresse,
    code_postal: valeurs.codePostal,
    publie: valeurs.publie,
  });

  return message(error);
}

export async function modifierAction(
  id: string,
  valeurs: {
    formationId: string;
    modalite: string | null;
    dureeHeures: number | null;
    prixTtc: number | null;
    adresse: string | null;
    codePostal: string | null;
    publie: boolean;
  },
) {
  const centre = await lireMonCentre();
  if (!centre) return "Connectez-vous pour modifier une action.";
  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour modifier une action.";

  const { data: formation } = await session.supabase
    .from("formations")
    .select("id")
    .eq("id", valeurs.formationId)
    .eq("etablissement_id", centre.id)
    .maybeSingle();
  if (!formation) return "Cette formation n'appartient pas à votre centre.";

  const { error } = await session.supabase
    .from("actions")
    .update({
      formation_id: valeurs.formationId,
      modalite: valeurs.modalite,
      duree_heures: valeurs.dureeHeures,
      prix_ttc: valeurs.prixTtc,
      adresse: valeurs.adresse,
      code_postal: valeurs.codePostal,
      publie: valeurs.publie,
    })
    .eq("id", id);

  return message(error);
}

export async function supprimerAction(id: string) {
  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour supprimer une action.";
  const { error } = await session.supabase.from("actions").delete().eq("id", id);
  return message(error);
}

export async function creerSession(valeurs: {
  actionId: string;
  dateDebut: string | null;
  dateFin: string | null;
  places: number | null;
  complet: boolean;
}) {
  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour ajouter une session.";
  if (!valeurs.actionId) return "Choisissez une action.";

  const { error } = await session.supabase.from("sessions").insert({
    action_id: valeurs.actionId,
    date_debut: valeurs.dateDebut,
    date_fin: valeurs.dateFin,
    places: valeurs.places,
    complet: valeurs.complet,
    source: "centre",
  });

  return message(error);
}

export async function modifierSession(
  id: string,
  valeurs: {
    actionId: string;
    dateDebut: string | null;
    dateFin: string | null;
    places: number | null;
    complet: boolean;
  },
) {
  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour modifier une session.";

  const { error } = await session.supabase
    .from("sessions")
    .update({
      action_id: valeurs.actionId,
      date_debut: valeurs.dateDebut,
      date_fin: valeurs.dateFin,
      places: valeurs.places,
      complet: valeurs.complet,
    })
    .eq("id", id);

  return message(error);
}

export async function supprimerSession(id: string) {
  const session = await clientConnecte();
  if (!session) return "Connectez-vous pour supprimer une session.";
  const { error } = await session.supabase.from("sessions").delete().eq("id", id);
  return message(error);
}

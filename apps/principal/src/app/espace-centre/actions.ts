"use server";

import {
  creerAction,
  creerFormation,
  creerSession,
  enregistrerProfil,
  modifierAction,
  modifierFormation,
  modifierSession,
  supprimerAction,
  traiterDemande,
  supprimerFormation,
  supprimerSession,
} from "@marketplace/data/centre";
import { createClient, supabaseConfigured } from "@marketplace/data/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function texte(formData: FormData, name: string) {
  const value = String(formData.get(name) ?? "").trim();
  return value || null;
}

function nombre(formData: FormData, name: string) {
  const value = String(formData.get(name) ?? "")
    .trim()
    .replace(",", ".");
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function coche(formData: FormData, name: string) {
  return formData.get(name) === "1";
}

function retour(onglet: string, error: string | null) {
  revalidatePath("/espace-centre");
  if (error) redirect(`/espace-centre?onglet=${onglet}&erreur=${encodeURIComponent(error)}`);
  redirect(`/espace-centre?onglet=${onglet}&ok=1`);
}

export async function sauverProfil(formData: FormData) {
  const error = await enregistrerProfil({
    nom: String(formData.get("nom") ?? "").trim(),
    description: texte(formData, "description"),
    adresse: texte(formData, "adresse"),
    codePostal: texte(formData, "codePostal"),
    telephone: texte(formData, "telephone"),
    emailPublic: texte(formData, "emailPublic"),
    siteWeb: texte(formData, "siteWeb"),
    publie: coche(formData, "publie"),
  });
  retour("profil", error);
}

export async function ajouterFormation(formData: FormData) {
  const error = await creerFormation({
    intitule: String(formData.get("intitule") ?? "").trim(),
    objectif: texte(formData, "objectif"),
    contenu: texte(formData, "contenu"),
    prerequis: texte(formData, "prerequis"),
    publie: coche(formData, "publie"),
  });
  retour("formations", error);
}

export async function sauverFormation(formData: FormData) {
  const error = await modifierFormation(String(formData.get("id") ?? ""), {
    intitule: String(formData.get("intitule") ?? "").trim(),
    objectif: texte(formData, "objectif"),
    contenu: texte(formData, "contenu"),
    prerequis: texte(formData, "prerequis"),
    publie: coche(formData, "publie"),
  });
  retour("formations", error);
}

export async function retirerFormation(formData: FormData) {
  const error = await supprimerFormation(String(formData.get("id") ?? ""));
  retour("formations", error);
}

export async function ajouterAction(formData: FormData) {
  const error = await creerAction({
    formationId: String(formData.get("formationId") ?? ""),
    modalite: texte(formData, "modalite"),
    dureeHeures: nombre(formData, "dureeHeures"),
    prixTtc: nombre(formData, "prixTtc"),
    adresse: texte(formData, "adresse"),
    codePostal: texte(formData, "codePostal"),
    publie: coche(formData, "publie"),
  });
  retour("actions", error);
}

export async function sauverAction(formData: FormData) {
  const error = await modifierAction(String(formData.get("id") ?? ""), {
    formationId: String(formData.get("formationId") ?? ""),
    modalite: texte(formData, "modalite"),
    dureeHeures: nombre(formData, "dureeHeures"),
    prixTtc: nombre(formData, "prixTtc"),
    adresse: texte(formData, "adresse"),
    codePostal: texte(formData, "codePostal"),
    publie: coche(formData, "publie"),
  });
  retour("actions", error);
}

export async function retirerAction(formData: FormData) {
  const error = await supprimerAction(String(formData.get("id") ?? ""));
  retour("actions", error);
}

export async function ajouterSession(formData: FormData) {
  const error = await creerSession({
    actionId: String(formData.get("actionId") ?? ""),
    dateDebut: texte(formData, "dateDebut"),
    dateFin: texte(formData, "dateFin"),
    places: nombre(formData, "places"),
    complet: coche(formData, "complet"),
  });
  retour("sessions", error);
}

export async function sauverSession(formData: FormData) {
  const error = await modifierSession(String(formData.get("id") ?? ""), {
    actionId: String(formData.get("actionId") ?? ""),
    dateDebut: texte(formData, "dateDebut"),
    dateFin: texte(formData, "dateFin"),
    places: nombre(formData, "places"),
    complet: coche(formData, "complet"),
  });
  retour("sessions", error);
}

export async function sauverDemande(formData: FormData) {
  const error = await traiterDemande(String(formData.get("id") ?? ""), {
    statut: String(formData.get("statut") ?? ""),
    notes: texte(formData, "notes"),
  });
  retour("demandes", error);
}

export async function retirerSession(formData: FormData) {
  const error = await supprimerSession(String(formData.get("id") ?? ""));
  retour("sessions", error);
}

export async function connecter(_etat: { error: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Indiquez l'e-mail et le mot de passe." };
  }
  if (!supabaseConfigured()) {
    return { error: "La connexion au compte est indisponible." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "E-mail ou mot de passe incorrect." };
  }

  redirect("/espace-centre");
}

export async function deconnecter() {
  if (supabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/espace-centre");
}

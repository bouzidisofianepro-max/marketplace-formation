"use client";

import { useActionState, useState } from "react";
import { connecter } from "@/app/espace-centre/actions";

type Mode = "connexion" | "inscription" | "oubli";

const inputClass =
  "mt-1.5 h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none placeholder:text-muted focus:border-navy focus:ring-2 focus:ring-glacier";

function Field({
  id,
  name,
  label,
  type,
  autoComplete,
  placeholder,
}: {
  id: string;
  name?: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        id={id}
        name={name ?? id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className={inputClass}
      />
    </label>
  );
}

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("connexion");
  const [connexion, envoyerConnexion, connexionEnCours] = useActionState(connecter, {
    error: "",
  });

  return (
    <div className="rounded-3xl bg-white p-6 text-ink shadow-xl sm:p-8">
      {mode === "oubli" ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <h2 className="text-xl font-semibold">Mot de passe oublié</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Indiquez l&apos;adresse e-mail du compte centre. Un lien de réinitialisation y sera envoyé.
            </p>
          </div>
          <Field
            id="email-oubli"
            label="E-mail"
            type="email"
            autoComplete="email"
            placeholder="contact@centre.fr"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white hover:bg-navy-deep"
          >
            Recevoir le lien
          </button>
          <button
            type="button"
            className="text-sm font-semibold text-navy hover:text-navy-deep"
            onClick={() => setMode("connexion")}
          >
            Retour à la connexion
          </button>
        </form>
      ) : (
        <>
          <div className="grid grid-cols-2 rounded-full bg-mist p-1">
            <button
              type="button"
              className={`h-10 rounded-full text-sm font-semibold ${mode === "connexion" ? "bg-navy text-white" : "text-muted"}`}
              onClick={() => setMode("connexion")}
            >
              Connexion
            </button>
            <button
              type="button"
              className={`h-10 rounded-full text-sm font-semibold ${mode === "inscription" ? "bg-navy text-white" : "text-muted"}`}
              onClick={() => setMode("inscription")}
            >
              Inscription
            </button>
          </div>

          {mode === "connexion" ? (
            <form action={envoyerConnexion} className="mt-6 flex flex-col gap-4">
              <Field
                id="email-connexion"
                name="email"
                label="E-mail"
                type="email"
                autoComplete="email"
                placeholder="contact@centre.fr"
              />
              <Field
                id="mot-de-passe"
                name="password"
                label="Mot de passe"
                type="password"
                autoComplete="current-password"
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                className="self-start text-sm font-semibold text-navy hover:text-navy-deep"
                onClick={() => setMode("oubli")}
              >
                Mot de passe oublié ?
              </button>
              {connexion.error ? (
                <p className="text-sm font-medium text-red-700">{connexion.error}</p>
              ) : null}
              <button
                type="submit"
                disabled={connexionEnCours}
                className="inline-flex h-12 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white hover:bg-navy-deep disabled:opacity-60"
              >
                Se connecter
              </button>
            </form>
          ) : (
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field
                id="centre"
                label="Nom du centre"
                type="text"
                autoComplete="organization"
                placeholder="Nom de votre organisme"
              />
              <Field
                id="email-inscription"
                label="E-mail"
                type="email"
                autoComplete="email"
                placeholder="contact@centre.fr"
              />
              <Field
                id="mot-de-passe-nouveau"
                label="Mot de passe"
                type="password"
                autoComplete="new-password"
                placeholder="8 caractères minimum"
              />
              <Field
                id="mot-de-passe-confirmation"
                label="Confirmer le mot de passe"
                type="password"
                autoComplete="new-password"
                placeholder="Retapez le mot de passe"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white hover:bg-navy-deep"
              >
                Créer le compte centre
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

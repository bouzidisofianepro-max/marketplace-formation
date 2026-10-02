import { AuthPanel } from "@/components/espace-centre/auth-panel";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-navy text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center px-4 py-5">
        <p className="leading-tight">
          <span className="block text-lg font-semibold tracking-tight text-white">Marketplace</span>
          <span className="block text-xs font-medium uppercase tracking-[0.16em] text-glacier">
            Formation
          </span>
        </p>
      </header>
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-start gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-glacier">
            Espace centre
          </p>
          <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
            Publiez vos formations et suivez les demandes.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 md:text-base">
            L&apos;espace est réservé aux organismes de formation. Connectez-vous, créez un compte, ou récupérez un mot de passe.
          </p>
        </div>
        <AuthPanel />
      </div>
    </main>
  );
}

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Formations } from "@/components/home/formations";
import { Hero } from "@/components/home/hero";
import { Centres, Cities, News, ProBanner, Themes } from "@/components/home/rest";
import { Shortcuts } from "@/components/home/shortcuts";
import { formations } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <SiteHeader tone="hero" />
        <Hero />
      </div>
      <main className="flex-1">
        <Shortcuts />
        <Formations items={formations.slice(0, 6)} />
        <Themes />
        <News />
        <ProBanner />
        <Cities />
        <Centres />
      </main>
      <SiteFooter />
    </>
  );
}

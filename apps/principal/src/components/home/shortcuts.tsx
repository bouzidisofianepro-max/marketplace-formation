import Link from "next/link";
import { Award, GraduationCap, Laptop, Wallet } from "lucide-react";
import { shortcuts } from "@/data/home";

const icons = [Wallet, Award, GraduationCap, GraduationCap, Laptop];

export function Shortcuts() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 lg:py-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {shortcuts.map((item, index) => {
          const Icon = icons[index] ?? GraduationCap;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(11,61,110,0.06)] ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(11,61,110,0.12)] ${item.featured ? "lg:row-span-1 md:min-h-56" : ""}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foam text-ocean">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-4">
                <span className="block text-base font-semibold text-ink">{item.title}</span>
                {item.text ? <span className="mt-1 block text-sm leading-6 text-muted">{item.text}</span> : null}
              </span>
              {item.action ? (
                <span className="mt-4 inline-flex w-fit rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
                  {item.action}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

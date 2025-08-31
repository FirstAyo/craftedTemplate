import Link from "next/link";
import { templates } from "../lib/templates";

export default function HomePage() {
  return (
    <div>
      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Launch quality sites in hours, not weeks.</h1>
            <p className="mt-4 text-lg text-zinc-700">
              Curated website and project templates with docs, demos, and deploy guides.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/templates" className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark">Browse templates</Link>
              <Link href="/pricing" className="rounded-xl border border-zinc-300 px-5 py-3 font-medium hover:bg-zinc-50">View pricing</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {templates.slice(0,4).map((t) => (
              <div key={t.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="h-24 rounded-lg bg-zinc-100 mb-3" />
                <div className="font-semibold text-sm">{t.title}</div>
                <div className="text-xs text-zinc-600">{t.excerpt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="text-xl md:text-2xl font-semibold">Top categories</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Portfolios","Business","Student Projects","SaaS Dashboards"].map((c) => (
            <Link key={c} href={`/templates?category=${encodeURIComponent(c.split(" ")[0].toLowerCase())}`} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="h-24 rounded-lg bg-zinc-100 mb-4" />
              <div className="font-medium">{c}</div>
              <div className="text-sm text-zinc-600">Explore {c.toLowerCase()}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function BuyButton({ template }) {
  const [loading, setLoading] = useState(false);

  const lsVariantId = template?.lsVariantId;
  const stripePriceId = template?.stripePriceId;

  async function startStripeCheckout() {
    if (!stripePriceId) return;
    try {
      setLoading(true);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId: stripePriceId, slug: template.slug }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
    } catch (e) {
      alert(e?.message || "Could not start checkout");
    } finally {
      setLoading(false);
    }
  }

  if (lsVariantId && process.env.NEXT_PUBLIC_LS_STORE_DOMAIN) {
    const target = new URL(
      `/checkout`,
      `https://${process.env.NEXT_PUBLIC_LS_STORE_DOMAIN}`
    );
    target.searchParams.set("variants", String(lsVariantId));
    target.searchParams.set("checkout[custom][template]", template.slug || "");
    return (
      <a
        href={target.toString()}
        className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark inline-flex items-center justify-center"
      >
        {loading ? "Loading…" : "Buy now"}
      </a>
    );
  }

  if (stripePriceId) {
    return (
      <button
        onClick={startStripeCheckout}
        disabled={loading}
        className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark disabled:opacity-60"
      >
        {loading ? "Loading…" : "Buy now"}
      </button>
    );
  }

  return (
    <span className="rounded-x text-white font-medium inline-flex items-center justify-center">
      Coming soon
    </span>
  );
}

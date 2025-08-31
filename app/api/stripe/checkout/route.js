import Stripe from "stripe";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const priceId = body?.priceId;
  const slug = body?.slug || "template";

  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response("Stripe not configured", { status: 400 });
  }
  if (!priceId) {
    return new Response("Missing priceId", { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/templates/${slug}`,
      metadata: { slug }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(e?.message || "Stripe error", { status: 500 });
  }
}

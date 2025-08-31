import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("No webhook secret", { status: 400 });

  const buf = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // TODO: fulfill the order - send email with download link / grant access
      break;
    }
    default:
      break;
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "content-type": "application/json" }
  });
}

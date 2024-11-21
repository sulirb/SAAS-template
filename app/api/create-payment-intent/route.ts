import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { price, planName } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "eur",
      metadata: {
        planName,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Error in create-payment-intent:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

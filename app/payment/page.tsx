"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const plans = [
  { id: "premium", name: "Premium", price: 999 },
  { id: "business", name: "Business", price: 2499 },
];

function CheckoutForm() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error: backendError, clientSecret } = await fetch(
        "/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: selectedPlan.price,
            planName: selectedPlan.name,
          }),
        }
      ).then((r) => r.json());

      if (backendError) {
        setError(backendError.message);
        return;
      }

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: cardholderName,
            },
          },
        });

      if (stripeError) {
        setError(
          stripeError.message || "Une erreur est survenue lors du paiement"
        );
      } else if (paymentIntent.status === "succeeded") {
        router.push("/success");
      }
    } catch (err: any) {
      setError(
        err.message || "Une erreur est survenue lors du traitement du paiement"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plan">Plan d&apos;abonnement</Label>
          <Select
            value={selectedPlan.id}
            onValueChange={(value) =>
              setSelectedPlan(
                plans.find((plan) => plan.id === value) || plans[0]
              )
            }
          >
            <SelectTrigger id="plan">
              <SelectValue placeholder="Sélectionnez un plan" />
            </SelectTrigger>
            <SelectContent>
              {plans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name} - {(plan.price / 100).toFixed(2)}€/mois
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardholderName">Nom du titulaire de la carte</Label>
          <Input
            id="cardholderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card-element">Informations de carte</Label>
          <div className="p-3 border rounded-md">
            <CardElement id="card-element" />
          </div>
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={isLoading || !stripe}
      >
        {isLoading ? "Traitement..." : "Payer"}
      </Button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Paiement de l&apos;abonnement</CardTitle>
          <CardDescription>
            Entrez les détails de votre carte pour finaliser votre abonnement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </CardContent>
        <CardFooter>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Mode Test</AlertTitle>
            <AlertDescription>
              Pour tester, utilisez le numéro de carte 4242 4242 4242 4242, une
              date d&apos;expiration future, et n&apos;importe quel CVC à 3
              chiffres.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}

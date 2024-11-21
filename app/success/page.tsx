"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      // Ici, vous devriez vérifier le statut de la session avec votre backend
      // Pour cet exemple, nous simulons une vérification réussie
      setTimeout(() => {
        setStatus("success");
      }, 1000);
    } else {
      setStatus("error");
    }
  }, [searchParams]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (status === "error") {
    return (
      <div>Une erreur est survenue lors de la vérification du paiement.</div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            Paiement réussi !
          </CardTitle>
          <CardDescription>
            Votre abonnement a été activé avec succès.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Merci pour votre abonnement. Vous pouvez maintenant profiter de
            toutes les fonctionnalités premium.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => router.push("/dashboard")}>
            Aller au tableau de bord
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

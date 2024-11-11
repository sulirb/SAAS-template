"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vous pouvez logger l'erreur sur un service d'analyse d'erreurs ici
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Oups ! Une erreur s'est produite
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Nous sommes désolés, mais quelque chose s'est mal passé.
        </p>
        <div className="space-x-4">
          <Button onClick={() => reset()} variant="outline">
            Réessayer
          </Button>
          <Link href="/" passHref>
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

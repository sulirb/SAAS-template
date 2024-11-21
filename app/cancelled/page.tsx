"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function CanceledPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="text-red-500" />
            Paiement annulé
          </CardTitle>
          <CardDescription>Votre paiement a été annulé.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Si vous avez rencontré des problèmes lors du paiement,
            n&apos;hésitez pas à nous contacter ou à réessayer.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => router.push("/payment")}>
            Réessayer le paiement
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

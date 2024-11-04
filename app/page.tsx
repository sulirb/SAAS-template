"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setIsClient(true);
    setToken(cookies.token);
  }, [cookies.token]);

  const handleLogout = () => {
    window.location.href = "/";
    removeCookie("token");
  };

  if (!isClient) {
    return null; // Ou un placeholder, comme un loader
  }

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      description: "Pour les utilisateurs occasionnels",
      features: [
        "Jusqu'à 5 listes de courses",
        "Accès au stock de base",
        "Synchronisation sur 1 appareil",
      ],
    },
    {
      name: "Premium",
      price: "9,99€",
      description: "Pour les familles et les utilisateurs réguliers",
      features: [
        "Listes de courses illimitées",
        "Accès au stock en temps réel",
        "Synchronisation multi-appareils",
        "Suggestions de recettes",
        "Support prioritaire",
      ],
    },
    {
      name: "Business",
      price: "24,99€",
      description: "Pour les professionnels et les grandes familles",
      features: [
        "Toutes les fonctionnalités Premium",
        "Gestion d'équipe",
        "Rapports et analyses avancés",
        "Intégration API",
        "Support dédié 24/7",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Bienvenue sur <span className="text-blue-600">GroceryList Pro</span>
        </h1>
        <p className="mt-3 text-xl sm:text-2xl mb-8">
          La solution tout-en-un pour votre entreprise
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {token ? (
            <>
              <Link href="/dashboard" passHref>
                <Button>Dashboard</Button>
              </Link>
              <Button onClick={handleLogout}>Se déconnecter</Button>
            </>
          ) : (
            <>
              <Link href="/register" passHref>
                <Button>S&apos;inscrire</Button>
              </Link>
              <Link href="/login" passHref>
                <Button>Se connecter</Button>
              </Link>
            </>
          )}
        </div>

        <section className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Nos offres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.name} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">
                    {plan.price}
                    <span className="text-base font-normal">/mois</span>
                  </div>
                  <ul className="space-y-2 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() =>
                      (window.location.href =
                        plan.name === "Gratuit" ? "/dashboard" : "/pricing")
                    }
                  >
                    {plan.name === "Gratuit" ? "Commencer" : "S'abonner"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

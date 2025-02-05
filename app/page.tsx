"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
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
import { cn } from "@/lib/utils";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setIsClient(true);
    setToken(cookies.token);
  }, [cookies.token]);

  const handleLogout = () => {
    removeCookie("token");
    router.push("/");
  };

  const handlePlanClick = (planName) => {
    if (token) {
      router.push(planName === "Gratuit" ? "/dashboard" : "/payment");
    } else {
      router.push("/login");
    }
  };

  if (!isClient) {
    return null;
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
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white text-gray-900">
      <main className="w-full max-w-6xl text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Gérez vos liste de course avec simplicité
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Un outil complet pour planifier vos courses.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          {token ? (
            <>
              <Link href="/dashboard">
                <Button className="px-6 py-3 text-lg">
                  Accéder au tableau de bord
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="px-6 py-3 text-lg"
              >
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button className="px-6 py-3 text-lg">S'inscrire</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="px-6 py-3 text-lg">
                  Se connecter
                </Button>
              </Link>
            </>
          )}
        </div>

        <section className="w-full mt-12">
          <h2 className="text-4xl font-bold mb-8">Nos offres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className="shadow-lg border border-gray-200 rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gray-100 p-6">
                  <CardTitle className="text-2xl font-semibold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-500">
                      /mois
                    </span>
                  </div>
                  <ul className="space-y-3 text-left text-gray-700">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 bg-gray-50">
                  <Button
                    className="w-full py-3 text-lg"
                    onClick={() => handlePlanClick(plan.name)}
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

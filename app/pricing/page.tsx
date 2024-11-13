"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default function Pricing() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);

  const handlePlanClick = (planName) => {
    if (token) {
      if (planName === "Gratuit") {
        router.push("/dashboard");
      } else {
        router.push("/payment");
      }
    } else {
      router.push("/login");
    }
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choisissez votre plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Des options flexibles pour tous vos besoins de liste de courses
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
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
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {plan.name === "Gratuit" ? "Commencer" : "S'abonner"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

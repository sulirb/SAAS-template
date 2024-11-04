"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, List, ShoppingCart, Users } from "lucide-react";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">GroceryList Pro</h1>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Mes Listes
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Stock Magasins
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Paramètres
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Tableau de bord
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Listes Totales
              </CardTitle>
              <List className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +20% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs Actifs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +15% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Articles Achetés
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-xs text-muted-foreground">
                +35% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Économies Réalisées
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,456 €</div>
              <p className="text-xs text-muted-foreground">
                +10% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Lists */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Listes Récentes
        </h3>
        <div className="bg-white shadow rounded-lg p-4 mb-8">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Rechercher une liste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Nom de la Liste</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Statut</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows, replace with actual data */}
              <tr>
                <td className="py-2">Courses Hebdomadaires</td>
                <td className="py-2">2024-03-10</td>
                <td className="py-2">
                  <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-xs">
                    Complétée
                  </span>
                </td>
                <td className="py-2">
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="py-2">Préparation Dîner</td>
                <td className="py-2">2024-03-09</td>
                <td className="py-2">
                  <span className="bg-yellow-200 text-yellow-800 py-1 px-2 rounded-full text-xs">
                    En cours
                  </span>
                </td>
                <td className="py-2">
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Real-time Stock */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Stock en Temps Réel
        </h3>
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Produit</th>
                <th className="pb-2">Magasin</th>
                <th className="pb-2">Quantité</th>
                <th className="pb-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows, replace with actual data */}
              <tr>
                <td className="py-2">Lait</td>
                <td className="py-2">SuperMarché A</td>
                <td className="py-2">50</td>
                <td className="py-2">
                  <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-xs">
                    En stock
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2">Pain</td>
                <td className="py-2">Boulangerie B</td>
                <td className="py-2">5</td>
                <td className="py-2">
                  <span className="bg-red-200 text-red-800 py-1 px-2 rounded-full text-xs">
                    Stock bas
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

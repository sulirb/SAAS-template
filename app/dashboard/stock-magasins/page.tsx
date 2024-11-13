"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function StockMagasins() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");

  const stores = ["Carrefour", "Auchan", "Leclerc", "Intermarché"];
  const products = [
    {
      id: 1,
      name: "Lait demi-écrémé",
      store: "Carrefour",
      stock: 50,
      price: 0.95,
    },
    { id: 2, name: "Pain de mie", store: "Auchan", stock: 30, price: 1.2 },
    {
      id: 3,
      name: "Pâtes spaghetti",
      store: "Leclerc",
      stock: 100,
      price: 0.8,
    },
    {
      id: 4,
      name: "Yaourt nature",
      store: "Intermarché",
      stock: 40,
      price: 1.5,
    },
    {
      id: 5,
      name: "Pommes Golden",
      store: "Carrefour",
      stock: 75,
      price: 1.99,
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedStore === "all" || product.store === selectedStore) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">GroceryList Pro</h1>
        </div>
        <nav className="mt-4">
          <a
            href="/dashboard"
            className="block py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/mes-listes"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Mes Listes
          </a>
          <a
            href="/dashboard/stock-magasins"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Stock Magasins
          </a>
          <a
            href="/dashboard/parametres"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Paramètres
          </a>
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Stock des Magasins</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtrer les produits</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sélectionner un magasin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les magasins</SelectItem>
                {stores.map((store) => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Magasin</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.store}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 50
                        ? "bg-green-100 text-green-800"
                        : product.stock > 20
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>{product.price.toFixed(2)} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

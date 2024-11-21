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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MesListes() {
  const [newListName, setNewListName] = useState("");
  const [lists, setLists] = useState([
    { id: 1, name: "Courses hebdomadaires", items: 12, completed: 5 },
    { id: 2, name: "Fête d'anniversaire", items: 8, completed: 2 },
    { id: 3, name: "Pique-nique du weekend", items: 6, completed: 0 },
  ]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/error");
    } else {
      setIsLoading(false);
    }
  }, [token, router]);

  if (isLoading) {
    return null;
  }

  const handleAddList = () => {
    if (newListName.trim()) {
      setLists([
        ...lists,
        { id: Date.now(), name: newListName, items: 0, completed: 0 },
      ]);
      setNewListName("");
    }
  };

  const handleDeleteList = (id: number) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">
              GroceryList Pro
            </h1>
          </div>
          <nav className="mt-4">
            <a
              href="/dashboard"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-300"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-200"
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
            <a
              href="/pricing"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
            >
              Tarifs
            </a>
          </nav>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold mb-6">Mes Listes de Courses</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ajouter une nouvelle liste</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Input
                placeholder="Nom de la nouvelle liste"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <Button onClick={handleAddList}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter
              </Button>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de la liste</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lists.map((list) => (
                <TableRow key={list.id}>
                  <TableCell className="font-medium">{list.name}</TableCell>
                  <TableCell>{list.items}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{
                            width: `${(list.completed / list.items) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {list.completed}/{list.items}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

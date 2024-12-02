"use client";

import { useState, useEffect } from "react";
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
import { Plus, Trash2 } from "lucide-react";

interface GroceryList {
  id: number;
  name: string;
  items: number;
  completed: number;
}

export default function MesListes() {
  const [newListName, setNewListName] = useState("");
  const [lists, setLists] = useState<GroceryList[]>([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await fetch("/api/lists");
      if (response.ok) {
        const data = await response.json();
        setLists(data);
      } else {
        console.error("Failed to fetch lists");
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleAddList = async () => {
    if (newListName.trim()) {
      try {
        const response = await fetch("/api/lists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newListName }),
        });

        if (response.ok) {
          setNewListName("");
          fetchLists();
        } else {
          console.error("Failed to add list");
        }
      } catch (error) {
        console.error("Error adding list:", error);
      }
    }
  };

  const handleDeleteList = async (id: number) => {
    try {
      const response = await fetch(`/api/lists/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchLists();
      } else {
        console.error("Failed to delete list");
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
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

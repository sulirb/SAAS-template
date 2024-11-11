import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          404 - Page non trouvée
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Désolé, nous n'avons pas pu trouver la page que vous recherchez.
        </p>
        <Link href="/" passHref>
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}

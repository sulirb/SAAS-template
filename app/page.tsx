import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Bienvenue sur <span className="text-blue-600">MonSaaS</span>
        </h1>
        <p className="mt-3 text-2xl">
          La solution tout-en-un pour votre entreprise
        </p>
        <div className="flex mt-6">
          <Link href="/register" passHref>
            <Button className="mr-4">S'inscrire</Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline">Se connecter</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

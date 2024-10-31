"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {
  PersonFill,
  CurrencyDollar,
  GraphUpArrow,
} from "react-bootstrap-icons";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [token, router]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <h1 className="h3 mb-0 text-gray-800">Tableau de bord</h1>
        </div>
      </header>
      <main className="flex-grow-1">
        <div className="container py-5">
          <div className="row g-4">
            {/* Carte statistique 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 bg-primary text-white p-3 rounded">
                      <PersonFill size={24} />
                    </div>
                    <div className="ms-3">
                      <h6 className="card-subtitle mb-1 text-muted">
                        Utilisateurs totaux
                      </h6>
                      <h2 className="card-title mb-0">1,234</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte statistique 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 bg-success text-white p-3 rounded">
                      <CurrencyDollar size={24} />
                    </div>
                    <div className="ms-3">
                      <h6 className="card-subtitle mb-1 text-muted">Revenus</h6>
                      <h2 className="card-title mb-0">$54,321</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte statistique 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 bg-warning text-white p-3 rounded">
                      <GraphUpArrow size={24} />
                    </div>
                    <div className="ms-3">
                      <h6 className="card-subtitle mb-1 text-muted">
                        Taux de conversion
                      </h6>
                      <h2 className="card-title mb-0">12.5%</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

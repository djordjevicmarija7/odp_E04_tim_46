import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ObrišiVrednostPoKljuču } from "../../helpers/local_storage";
import { useAuth } from "../../hooks/auth/useAuthHook";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole: string;
  redirectTo?: string;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    ObrišiVrednostPoKljuču("authToken");
    logout();
  };


  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }


  if (requiredRole && user?.uloga !== requiredRole) {
    return (
      <main
        className="min-h-screen py-10"
        style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #F7ECE2 100%)" }}
      >
        <div className="w-full max-w-lg mx-auto p-10 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-[rgba(0,0,0,0.06)] text-center">
          <h2 className="text-3xl font-bold text-[#5B4636] mb-4">Nemate dozvolu</h2>

          <p className="text-gray-700 text-lg mb-6">
            Potrebna je uloga{" "}
            <span className="font-semibold text-[#A65B3B]">"{requiredRole}"</span> za pristup ovoj stranici.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#D9BFA0] to-[#C77D57] text-white font-semibold shadow hover:brightness-105 transition"
            >
              Odjava iz aplikacije
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full py-2 rounded-xl bg-white/60 text-[#5B4636] border border-gray-200 hover:bg-white transition"
            >
              ← Nazad
            </button>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};

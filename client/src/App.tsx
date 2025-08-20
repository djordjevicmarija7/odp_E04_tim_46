import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { reportsApi } from "./api_services/reports/ReportAPIService";

import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";

// Auth stranice
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";

// Dashboards
import StanarDashboard from "./pages/stanar/StanarDashboard";
import MajstorDashboard from "./pages/majstor/MajstorDashboard";

// Reports stranice
import MojePrijavePage from "./pages/stanar/MojePrijavePage";
import SvePrijavePage from "./pages/majstor/SvePrijavePage";
import ZavrsiPrijavuPage from "./pages/majstor/ZavrsiPPrijavuPage"; // importuj stranicu koja završava prijavu
import ReportDetaljiPage from "./pages/stanar/DetaljiPrijavePage";
import PrijaviKvarPage from "./pages/stanar/PrijaviKvarPage";

// Ostalo
import NotFoundStranica from "./pages/not_found/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Početne rute uvek vode na login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
      <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />

      {/* Stanar dashboard (ostaje kao ranije) */}
      <Route
        path="/stanar-dashboard"
        element={
          <ProtectedRoute requiredRole="stanar">
            <StanarDashboard />
          </ProtectedRoute>
        }
      />

      {/* Majstor dashboard sa nested (child) rutama */}
      <Route
        path="/majstor-dashboard"
        element={
          <ProtectedRoute requiredRole="majstor">
            <MajstorDashboard />
          </ProtectedRoute>
        }
      >
        {/* Default (index) možemo preusmeriti na sve-prijave */}
        <Route index element={<Navigate to="sve-prijave" replace />} />

        {/* Child rute (RELATIVE: bez prefiksa /majstor-dashboard) */}
        <Route
          path="sve-prijave"
          element={<SvePrijavePage/>}
        />
        <Route
          path="zavrsi-prijavu/:id"
          element={<ZavrsiPrijavuPage reportsApi={reportsApi} />}
        />
      </Route>

      {/* Reports za stanara (ostaju globalno dostupne kroz odgovarajuće ProtectedRoute) */}
      <Route
        path="/moje-prijave"
        element={
          <ProtectedRoute requiredRole="stanar">
            <MojePrijavePage />
          </ProtectedRoute>
        }
      />

      {/* Ostaviti /prijava/:id ako ti treba globalno; inače koristi nested varijantu */}
      <Route
        path="/prijava/:id"
        element={
          <ProtectedRoute requiredRole="majstor">
            <ReportDetaljiPage reportsApi={reportsApi} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/prijavi-kvar"
        element={
          <ProtectedRoute requiredRole="stanar">
            <PrijaviKvarPage reportsApi={reportsApi} />
          </ProtectedRoute>
        }
      />

      {/* Ostale rute */}
      <Route path="/404" element={<NotFoundStranica />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;

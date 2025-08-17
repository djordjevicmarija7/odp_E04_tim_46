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
import ReportDetaljiPage from "./pages/stanar/DetaljiPrijavePage";
import PrijaviKvarPage from "./pages/stanar/PrijaviKvarPage";

// Ostalo
import NotFoundStranica from "./pages/not_found/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Auth rute */}
      <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
      <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />

      {/* Dashboards */}
      <Route
        path="/stanar-dashboard"
        element={
          <ProtectedRoute requiredRole="stanar">
            <StanarDashboard  />
          </ProtectedRoute>
        }
      />

      <Route
        path="/majstor-dashboard"
        element={
          <ProtectedRoute requiredRole="majstor">
            <MajstorDashboard reportsApi={reportsApi} />
          </ProtectedRoute>
        }
      />

      {/* Reports rute */}
      <Route
        path="/moje-prijave"
        element={
          <ProtectedRoute requiredRole="stanar">
            <MojePrijavePage reportsApi={reportsApi} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sve-prijave"
        element={
          <ProtectedRoute requiredRole="majstor">
            <SvePrijavePage reportsApi={reportsApi} />
          </ProtectedRoute>
        }
      />

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
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;

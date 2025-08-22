import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { reportsApi } from "./api_services/reports/ReportAPIService";

import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";


import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";


import StanarDashboard from "./pages/stanar/StanarDashboard";
import MajstorDashboard from "./pages/majstor/MajstorDashboard";


import MojePrijavePage from "./pages/stanar/MojePrijavePage";
import SvePrijavePage from "./pages/majstor/SvePrijavePage";
import ZavrsiPrijavuPage from "./pages/majstor/ZavrsiPPrijavuPage"; 
import ReportDetaljiPage from "./pages/stanar/DetaljiPrijavePage";
import PrijaviKvarPage from "./pages/stanar/PrijaviKvarPage";

import NotFoundStranica from "./pages/not_found/NotFoundPage";

function App() {
  return (
    <Routes>
      {}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
      <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />

      {}
      <Route
        path="/stanar-dashboard"
        element={
          <ProtectedRoute requiredRole="stanar">
            <StanarDashboard />
          </ProtectedRoute>
        }
      />

      {}
      <Route
        path="/majstor-dashboard"
        element={
          <ProtectedRoute requiredRole="majstor">
            <MajstorDashboard />
          </ProtectedRoute>
        }
      >
       
        <Route index element={<Navigate to="sve-prijave" replace />} />

       
        <Route
          path="sve-prijave"
          element={<SvePrijavePage/>}
        />
        <Route
          path="zavrsi-prijavu/:id"
          element={<ZavrsiPrijavuPage reportsApi={reportsApi} />}
        />
      </Route>

     
      <Route
        path="/moje-prijave"
        element={
          <ProtectedRoute requiredRole="stanar">
            <MojePrijavePage />
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

  
      <Route path="/404" element={<NotFoundStranica />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
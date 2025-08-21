import { Outlet } from "react-router-dom";
import { useLogout } from "../../hooks/other/useLogoutHook";

export default function MajstorDashboard() {
  const logout = useLogout();

  return (
    <main className="page-wrapper text-center">
      {}
      <header className="flex justify-end mb-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Odjavi se
        </button>
      </header>

      {}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">👷 Dobrodošli, majstore!</h1>

      {}
      <div className="mt-6">
        <Outlet />
      </div>
    </main>
  );
}

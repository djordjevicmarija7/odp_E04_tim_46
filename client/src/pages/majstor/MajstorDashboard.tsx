import { Link, Outlet } from "react-router-dom";
import { useLogout } from "../../hooks/other/useLogoutHook";

export default function MajstorDashboard() {
  const logout = useLogout();

  return (
    <main className="page-wrapper text-center">
      {/* Header sa logout dugmetom */}
      <header className="flex justify-end mb-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Odjavi se
        </button>
      </header>

      {/* Naslov */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">👷 Добродошли, мајсторе!</h1>

      {/* Linkovi ka stranicama (RELATIVE putevi) */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <Link to="sve-prijave" className="btn-primary w-full md:w-auto">
          📋 Све пријаве
        </Link>
        <Link to="zavrsi-prijavu/1" className="btn-primary w-full md:w-auto">
          ✅ Заврши пријаву (primer id 1)
        </Link>
      </div>

      {/* OVDE se prikazuju child route komponentе */}
      <div className="mt-6">
        <Outlet />
      </div>
    </main>
  );
}


import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/other/useLogoutHook";

export default function StanarDashboard() {
  const logout=useLogout();
  return (
    <main className="page-wrapper text-center">
      <header className="flex justify-end mb-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Odjavi se
        </button>
      </header>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        👋 Dobrodošli, stanar!
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link to="/moje-prijave" className="btn-primary w-full md:w-auto">
          Moje prijave
        </Link>
        <Link to="/prijavi-kvar" className="btn-primary w-full md:w-auto">
          Prijavi novi kvar!
        </Link>
      </div>
    </main>

  );
}


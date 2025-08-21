import { Outlet } from "react-router-dom";
import { useLogout } from "../../hooks/other/useLogoutHook";

export default function MajstorDashboard() {
  const logout = useLogout();

  return (
    <main className="page-wrapper text-center px-4 flex flex-col min-h-screen">
      
     
      <header className="flex justify-end py-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-shadow shadow-md"
        >
          Odjavi se
        </button>
      </header>

    
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 text-center drop-shadow-md mt-4">
        👷 Vaša kontrolna tabla je spremna – 
        pregledajte zadatke i <span className="text-red-600"> kvarove</span>
      </h1>

    
      <div className="mt-6 flex-grow">
        <Outlet />
      </div>
    </main>
  );
}

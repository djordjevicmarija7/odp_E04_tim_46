import { Link } from "react-router-dom"; 
import { useLogout } from "../../hooks/other/useLogoutHook";
import { motion } from "framer-motion";
import { LogOut, FileText, AlertCircle, Info } from "lucide-react";


export default function StanarDashboard() {
  const logout = useLogout();

  return (
    <main className="page-wrapper flex flex-col min-h-screen bg-gradient-to-br from-[#FFFBF7] via-[#FFF6EC] to-[#FFF2E0] items-center justify-center px-4">
      <header className="w-full flex justify-end py-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Odjavi se
        </button>
      </header>

  
      <div className="flex flex-col flex-grow items-center justify-center">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4 text-center drop-shadow-sm"
        >
          🏠 Stanarski portal – vaš pregled prijava i kvarova
        </motion.h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl">
          Brzo pratite svoje prijave ili prijavite nove kvarove – sve na jednom mjestu!
        </p>

        <div className="grid gap-6 sm:grid-cols-2 w-full max-w-4xl">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <FileText className="text-blue-500 mb-3" size={40} />
            <h2 className="text-xl font-semibold mb-2">Moje prijave</h2>
            <p className="text-gray-600 mb-4">
              Pogledajte sve vaše prijave i pratite njihov status.
            </p>
            <Link
              to="/moje-prijave"
              className="btn-primary px-6 py-2 rounded-xl shadow hover:shadow-lg transition w-full sm:w-auto"
            >
              Otvori prijave
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <AlertCircle className="text-green-500 mb-3" size={40} />
            <h2 className="text-xl font-semibold mb-2">Prijavi novi kvar</h2>
            <p className="text-gray-600 mb-4">
              Imate novi problem? Brzo ga prijavite na sistemu.
            </p>
            <Link
              to="/prijavi-kvar"
              className="btn-primary px-6 py-2 rounded-xl shadow hover:shadow-lg transition w-full sm:w-auto"
            >
              Prijavi kvar
            </Link>
          </motion.div>
        </div>
      </div>

      <footer className="w-full bg-white shadow-inner rounded-t-2xl p-6 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <Info className="text-indigo-500" size={32} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Dodatna pitanja?
            </h3>
            <p className="text-gray-600">
              Ako imate bilo kakva dodatna pitanja ili vam je potrebna pomoć, 
              obratite se <span className="font-medium text-indigo-600">upravi zgrade </span> 
              putem telefona ili e-mail adrese dostupne u hodniku.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

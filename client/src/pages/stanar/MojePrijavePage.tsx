// src/pages/prijave/MojePrijavePage.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Folder, Plus } from "lucide-react";
import ReportFilterSortPanel from "../../components/reports/ReportFilterSortPanel";
import { reportsApi } from "../../api_services/reports/ReportAPIService";

export default function MojePrijavePage() {
  return (
    <main
      className="min-h-screen py-10"
      style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #F7ECE2 100%)" }}
    >
      {/* CENTRALNI CONTAINER: ova linija garantuje centriranje */}
      <div className="max-w-6xl mx-auto w-full px-4">
        <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-3xl md:text-4xl font-serif font-bold text-[#5B4636] flex items-center gap-3"
            >
              <Folder className="text-[#A65B3B]" size={28} />
                Moje prijave
            </motion.h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/prijavi-kvar"
              aria-label="Prijavi novi kvar"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D9BFA0] to-[#C77D57] text-white px-6 py-3 rounded-3xl shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <Plus size={18} />
              <span className="text-lg font-semibold">Prijavi novi kvar</span>
            </Link>
          </div>
        </header>

        <main className="w-full">
          <ReportFilterSortPanel fetchFn={reportsApi.getPrijaveKorisnika} />
        </main>
      </div>
    </main>
  );
}

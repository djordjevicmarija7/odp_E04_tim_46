import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { MasterReportFilterPanel } from "../../components/reports/MasterReportFilterPanel";
import { reportsApi } from "../../api_services/reports/ReportAPIService";

export default function SvePrijavePage() {
  return (
    <main className="min-h-screen py-10" style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #F7ECE2 100%)" }}>
      <div className="max-w-6xl mx-auto w-full px-4">

        <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-3xl md:text-4xl font-serif font-bold text-[#5B4636] flex items-center gap-3"
          >
            <ClipboardList className="text-[#A65B3B]" size={28} />
            Sve prijave
          </motion.h1>
          <p className="text-sm text-[color:var(--muted)] mt-2 md:mt-0">Pregledaj i filtriraj prijave po statusu.</p>
        </header>

        <section className="w-full">
          <MasterReportFilterPanel fetchFn={reportsApi.getSviIzvestaji} reportsApi={reportsApi} />
        </section>
      </div>
    </main>
  );
}

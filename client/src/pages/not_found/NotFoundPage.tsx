import { Link } from "react-router-dom";

export default function NotFoundStranica() {
  return (
    <main className="min-h-screen bg-[#FDF6ED] flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl px-10 py-14 text-center max-w-lg w-full">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Stranica nije pronađena</h2>
        <p className="text-gray-600 mb-6">
          Stranica koju tražite ne postoji ili je premještena.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#C77D57]/70 hover:bg-[#C77D57]/90 text-white px-6 py-2 rounded-xl font-medium transition"
        >
          Nazad na početnu
        </Link>
      </div>
    </main>
  );
}

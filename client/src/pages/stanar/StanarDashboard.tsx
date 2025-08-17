
import { Link } from "react-router-dom";

export default function StanarDashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Добродошли, станар!</h1>
      <div className="flex flex-col gap-4">
        <Link to="/moje-prijave" className="btn-primary">Моје пријаве</Link>
        <Link to="/prijavi-kvar" className="btn-primary">Пријави нови квар</Link>
      </div>
    </main>
  );
}

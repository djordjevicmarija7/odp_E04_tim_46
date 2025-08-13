import InformacijeOKorisniku from "../../components/kontrolna_tabla/informacije_o_korisniku/InformacijeOKorisniku";
import { PročitajVrednostPoKljuču, ObrišiVrednostPoKljuču } from "../../helpers/local_storage";

interface KontrolnaTablaProps {
  onLogout: () => void;
}

export default function KontrolnaTabla({ onLogout }: KontrolnaTablaProps) {
  const token = PročitajVrednostPoKljuču("authToken");

  if (!token || !token.includes("/")) {
    onLogout();
    return null;
  }

  const [korisnickoIme, id_string] = token.split("/");
  const id = Number(id_string);

  const handleLogout = () => {
    ObrišiVrednostPoKljuču("authToken");
    onLogout();
  };

  return (
    <div className="form-wrapper">
      <h1>Контролна табла</h1>
      <InformacijeOKorisniku id={id} korisnickoIme={korisnickoIme} />
      <button onClick={handleLogout}>Напусти контролну таблу</button>
    </div>
  );
}

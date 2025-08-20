
import type { RezultatValidacije } from "../../../types/validation/ValidationResult";

export function validacijaZavrsiPrijavu(comment?: string, cena?: number | string): RezultatValidacije {
  if (!comment || typeof comment !== "string" || comment.trim().length < 3) {
    return { uspesno: false, poruka: "Komentar je obavezan i mora imati najmanje 3 karaktera." };
  }

  if (cena === undefined || cena === null || cena === "") {
    return { uspesno: false, poruka: "Cena je obavezna." };
  }

  const broj = typeof cena === "string" ? Number(cena) : cena;
  if (isNaN(broj) || broj < 0) {
    return { uspesno: false, poruka: "Cena mora biti broj veći ili jednak 0." };
  }

  return { uspesno: true };
}

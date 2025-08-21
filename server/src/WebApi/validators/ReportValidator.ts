import { RezultatValidacije } from '../../Domain/types/ValidationResult';

export function validacijaPrijaveKvara(
  naslov?: string,
  opis?: string,
  adresa?: string
): RezultatValidacije {
  if (!opis || !adresa) {
    return { uspesno: false, poruka: 'Opis i adresa su obavezni.' };
  }

  const naslovTrim = naslov ? naslov.trim() : '';
  const opisTrim = opis ? opis.trim() : '';
  const adresaTrim = adresa ? adresa.trim() : '';

  if (opisTrim.length < 5) {
    return { uspesno: false, poruka: 'Opis mora imati najmanje 5 karaktera.' };
  }

  if (opisTrim.length > 2000) {
    return { uspesno: false, poruka: 'Opis može imati najviše 2000 karaktera.' };
  }

  if (naslovTrim && naslovTrim.length < 3) {
    return { uspesno: false, poruka: 'Naslov, ako postoji, mora imati najmanje 3 karaktera.' };
  }

  if (naslovTrim.length > 200) {
    return { uspesno: false, poruka: 'Naslov može imati najviše 200 karaktera.' };
  }

  if (adresaTrim.length > 200) {
    return { uspesno: false, poruka: 'Adresa može imati najviše 200 karaktera.' };
  }

  return { uspesno: true };
}
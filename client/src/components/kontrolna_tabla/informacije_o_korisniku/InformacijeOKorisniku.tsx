import type { UserLoginDto } from "../../../models/auth/UserLoginDto";

export default function InformacijeOKorisniku({ id, korisnickoIme }: UserLoginDto) {
  return (
    <div className="dashboard-info">
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Корисничко име:</strong> {korisnickoIme}</p>
      <p><strong>Датум и време:</strong> {new Date().toLocaleString()}</p>
    </div>
  );
}
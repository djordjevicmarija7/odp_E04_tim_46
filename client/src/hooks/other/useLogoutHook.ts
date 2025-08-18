import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuthHook";

export function useLogout() {
  const { logout } = useAuth(); // koristi logout iz konteksta
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // resetuje user i token
    navigate("/login"); // preusmeri na login stranicu
  };

  return handleLogout;
}

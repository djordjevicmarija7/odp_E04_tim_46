import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuthHook";

export function useLogout() {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return handleLogout;
}

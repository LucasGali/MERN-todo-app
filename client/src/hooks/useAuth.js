import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useLocalStorage("loggedUser", null);

  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    navigate("/home");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
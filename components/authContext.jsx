import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Aquí podrías implementar la lógica real de inicio de sesión, por ahora simplemente estableceremos el estado como autenticado.
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Guardar en localStorage que el usuario está autenticado
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remover el estado de autenticación al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

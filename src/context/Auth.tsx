import { onAuthStateChanged, type User } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loadingUser: boolean;
  signOut: () => Promise<void>;
}

// Why is this happening?
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loadingUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

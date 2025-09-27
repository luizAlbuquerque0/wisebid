import { AuthService } from '~/services/AuthService';
import { createContext, useCallback, useState } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      // Chamar API real do backend
       await AuthService.signIn({
        email,
        password,
      });

      setSignedIn(true);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setSignedIn(false);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  }, []);

  const value: IAuthContextValue = {
    signedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

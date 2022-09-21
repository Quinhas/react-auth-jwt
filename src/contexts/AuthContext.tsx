import axios from "axios";
import { createContext } from "react";

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface RegisterProps {
  username: string;
  password: string;
}

interface AuthContextProps {
  handleRegister: (props: RegisterProps) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  async function handleRegister({ username, password }: RegisterProps) {
    await axios.post('http://localhost:3333/user/signup', { username, password });
  }

  return <AuthContext.Provider value={{ handleRegister }}>{children}</AuthContext.Provider>;
}
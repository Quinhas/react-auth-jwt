import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface RegisterProps {
  username: string;
  password: string;
}

interface LoginProps {
  username: string;
  password: string;
}

interface UserProps {
  userID: string;
  username: string;
}

interface AuthContextProps {
  handleLogin: (props: LoginProps) => Promise<void>;
  handleRegister: (props: RegisterProps) => Promise<void>;
  isLoading: boolean;
  isLogged: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProps>();
  const navigate = useNavigate();
  const location = useLocation();

  function validateToken(token: string): UserProps {
    const decodedToken = jwtDecode<JwtPayload & UserProps>(token);
    if (!decodedToken.exp || decodedToken.exp <= Date.now() / 1000) {
      throw Error();
    }

    return {
      userID: decodedToken.userID,
      username: decodedToken.username
    }
  }

  async function handleLogin({ username, password }: LoginProps) {
    const { data } = await axios.post<{ token: string }>('http://localhost:3333/auth/signin', { username, password });
    const user = validateToken(data.token);
    setUser(user);
    setIsLogged(true);
    localStorage.setItem("token", data.token);
  }

  async function handleRegister({ username, password }: RegisterProps) {
    await axios.post('http://localhost:3333/user/signup', { username, password });
  }

  useEffect(() => {
    try {
      const localToken = localStorage.getItem('token');
      if (!localToken) {
        throw new Error();
      }
      const user = validateToken(localToken);
      setUser(user);
      setIsLogged(true);
    } catch (error) {
      setIsLogged(false);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && isLogged) {
      if (['/entrar', '/cadastrar'].includes(location.pathname)) {
        navigate('/');
      }
    }
  }, [isLoading, isLogged]);

  return <AuthContext.Provider value={{ handleLogin, handleRegister, isLoading, isLogged }}>{children}</AuthContext.Provider>;
}
import { Flex, Spinner, Text } from "@chakra-ui/react";
import {
  Navigate,
  Route, Routes
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { isLoading, isLogged } = useAuth();

  if (isLoading) {
    return (
      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Flex
          direction="column"
          align="center"
          gridGap="1.5rem"
          bg={'white'}
          boxShadow="md"
          py="2rem"
          px="4rem"
          borderRadius="md"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text color="gray.500">Carregando...</Text>
        </Flex>
      </Flex>
    );
  }

  if (!isLogged) {
    return <Navigate to="/entrar" />;
  }

  return children;
}

export function CustomRoutes() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path='/entrar' element={<LoginPage />} />
      <Route path='/cadastrar' element={<RegisterPage />} />
    </Routes>
  )
}
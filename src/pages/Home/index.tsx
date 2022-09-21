import { Button, Flex, Heading, ListItem, OrderedList, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";


interface UserProps {
  username: string;
  createdAt: string;
  updatedAt: string;
}

export function HomePage(): JSX.Element {
  const { user, handleLogout } = useAuth();
  const [users, setUsers] = useState<UserProps[]>([]);
  const toast = useToast();

  async function getUsers() {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get<UserProps[]>('http://localhost:3333/user', { headers: { 'Authorization': `Bearer ${token}` } });
      setUsers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response?.data as unknown as { error: string };
        toast({
          title: "Opa!",
          status: "error",
          description: response.error ?? 'Não foi possível continuar. Tente novamente.',
          isClosable: true,
          duration: 3000
        });
        return
      }

      toast({
        title: "Opa!",
        status: "error",
        description: 'Não foi possível continuar. Tente novamente.',
        isClosable: true,
        duration: 3000
      });
    }
  }

  return (
    <>
      <Flex gap={'5rem'} p={'3rem'}>
        <Heading>Olá, {user?.username}</Heading>
        <Button colorScheme={'blue'} onClick={getUsers}>Usuários</Button>
        <Button colorScheme={'blue'} onClick={handleLogout}>Sair</Button>
      </Flex>
      <OrderedList px={'3rem'}>
        {users.map((user) => (
          <ListItem key={user.username}>{user.username}</ListItem>
        ))}
      </OrderedList>
    </>
  )
}
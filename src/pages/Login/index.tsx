import { Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface FormData {
  username: string;
  password: string;
}

export function LoginPage(): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();
  const toast = useToast();
  const { handleLogin } = useAuth();

  async function onSubmitClick({ username, password }: FormData) {
    if (!username || !password) {
      toast({
        status: 'error',
        title: "Opa!",
        description: "Todos os campos são obrigatórios.",
        isClosable: true,
        duration: 3000
      });
      return;
    }

    try {
      await handleLogin({ username, password });
      toast({
        status: 'success',
        title: "Oba!",
        description: "Usuário logado com sucesso.",
        isClosable: true,
        duration: 3000
      });
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
        return;
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
    <Flex w='100%' h='100vh' align='center' justify='center'>
      <Flex bg='white' p='1.5rem' borderRadius='lg' boxShadow='base' w='25rem' h='30rem' direction='column' gap='1rem'>
        <Heading>Entrar</Heading>
        <Flex as='form' gap='0.5rem' direction='column' onSubmit={handleSubmit(onSubmitClick)} grow={1} justify='center'>
          <FormControl>
            <FormLabel>Nome de Usuário</FormLabel>
            <Input type='text' {...register('username')} />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type='password' {...register('password')} />
          </FormControl>
          <Button type='submit' colorScheme='blue'>Entrar</Button>
        </Flex>
        <Divider />
        <Flex justify='center'>
          <Text>
            Ainda não é cadastrado?{" "}
            <Text as={Link} to='/cadastrar' color='blue.400' _hover={{ color: 'blue.500' }} transition='0.3s'>Clique aqui.</Text>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
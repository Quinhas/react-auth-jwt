import { Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export function RegisterPage(): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();
  const toast = useToast();
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  async function onSubmitClick({ username, password, confirmPassword }: FormData) {
    if (!username || !password || !confirmPassword) {
      toast({
        status: 'error',
        title: "Opa!",
        description: "Todos os campos são obrigatórios.",
        isClosable: true,
        duration: 3000
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        status: 'error',
        title: "Opa!",
        description: "As senhas não correspondem.",
        isClosable: true,
        duration: 3000
      });
      return;
    }

    try {
      await handleRegister({ username, password });
      toast({
        status: 'success',
        title: "Oba!",
        description: "Usuário cadastrado com sucesso.",
        isClosable: true,
        duration: 3000
      });
      navigate('/entrar');
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
        <Heading>Cadastrar</Heading>
        <Flex as='form' gap='0.5rem' direction='column' onSubmit={handleSubmit(onSubmitClick)} grow={1} justify='center'>
          <FormControl>
            <FormLabel>Nome de Usuário</FormLabel>
            <Input type='text' {...register('username')} />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type='password' {...register('password')} />
          </FormControl>
          <FormControl>
            <FormLabel>Confirmar Senha</FormLabel>
            <Input type='password' {...register('confirmPassword')} />
          </FormControl>
          <Button type='submit' colorScheme='blue'>Cadastrar</Button>
        </Flex>
        <Divider />
        <Flex justify='center'>
          <Text>
            Já possui conta?{" "}
            <Text as={Link} to='/entrar' color='blue.400' _hover={{ color: 'blue.500' }} transition='0.3s'>Clique aqui.</Text>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
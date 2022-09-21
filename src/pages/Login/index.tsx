import { Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

export function LoginPage(): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <Flex w='100%' h='100vh' align='center' justify='center'>
      <Flex bg='white' p='1.5rem' borderRadius='lg' boxShadow='base' w='25rem' h='30rem' direction='column' gap='1rem'>
        <Heading>Entrar</Heading>
        <Flex as='form' gap='0.5rem' direction='column' onSubmit={handleSubmit(() => { })} grow={1} justify='center'>
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
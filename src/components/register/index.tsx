import {
  Input,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Badge,
} from '@chakra-ui/react'
import {
  Container,
  Title,
  FormsContainer,
  DivButton,
  RegisterContainer,
  Inputs,
  ContainerTable,
} from './styles'
import { FormEvent, useRef, useState, useEffect } from 'react'
import { api } from '../../services/api'

interface CostumerProps {
  id: string
  name: string
  email: string
  status: boolean
  created_at: string
  updated_at: string
}

export function Register() {
  const [customers, setCustomers] = useState<CostumerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomer()
  }, [])

  async function loadCustomer() {
    const responseLoad = await api.get('/customers')
    setCustomers(responseLoad.data)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!nameRef.current?.value || !emailRef.current?.value) return

    const response = await api.post('/customer', {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    })

    setCustomers((allCustomers) => [...allCustomers, response.data])

    nameRef.current.value = ''
    emailRef.current.value = ''
  }

  async function handleDelete(id: string) {
    try {
      await api.delete('/customer', {
        params: {
          id,
        },
      })
      const allCustomers = customers.filter((customer) => customer.id !== id)
      setCustomers(allCustomers)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Container>
        <Title>Cadastrar Cliente</Title>
        <RegisterContainer>
          <FormsContainer>
            <form action="" onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <Inputs>
                  <Input
                    colorScheme="teal"
                    placeholder="Nome da cliente"
                    size="md"
                    required
                    ref={nameRef}
                  />
                  <Input
                    colorScheme="teal"
                    placeholder="Email da cliente"
                    size="md"
                    required
                    ref={emailRef}
                  />
                </Inputs>
              </Stack>
              <DivButton>
                <Stack spacing={3} direction="row">
                  <Button colorScheme="teal" variant="solid" type="submit">
                    Cadastrar
                  </Button>
                </Stack>
              </DivButton>
            </form>
          </FormsContainer>
        </RegisterContainer>
      </Container>
      <ContainerTable>
        {customers.length > 0 && (
          <TableContainer width="100%">
            <Table variant="striped">
              <TableCaption>Registro de Clientes</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Email</Th>
                  <Th>Status</Th>
                  <Th isNumeric>Date Cadastro</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((costumer) => (
                  <>
                    <Tr key={costumer.id}>
                      <Td>{costumer.name}</Td>
                      <Td>{costumer.email}</Td>
                      <Td>
                        <Badge colorScheme="green">
                          {costumer.status ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </Td>
                      <Td isNumeric>{costumer.created_at}</Td>
                      <Td>
                        <button onClick={() => handleDelete(costumer.id)}>
                          Delete
                        </button>
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {customers.length === 0 && <h1>nao possui clientes</h1>}
      </ContainerTable>
    </>
  )
}

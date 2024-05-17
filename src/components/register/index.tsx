import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { formatCpf, formatName, formatPhoneNumber } from '../../format/index'
import { api } from '../../services/api'
import {
  Container,
  ContainerTable,
  DivButton,
  FormsContainer,
  Inputs,
  ModeTheme,
  RegisterContainer,
  Title,
} from './styles'

interface CustomerProps {
  id: string
  name: string
  email: string
  phone: string
  document: string
  status: boolean
  created_at: string
  updated_at: string
}

export function Register() {
  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [value, setValue] = useState()
  const customerIdRef = useRef<string | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const documentRef = useRef<HTMLInputElement | null>(null)
  const statusRef = useRef<HTMLSelectElement | null>(null)
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
    try {
      setLoading(true)
      const response = await api.get('/customers')
      setCustomers(response.data)
      console.log(response)
    } catch (err) {
      return err
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !phoneRef.current?.value ||
      !documentRef.current?.value
    )
      return

    try {
      setLoading(true)
      const response = await api.post('/customer', {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        document: documentRef.current.value,
      })
      setCustomers([...customers, response.data])
      handleClear()
      toast({
        title: 'Cliente cadastrado.',
        description: 'O cliente foi cadastrado com sucesso.',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error)

      toast({
        title: 'Erro ao cadastrar cliente.',
        description: 'Ocorreu um erro ao tentar cadastrar o cliente.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    if (nameRef.current) nameRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (phoneRef.current) phoneRef.current.value = ''
    if (documentRef.current) documentRef.current.value = ''
  }

  async function handleDelete(id: string) {
    try {
      setLoading(true)
      await api.delete('/customer', { params: { id } })
      const allCustomers = customers.filter((customer) => customer.id !== id)
      setCustomers(allCustomers)
      toast({
        title: 'Cliente excluído.',
        description: 'O cliente foi excluído com sucesso.',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Erro ao excluir cliente.',
        description: 'Ocorreu um erro ao tentar excluir o cliente.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleOpenModal(id: string) {
    const customerToEdit = customers.find((customer) => customer.id === id)
    if (customerToEdit) {
      customerIdRef.current = id
      if (nameRef.current) nameRef.current.value = customerToEdit.name
      if (emailRef.current) emailRef.current.value = customerToEdit.email
      if (phoneRef.current) phoneRef.current.value = customerToEdit.phone
      if (documentRef.current)
        documentRef.current.value = customerToEdit.document
      if (statusRef.current)
        statusRef.current.value = customerToEdit.status ? 'ativo' : 'inativo'
      setIsOpen(true)
    }
    handleClear()
  }

  function handleCloseModal() {
    setIsOpen(false)
    customerIdRef.current = null
  }

  async function handleUpdateCustomer() {
    if (
      !customerIdRef.current ||
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !phoneRef.current?.value ||
      !documentRef.current?.value ||
      !statusRef.current?.value
    ) {
      // eslint-disable-next-line no-unused-expressions
      ;('')
    }
    try {
      setLoading(true)
      await api.put(`/customer/${customerIdRef.current}`, {
        name: nameRef.current?.value || '',
        email: emailRef.current?.value || '',
        phone: phoneRef.current?.value || '',
        document: documentRef.current?.value || '',
        status: statusRef.current?.value === 'ativo',
      })

      const updatedCustomers = customers.map((customer) => {
        if (customer.id === customerIdRef.current) {
          return {
            ...customer,
            name: nameRef.current?.value || '',
            email: emailRef.current?.value || '',
            phone: phoneRef.current?.value || '',
            document: documentRef.current?.value || '',
            status: statusRef.current?.value === 'ativo',
          }
        }
        return customer
      })

      handleCloseModal()
      setCustomers(updatedCustomers)
      loadCustomers()
      location.reload()

      toast({
        title: 'Cliente atualizado.',
        description: 'O cliente foi atualizado com sucesso.',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: `${err.response.data.message}`,
        description: 'Ocorreu um erro ao tentar atualizar o cliente.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Container>
        <ModeTheme>
          <Tooltip
            label={colorMode === 'light' ? 'Light' : 'Dark'}
            placement="top"
          >
            <Button onClick={() => toggleColorMode()}>
              {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Tooltip>
        </ModeTheme>
        <Title>Cadastrar Cliente</Title>
        <RegisterContainer>
          <FormsContainer>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Inputs>
                  <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      colorScheme="teal"
                      placeholder="Nome"
                      size="md"
                      required
                      ref={nameRef}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      colorScheme="teal"
                      placeholder="Email@gmail.com"
                      size="md"
                      required
                      ref={emailRef}
                    />
                  </FormControl>
                </Inputs>
                <Inputs>
                  <FormControl>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      colorScheme="teal"
                      placeholder="55 85 900000000"
                      type="number"
                      size="md"
                      required
                      ref={phoneRef}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>CPF</FormLabel>
                    <Input
                      colorScheme="teal"
                      placeholder="123.123.123-12"
                      type="number"
                      size="md"
                      required
                      ref={documentRef}
                    />
                  </FormControl>
                </Inputs>
              </Stack>
              <DivButton>
                <RadioGroup defaultValue="1">
                  <Stack direction="row">
                    <Radio value="1">Ativo</Radio>
                    <Radio value="2" isDisabled>
                      Inativo
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Stack spacing={3} direction="row">
                  <Button
                    colorScheme="teal"
                    variant="primary"
                    onClick={handleClear}
                  >
                    Limpar
                  </Button>
                  <Button colorScheme="teal" variant="solid" type="submit">
                    Cadastrar
                  </Button>
                </Stack>
              </DivButton>
            </form>
          </FormsContainer>
        </RegisterContainer>
      </Container>
      {loading ? (
        <Container>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Container>
      ) : (
        <ContainerTable>
          {customers.length > 0 ? (
            <TableContainer width="100%">
              <Table variant="striped">
                <TableCaption>Registro de Clientes</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>Telefone</Th>
                    <Th>Documento</Th>
                    <Th>Status</Th>
                    <Th isNumeric>Data Cadastro</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customers.map((customer) => (
                    <Tr key={customer.id}>
                      <Td>
                        <Tooltip label={customer.name} placement="top-end">
                          {formatName(customer.name)}
                        </Tooltip>
                      </Td>
                      <Td>{customer.email}</Td>
                      <Td>{formatPhoneNumber(customer.phone)}</Td>
                      <Td>{formatCpf(customer.document)}</Td>
                      <Td>
                        <Badge colorScheme={customer.status ? 'green' : 'red'}>
                          {customer.status ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </Td>
                      <Td isNumeric>
                        {new Intl.DateTimeFormat('pt-BR').format(
                          new Date(customer.created_at),
                        )}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          size="sm"
                          onClick={() => handleOpenModal(customer.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          color={'red'}
                          size="sm"
                          ml={2}
                          onClick={() => handleDelete(customer.id)}
                        >
                          Excluir
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <h1>Não há clientes cadastrados</h1>
            </>
          )}
        </ContainerTable>
      )}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input ref={nameRef} placeholder="Nome do cliente" required />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} placeholder="Email do cliente" required />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Telefone</FormLabel>
              <Input
                ref={phoneRef}
                placeholder="Telefone do cliente"
                type="number"
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Documento</FormLabel>
              <Input
                ref={documentRef}
                placeholder="Documento do cliente"
                type="number"
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select ref={statusRef}>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateCustomer}>
              Salvar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

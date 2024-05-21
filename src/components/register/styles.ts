import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`

export const RegisterContainer = styled.div`
  min-width: 700px;
  max-width: 700px;
  height: auto;
  padding: 2rem;
  background-color: #1e1e1e;
  border: 2px solid #52675a;
  border-radius: 15px;
  box-shadow: 10px 5px 10px 1px #1e1e1e;
`

export const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`

export const FormsContainer = styled.div`
  display: block;
  color: white;
  input {
    border-color: #52675a;
  }
`
export const DivButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
`

export const Inputs = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 1rem;
`

export const ContainerTable = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  padding: 8rem 0;
  button {
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }
`
export const ModeTheme = styled.div`
  display: grid;
  justify-content: right;
  align-items: flex-end;
  padding-top: 1.5rem;
`

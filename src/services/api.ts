import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-clientes-ax5o.onrender.com/',
  // baseURL: 'http://localhost:5000/',
})

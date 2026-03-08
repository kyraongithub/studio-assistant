import axios from 'axios';

export const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
});

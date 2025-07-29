import axios from 'axios';
import { envs } from './envs';

const BASE_URL = envs.apiBackend;

const backendInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

backendInstance.interceptors.response.use(response => response.data);

export default backendInstance;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // ส่ง cookie ไปด้วยทุก request
});

export default apiClient;

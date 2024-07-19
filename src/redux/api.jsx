import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ticket-up92.onrender.com/',
});

export default api;
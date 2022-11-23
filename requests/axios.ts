import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
  baseURL: `${baseURL}/v2/client`,
  headers: {
    'X-Target': 'np',
  },
});

export const axiosV1 = axios.create({
  baseURL: `${baseURL}/v1`,
  headers: {
    'X-Target': 'np',
  },
});

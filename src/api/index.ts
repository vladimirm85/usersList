import axios from 'axios';
const API = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/users`,
});
export default API;

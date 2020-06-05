import axios from 'axios';

// const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://jsonplaceholder.typicode.com/users';

const API = axios.create({
  baseURL: /* proxyurl +  */ url,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
export default API;

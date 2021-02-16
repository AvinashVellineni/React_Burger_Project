import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://burgerbuilderproject-1939d-default-rtdb.firebaseio.com/'
});

export default axiosInstance;

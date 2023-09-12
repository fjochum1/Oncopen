/* The api/index.js file sets up and configures an Axios instance
for the application to communicate with the backend API. Axios is
a popular HTTP client for JavaScript that makes sending HTTP
requests simpler. */

// Import the Axios library and the API_SERVER constant
import Axios from "axios";
import { API_SERVER } from "../config/constant";

// Create a new Axios instance with a predefined configuration
const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  headers: { "Content-Type": "application/json" },
});

// Intercept every request to add the token to the headers
axios.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser && JSON.parse(storedUser);
    const token = user?.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

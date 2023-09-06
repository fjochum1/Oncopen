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

axios.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
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

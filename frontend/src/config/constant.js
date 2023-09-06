/* Make the connection with the backend server */

let BACKEND_SERVER = null;
if (process.env.REACT_APP_BACKEND_SERVER) {
  BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
} else {
  BACKEND_SERVER = "http://localhost:8081/";
}

export const API_SERVER = BACKEND_SERVER;

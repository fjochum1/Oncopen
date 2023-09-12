import axios from "./index";

let base = "users";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${base}/login`, data);
  };

  static Register = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };

  static Edit = (data) => {
    return axios.post(`${base}/edit`, data);
  };
}

export default AuthApi;

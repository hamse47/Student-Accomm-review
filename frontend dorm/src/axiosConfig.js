import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

let token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["token"] = token;
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

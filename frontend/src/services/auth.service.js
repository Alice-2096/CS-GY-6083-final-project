import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const register = (userName, password, firstName, lastName, nickname) => {
  return axios.post(API_URL + 'signup', {
    userName,
    password,
    firstName,
    lastName,
    nickname,
  });
};

const login = (userName, password) => {
  return axios
    .post(API_URL + 'login', {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;

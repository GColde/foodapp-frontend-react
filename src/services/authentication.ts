import axios from "axios";

const URL = "http://localhost:8080/users";
const URL_LOGIN = "http://localhost:8080/auth/login";
const URL_REGISTER = "http://localhost:8080/auth/register";

export type login = {
  email: string;
  password: string;
};
export type register = {
  email: string;
  username: string;
  password: string;
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logInUser = async (data: login) => {
  try {
    const resp = await axios.post(URL_LOGIN, data);
    return resp.data.authentication.sessionToken;
  } catch (error) {
    console.log(error);
  }
  console.log(data);
};

export const registerUser = async (data: register) => {
  try {
    const resp = await axios.post(URL_REGISTER, data);
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
  console.log(data);
};

export const deleteUser = async (data: string) => {
  try {
    const response = await axios.delete(`${URL}/${data}`);
    console.log(`${URL}/${data}`);
    const resp = response.data;
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const userTokenCheck = async () => {
  try {
    const data = localStorage.getItem("SESSION-ID");
    const response = await axios.get(`${URL}/${data}`);
    const resp = response.data;
    return resp;
  } catch (error) {
    console.log(error);
  }
};

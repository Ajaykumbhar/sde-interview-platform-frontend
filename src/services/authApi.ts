import axios from "axios";
import type { ApiResponse, LoginData, RegisterData } from "../types/auth";
const API_BASE_URL = "http://localhost:8080";

export const loginUser = (data: LoginData) => {
  const url = `${API_BASE_URL}/auth/login`;
  return axios.post<ApiResponse>(url, data);
};

export const registerUser = (data: RegisterData) => {
  const url = `${API_BASE_URL}/auth/register`;
  return axios.post<ApiResponse>(url, data);
};

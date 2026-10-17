import axiosInstance from "../api/axiosInstance";
import type { ApiResponse, LoginData, RegisterData } from "../types/auth";

export const loginUser = (data: LoginData) => {
  return axiosInstance.post<ApiResponse>("/auth/login", data);
};

export const registerUser = (data: RegisterData) => {
  return axiosInstance.post<ApiResponse>("/auth/register", data);
};

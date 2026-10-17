export interface LoginData {
  userEmail: string;
  userPassword: string;
}

export interface RegisterData {
  userEmail: string;
  userPassword: string;
  userName: string;
}

export interface ApiResponse {
  token: string;
  status: string;
  message: string;
}

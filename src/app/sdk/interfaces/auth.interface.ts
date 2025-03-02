export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  role: string;
  data: string;
}

export interface RegisterResponse {
  message: string;
  data: string;
}

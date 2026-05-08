export type AuthUser = {
  id: number;
  email: string;
  username: string;
};

export type LoginResponse = {
  message: string;
  access_token: string;
  user: AuthUser;
};


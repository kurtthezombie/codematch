export type AuthUser = {
  id: number;
  email: string;
  username: string;
  role: string;
};

export type LoginResponse = {
  message: string;
  access_token: string;
  user: AuthUser;
};

export type SignupResponse = {
  message: string;
  user: AuthUser & {
    createdAt: string;
  };
};

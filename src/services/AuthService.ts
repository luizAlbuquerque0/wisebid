import { httpClient } from './httpClient';

interface SignInParams {
  email: string;
  password: string;
}

interface AuthResponse {
  user_id: string;
  access_token: string;
  expires_in: number;
}

export const AuthService = {
  async signIn({ email, password }: SignInParams): Promise<AuthResponse> {
    const { data } = await httpClient.post<AuthResponse>('/auth/signin', {
      email,
      password,
    });

    return data;
  },
};

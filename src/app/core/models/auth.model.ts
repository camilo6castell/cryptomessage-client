export interface UserResponse {
  userId: number;
  username: string;
  createdAt: string;
  publicKey: string;
}

export interface LoginApiResponse {
  token: string;
  encryptedPrivateKey: string;
  user: UserResponse;
}

export interface VerifyApiResponse {
  token: string;
  user: UserResponse;
}

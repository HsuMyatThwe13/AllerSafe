export type UserRole = 'user' | 'admin';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

export type PublicUser = Omit<StoredUser, 'password'>;

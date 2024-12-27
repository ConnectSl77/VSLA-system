export type UserRole = 'admin' | 'manager' | 'staff' | 'member';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}


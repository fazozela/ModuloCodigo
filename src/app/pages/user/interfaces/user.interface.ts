export interface UserResponse {
  users: User[];
}

export interface User {
  id: number;
  fullname: string;
  username: string;
  password: string;
  role: Role;
} 

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'  
}
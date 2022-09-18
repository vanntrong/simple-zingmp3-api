export interface User {
  full_name: string;
  email: string;
  password: string;
  avatar: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface UserResponse {
  full_name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at?: Date;
}

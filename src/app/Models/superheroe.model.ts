export interface UsersData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface CreateUpdateUserRequest {
  name: string;
  job: string;
}

export interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

export interface UpdateUserResponse {
  name: string;
  job: string;
  updatedAt: string;
}

export interface Support {
  url: string;
  text: string;
}

export interface GetUsersResponse {
  data: User[];
  support: Support;
}

import { user } from "./user";


export interface UserResponse {
  user: user;
  exp: number;
  iat: number;
}
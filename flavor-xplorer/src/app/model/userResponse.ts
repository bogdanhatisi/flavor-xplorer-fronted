import { user } from "./user";


export interface UserResponse {
  message: string;
  role : string;
  token: string;
  user_id : number;
  username : string;
}
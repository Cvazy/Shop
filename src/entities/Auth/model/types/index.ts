import { IUser } from "@/entities";

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

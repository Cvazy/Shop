import { IUser } from "@/entities";

export interface IAuthForm {
  email: string;
  password: string;
}

export type AuthFormType = IAuthForm & {
  password_repeat?: string;
};

export interface IAuthResponse {
  access: string;
  user: IUser;
}

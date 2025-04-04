export interface IUser {
  id: number;
  name?: string;
  email: string;
}

export type TypeUserForm = Omit<IUser, "id"> & { password?: string };

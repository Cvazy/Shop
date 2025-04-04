import { axiosWithAuth } from "@/app/api";
import { IUser, TypeUserForm } from "@/entities";

export interface IProfileResponse {
  user: IUser;
}

export const userService = {
  async getProfile(id: string) {
    const response = await axiosWithAuth.get<IProfileResponse>(
      "/user/profile",
      { params: { id } },
    );

    return response.data;
  },

  async update(data: TypeUserForm) {
    const response = await axiosWithAuth.put("/user/profile", data);
    return response.data;
  },
};

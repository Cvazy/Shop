import { IAuthResponse, AuthFormType } from "@/entities";
import { axiosClassic } from "@/app/api";
import { rootStore } from "@/app/providers/StoreProvider";

export const authService = {
  async main(type: "login" | "register", data: AuthFormType) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/${type}/`,
      data,
    );

    if (response.data.access) {
      rootStore.authStore.setAuth(response.data.access);
    }

    return response;
  },

  async getNewTokens() {
    const response = await axiosClassic.post("/auth/login/refresh/");

    if (response.data.access) {
      rootStore.authStore.setAuth(response.data.access);
    }

    return response;
  },

  async logout() {
    const response = await axiosClassic.post("/auth/logout/");

    if (response.data) {
      rootStore.authStore.logout();
    }

    return response;
  },
};

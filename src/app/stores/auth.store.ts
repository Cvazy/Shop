import { makeAutoObservable } from "mobx";
import { getAccessToken, removeFromStorage, saveTokenStorage } from "@/shared";

export class AuthStore {
  isAuth = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== "undefined") {
      this.checkAuth();
    }
  }
  checkAuth = () => {
    this.isAuth = !!getAccessToken();
    this.isLoading = false;
  };

  setAuth = (accessToken: string) => {
    this.isAuth = true;
    saveTokenStorage(accessToken);
  };

  logout = () => {
    removeFromStorage();
    this.isAuth = false;
  };
}

import Cookies from "js-cookie";

export enum EnumTokens {
  ACCESS_TOKEN = "access",
  REFRESH_TOKEN = "refresh",
}

export const getAccessToken = () => {
  if (typeof window === 'undefined') return null;
  
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  if (typeof window === 'undefined') return;
  
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    sameSite: "lax",
    expires: 1,
    path: "/",
  });
};

export const removeFromStorage = () => {
  if (typeof window === 'undefined') return;
  
  Cookies.remove(EnumTokens.ACCESS_TOKEN, {
    path: "/",
  });
};

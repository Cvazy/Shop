"use client";

import { getAccessToken } from "@/shared";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!getAccessToken());
  }, []);

  return isAuth;
};

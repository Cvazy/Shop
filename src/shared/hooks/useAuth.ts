"use client";

import { getAccessToken } from "@/shared";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const updateAuth = () => {
    setIsAuth(!!getAccessToken());
  };

  useEffect(() => {
    updateAuth();

    window.addEventListener("focus", updateAuth);
    return () => window.removeEventListener("focus", updateAuth);
  }, []);

  return { isAuth, updateAuth };
};

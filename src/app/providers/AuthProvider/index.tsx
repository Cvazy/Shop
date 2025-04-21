"use client";

import { useAppDispatch } from "@/app/providers/StoreProviders/hooks";
import { ReactNode, useEffect } from "react";
import { getAccessToken } from "@/shared";
import { authActions } from "@/entities";

export const AuthProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authToken = getAccessToken();
    dispatch(authActions.setAuthData(!!authToken));
  }, []);

  return <>{children}</>;
};

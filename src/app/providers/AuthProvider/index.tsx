"use client";

import { useAppDispatch } from "@/app/providers/StoreProviders/hooks";
import { ReactNode, useEffect, useState } from "react";
import { getAccessToken } from "@/shared";
import { authActions } from "@/entities";

export const AuthProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  
  // Добавляем состояние для отслеживания, выполнен ли первый рендер на клиенте
  const [hasMounted, setHasMounted] = useState(false);

  // Этот эффект гарантирует, что мы не будем обновлять состояние авторизации на сервере
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Выносим проверку авторизации в отдельный эффект
  useEffect(() => {
    // Выполняем только на клиенте после монтирования
    if (!hasMounted) return;
    
    const checkAuthStatus = () => {
      const authToken = getAccessToken();
      if (authToken) {
        dispatch(authActions.setAuthData(true));
      } else {
        dispatch(authActions.setAuthData(false));
      }
      setIsChecked(true);
    };

    // Проверяем при первом рендере на клиенте
    checkAuthStatus();

    // События для обновления статуса авторизации
    const handleFocus = () => {
      checkAuthStatus();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        checkAuthStatus();
      }
    });

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, [dispatch, hasMounted]); // Зависимость от hasMounted!

  // Возвращаем children безусловно - это предотвратит проблемы с гидратацией
  return <>{children}</>;
};

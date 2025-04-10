"use client";

import { LoginButton } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/entities";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProfileMenu.module.css";
import { useStore } from "@/app/providers/StoreProvider";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";

const ClientSideOnly = dynamic(
  () => Promise.resolve(({ children }: any) => children),
  { ssr: false },
);

export const ProfileMenu = observer(() => {
  const { authStore } = useStore();
  const { isAuth, isLoading } = authStore;
  const [isMounted, setIsMounted] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success("Вы успешно вышли из системы!");
      authStore.checkAuth();
    },
  });

  useEffect(() => {
    setIsMounted(true);
    authStore.checkAuth();
  }, [authStore]);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center gap-2 flex-nowrap">
        <div className="w-[48px] h-[48px] rounded-full bg-gray-200 animate-pulse" />
        <div className="w-[100px] h-[48px] rounded bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <ClientSideOnly>
      {isAuth ? (
        <div className={"flex items-center gap-2 flex-nowrap"}>
          <Link href={"/profile"} passHref legacyBehavior>
            <a className="inline-flex">
              <Image
                src={"/icons/profile.svg"}
                alt={"Your Profile"}
                width={48}
                height={48}
                loading="eager"
                draggable={false}
                unoptimized // Отключаем оптимизацию для статичных изображений
              />
            </a>
          </Link>

          <button
            className={`${styles.Btn} hidden lg:flex`}
            onClick={() => mutate()}
            aria-label="Logout"
          >
            <div className={styles.sign}>
              <Image
                src={"/icons/logout.svg"}
                alt={""}
                width={20}
                height={20}
                loading="eager"
                draggable={false}
                unoptimized
              />
            </div>
            <div className={styles.text}>Logout</div>
          </button>
        </div>
      ) : (
        <div className={"hidden lg:block"}>
          <LoginButton />
        </div>
      )}
    </ClientSideOnly>
  );
});

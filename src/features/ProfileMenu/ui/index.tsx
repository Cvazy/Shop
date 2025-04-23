"use client";

import { useMutation } from "@tanstack/react-query";
import { authActions, authService } from "@/entities";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useHasMounted } from "@/shared";

import styles from "./ProfileMenu.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProviders/hooks";

export const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const hasMounted = useHasMounted();

  const { isAuth } = useAppSelector((state) => state.auth);

  const { mutate } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      dispatch(authActions.setAuthData(false));
      toast.success("Вы успешно вышли из системы!");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  if (!hasMounted) {
    return (
      <Link href={"/auth"}>
        <button className={styles.Login}>
          <Image
            width={24}
            height={24}
            src={"/icons/login.svg"}
            alt={"Login"}
            loading={"lazy"}
            draggable={false}
          />
          <span>Login</span>
        </button>
      </Link>
    );
  }

  return (
    <>
      {isAuth ? (
        <div className={"flex items-center gap-2 flex-nowrap"}>
          <Link href={"/profile"}>
            <Image
              src={"/icons/profile.svg"}
              alt={"Your Profile"}
              width={48}
              height={48}
              loading={"lazy"}
              draggable={false}
            />
          </Link>

          <button
            className={`${styles.Btn} hidden lg:flex`}
            onClick={handleLogout}
          >
            <div className={styles.sign}>
              <Image
                src={"/icons/logout.svg"}
                alt={"Logout"}
                width={20}
                height={20}
                loading={"lazy"}
                draggable={false}
              />
            </div>

            <div className={styles.text}>Logout</div>
          </button>
        </div>
      ) : (
        <Link href={"/auth"}>
          <button className={styles.Login}>
            <Image
              width={24}
              height={24}
              src={"/icons/login.svg"}
              alt={"Login"}
              loading={"lazy"}
              draggable={false}
            />

            <span>Login</span>
          </button>
        </Link>
      )}
    </>
  );
};

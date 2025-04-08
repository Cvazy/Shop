import { useAuth } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/entities";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

import styles from "./ProfileMenu.module.css";

export const ProfileMenu = () => {
  const isAuth = useAuth();

  const { mutate } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success("Вы успешно вышли из системы!");
    },
  });

  const handleLogout = () => {
    mutate();
  };

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
        <div></div>
      )}
    </>
  );
};

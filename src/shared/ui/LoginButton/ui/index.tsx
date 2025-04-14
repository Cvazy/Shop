import Image from "next/image";
import styles from "./LoginButton.module.css";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      href={"/auth"}
      aria-label={"User Login Button"}
      className={styles.userProfile}
    >
      <div className={styles.userProfileInner}>
        <Image
          width={28}
          height={28}
          src={"/icons/profile.svg"}
          alt={"Profile Icon"}
          loading={"lazy"}
          draggable={false}
        />

        <p>Log In</p>
      </div>
    </Link>
  );
};

import { AuthForm } from "@/features";
import { Metadata } from "next";
import styles from "./AuthPage.module.css";

export const metadata: Metadata = {
  title: "Auth",
};

const AuthPage = () => {
  return (
    <div className={styles.bg}>
      <div className={"flex justify-center items-center w-full h-full"}>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;

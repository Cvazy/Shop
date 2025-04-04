import { AuthForm } from "@/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = () => {
  return (
    <div className={"w-full h-full"}>
      <div
        className={"flex items-center justify-center flex-grow w-full h-full"}
      >
        <AuthForm isLoginForm={false} />
      </div>
    </div>
  );
};

export default ProfilePage;

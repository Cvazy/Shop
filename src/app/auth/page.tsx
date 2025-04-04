import { AuthForm } from "@/features";
import { Metadata } from "next";
import Dither from "@/components/Dither/Dither";

export const metadata: Metadata = {
  title: "Auth",
};

const AuthPage = () => {
  return (
    <div className={"w-full h-full"}>
      <div className={"absolute indent-0 max-h-dvh h-full w-full"}>
        <Dither />
      </div>

      <div className={"flex justify-center items-center w-full h-full"}>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;

import { AuthForm } from "@/features";
import { Metadata } from "next";
import { Dither } from "@/shared";

export const metadata: Metadata = {
  title: "Auth",
};

const AuthPage = () => {
  return (
    <div className={"w-full h-full"}>
      <div className={"absolute indent-0 max-h-dvh h-full w-full"}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <div className={"flex justify-center items-center w-full h-full"}>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;

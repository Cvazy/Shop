"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { authService, IAuthForm } from "@/entities";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input, Switcher, FuzzyText } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationFn: (data: IAuthForm) =>
      authService.main(isLoginForm ? "login" : "register", data),
    onSuccess: () => {
      toast.success(
        `Вы успешно ${isLoginForm ? "вошли в систему" : "зарегистрировали нового пользователя"}!`,
      );
      reset();
      router.replace("/");
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };

  return (
    <div className={"flex justify-center px-4 w-full"}>
      <div className={"max-w-lg rounded-xl w-full"}>
        <div className={"w-full py-14 px-4 sm:px-6 md:px-9 lg:px-12 xl:px-16"}>
          <div className={"flex flex-col items-center gap-10 w-full md:gap-12"}>
            <FuzzyText baseIntensity={0.2} fontSize={40} hoverIntensity={0.4}>
              {isLoginForm ? "Authorization" : "Registration"}
            </FuzzyText>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={"flex flex-col items-center gap-6 w-full"}
            >
              <Input
                label={"Email"}
                {...register("email", { required: "Email is required" })}
              />

              <Input
                label={"Password"}
                type={"password"}
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <Button text={isLoginForm ? "Login" : "Registration"} />

              <div
                className={
                  "flex justify-center items-center gap-4 relative w-full"
                }
              >
                <p className={"font-retro text-white font-bold text-lg"}>
                  Switch to {isLoginForm ? "Register" : "Login"}
                </p>

                <Switcher
                  initialValue={!isLoginForm}
                  onChange={setIsLoginForm}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

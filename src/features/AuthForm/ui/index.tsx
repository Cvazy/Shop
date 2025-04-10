"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { authService, AuthFormType } from "@/entities";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input, Switcher } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FuzzyText from "@/components/FuzzyText/FuzzyText";
import { useStore } from "@/app/providers/StoreProvider";

export const AuthForm = () => {
  const { authStore } = useStore();

  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AuthFormType>({
    mode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [isLoginForm, reset]);

  const { mutate } = useMutation({
    mutationFn: (data: AuthFormType) =>
      authService.main(isLoginForm ? "login" : "register", data),
    onSuccess: async () => {
      toast.success(
        `Вы успешно ${isLoginForm ? "вошли в систему" : "зарегистрировали нового пользователя"}!`,
      );
      reset();

      authStore.checkAuth();
      router.replace("/");
    },
  });

  const onSubmit: SubmitHandler<AuthFormType> = (data) => {
    mutate(data);
  };

  const errorCount = Object.keys(errors).length;
  const hasErrors = errorCount > 0;

  return (
    <div className={"flex justify-center px-4 w-full"}>
      <div className={"max-w-lg rounded-xl w-full main-p"}>
        <div className={"w-full py-14 px-4 sm:px-6 md:px-9 lg:px-12 xl:px-16"}>
          <div className={"flex flex-col items-center gap-10 w-full md:gap-12"}>
            <FuzzyText baseIntensity={0.2} fontSize={40} hoverIntensity={0.4}>
              {isLoginForm ? "Authorization" : "Registration"}
            </FuzzyText>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={"flex flex-col items-center gap-6 w-full"}
            >
              <div
                className={`flex flex-col ${!hasErrors ? "gap-6" : "gap-10"} w-full`}
              >
                <Input
                  label={"Email"}
                  error={errors.email?.message}
                  {...register("email", { required: "Email is required" })}
                />

                <Input
                  label={"Password"}
                  type={"password"}
                  error={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {!isLoginForm && (
                  <Input
                    label={"Password repeat"}
                    type={"password"}
                    error={errors.password_repeat?.message}
                    {...register("password_repeat", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                )}
              </div>

              <button type={"submit"} className={"w-full"}>
                <Button text={isLoginForm ? "Login" : "Registration"} />
              </button>

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

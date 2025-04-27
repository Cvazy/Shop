import { IHowItsWork } from "@/app/contact";

interface IHowItsWorkElementProps extends Omit<IHowItsWork, "id"> {
  index: number;
}

export const HowItsWorkElement = ({
  index,
  title,
  description,
}: IHowItsWorkElementProps) => {
  return (
    <div className={"flex flex-col items-start gap-4 w-full"}>
      <p
        className={
          "font-proxima text-[15px] leading-6 text-red text-left tracking-[0.25em] uppercase whitespace-nowrap"
        }
      >
        Step {index + 1}
      </p>

      <div className={"flex flex-col items-start gap-2 w-full"}>
        <p className={"text-white !leading-[normal] text-2xl text-left"}>
          {title}
        </p>

        <p
          className={
            "font-fancy text-[15px] leading-6 text-light_gray text-left"
          }
        >
          {description}
        </p>
      </div>
    </div>
  );
};

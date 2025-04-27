import { ReactNode } from "react";

export const BlockWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"block_wrapper"}>
      <div
        className={
          "flex flex-col items-center gap-6 w-full sm:gap-7 md:gap-8 lg:gap-9 xl:gap-10"
        }
      >
        {children}
      </div>
    </div>
  );
};

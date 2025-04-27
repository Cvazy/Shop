import { Metadata } from "next";
import { HowItsWork } from "@/widgets";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <div className={"main-p w-full h-full"}>
      <div
        className={"flex justify-center px-7 w-full sm:px-8 lg:px-10 xl:px-12"}
      >
        <div className={"max-w-limit w-full"}>
          <HowItsWork />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

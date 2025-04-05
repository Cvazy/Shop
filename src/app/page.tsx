import { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import { MainBanner } from "@/widgets";

export const metadata: Metadata = {
  title: "Home | " + SITE_NAME,
};

export default function Home() {
  return (
    <div className={"w-full h-full"}>
      <MainBanner />
    </div>
  );
}

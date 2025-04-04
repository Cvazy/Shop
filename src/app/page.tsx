import { Metadata } from "next";
import { SITE_NAME } from "@/constants";

export const metadata: Metadata = {
  title: "Home | " + SITE_NAME,
};

export default function Home() {
  return (
    <div className={"w-full h-full"}>
      <div className={"w-full h-full bg-gray"}></div>
    </div>
  );
}

import { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import ClientHome from "@/app/clientPage";

// Экспортируем метаданные
export const metadata: Metadata = {
  title: "Home | " + SITE_NAME,
};

export default function Home() {
  return <ClientHome />;
}

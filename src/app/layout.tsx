import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import { Providers } from "@/app/providers";

import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { Header, Footer } from "@/widgets";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: "Alcohol Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>
        <Providers>
          <div
            className={
              "flex flex-col justify-center min-h-dvh w-full h-max relative"
            }
          >
            <Header />

            <div className={"flex flex-grow min-h-dvh w-full"}>
              <main className={"w-full"}>{children}</main>
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

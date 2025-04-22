import type { Metadata, Viewport } from "next";
import { SITE_NAME } from "@/constants";
import { Providers } from "@/app/providers";

import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { Header, Footer } from "@/widgets";

// Оптимизация загрузки шрифтов
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

// Экспорт viewport метаданных отдельно
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Alcohol Shop",
  // Добавление метаданных для улучшения SEO и быстрой загрузки
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        {/* Предзагрузка критических ресурсов */}
        <link 
          rel="preload" 
          as="image" 
          href="/assets/lanyard.png" 
          type="image/png"
        />
      </head>
      <body>
        <Providers>
          <div
            className={
              "flex flex-col justify-center min-h-dvh w-full h-max relative"
            }
          >
            <Header />

            <div className={"flex flex-grow min-h-dvh w-full z-10"}>
              <main className={"w-full"}>{children}</main>
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

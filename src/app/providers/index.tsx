"use client";

import { PropsWithChildren, useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { ClickSparkProvider, Loader } from "@/shared";
import Particles from "@/components/Particles/Particles";

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    // Очищаем предыдущий таймер
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);

  return (
    <QueryClientProvider client={client}>
      <ClickSparkProvider
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className={"absolute inset-0 z-[1]"}>
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className={"bg-black"}
          />
        </div>

        {isLoading && <Loader />}

        {children}
      </ClickSparkProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

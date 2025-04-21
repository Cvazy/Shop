"use client";

import { PropsWithChildren, useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "@/app/providers/StoreProviders/store";
import { ClickSparkProvider, getAccessToken, Loader } from "@/shared";
import Particles from "@/components/Particles/Particles";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { usePathname } from "next/navigation";

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000,
          gcTime: 60 * 60 * 1000,
        },
      },
    }),
  );

  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const initialPath = useRef(pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
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

            {isLoading && initialPath.current === pathname && <Loader />}

            {children}
          </ClickSparkProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

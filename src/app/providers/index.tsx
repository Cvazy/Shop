"use client";

import { PropsWithChildren, Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClickSparkProvider, Loader } from "@/shared";
import SplashCursor from "@/components/SplashCursor/SplashCursor";

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

  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={client}>
        <ClickSparkProvider
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <SplashCursor />

          {children}
        </ClickSparkProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
}

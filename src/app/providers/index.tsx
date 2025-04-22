"use client";

import React, { PropsWithChildren, useEffect, useState, useRef, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/app/providers/StoreProviders/store";
import { getAccessToken, Loader } from "@/shared";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { usePathname } from "next/navigation";

// Используем ленивую загрузку для тяжелых компонентов
const LazyParticles = lazy(() => import("@/components/Particles/Particles"));
const LazyClickSparkProvider = lazy(() => import("@/shared").then(module => ({ default: module.ClickSparkProvider })));

// Используем динамический импорт для ReactQueryDevtools, чтобы загружать его только в dev режиме
const ReactQueryDevtools = process.env.NODE_ENV === 'development' 
  ? lazy(() => import("@tanstack/react-query-devtools").then(module => ({ 
      default: module.ReactQueryDevtools 
    }))) 
  : () => null;

// Простой фолбэк для ленивой загрузки компонентов
const SimpleFallback = () => <div className="absolute inset-0 z-[1] bg-black" />;

export function Providers({ children }: PropsWithChildren) {
  // Создаем и мемоизируем QueryClient для предотвращения ненужных рендеров
  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000,
          gcTime: 60 * 60 * 1000,
          retry: 1,
          // Используем оптимизацию для кэширования
          // cacheTime устарел, используем только gcTime
        },
      },
    });
  }

  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const initialPath = useRef(pathname);
  const [isAppReady, setIsAppReady] = useState(false);

  // Оптимизируем начальную загрузку
  useEffect(() => {
    // Используем requestIdleCallback для загрузки в фоновом режиме, когда браузер не занят
    const useIdleCallback = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(callback);
      } else {
        return setTimeout(callback, 1);
      }
    };

    const cancelIdleCallback = (id: any) => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(id as number);
      } else {
        clearTimeout(id);
      }
    };

    // Основной таймер для загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Используем отложенную загрузку для медленных компонентов
    const idleCallbackId = useIdleCallback(() => {
      setIsAppReady(true);
    });

    return () => {
      clearTimeout(timer);
      cancelIdleCallback(idleCallbackId);
    };
  }, []);

  // Оптимизируем для различных устройств
  const isLowPerformanceDevice = typeof window !== 'undefined' && 
    (window.innerWidth < 768 || 
     ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency <= 4) || 
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  const particleSettings = {
    particleCount: isLowPerformanceDevice ? 80 : 200,
    particleSpread: 10,
    speed: 0.1,
    particleColors: ["#ffffff", "#ffffff"],
    particleBaseSize: isLowPerformanceDevice ? 80 : 100,
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClientRef.current}>
          <Suspense fallback={<SimpleFallback />}>
            {isAppReady && (
              <LazyClickSparkProvider
                sparkColor="#fff"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
                <div className={"absolute inset-0 z-[1]"}>
                  <Suspense fallback={<SimpleFallback />}>
                    <LazyParticles
                      particleColors={particleSettings.particleColors}
                      particleCount={particleSettings.particleCount}
                      particleSpread={particleSettings.particleSpread}
                      speed={particleSettings.speed}
                      particleBaseSize={particleSettings.particleBaseSize}
                      moveParticlesOnHover={true}
                      alphaParticles={false}
                      disableRotation={false}
                      className={"bg-black"}
                    />
                  </Suspense>
                </div>

                {isLoading && initialPath.current === pathname && <Loader />}

                {children}
              </LazyClickSparkProvider>
            )}
            
            {!isAppReady && (
              <>
                <SimpleFallback />
                {children}
              </>
            )}
          </Suspense>

          {process.env.NODE_ENV === 'development' && (
            <Suspense fallback={null}>
              <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
          )}
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

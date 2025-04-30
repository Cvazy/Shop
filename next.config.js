module.exports = {
  reactStrictMode: true,
  // output: "export",
  
  // Оптимизация изображений
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      process.env.NEXT_PUBLIC_SERVER_URL?.replace(/^https?:\/\//, '') || ''
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Оптимизация для современных браузеров
  experimental: {
    // Отключаем оптимизацию CSS, чтобы избежать проблем с critters
    // optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Улучшение кэширования и сборки
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Настройка Edge Runtime
  serverRuntimeConfig: {
    // API маршруты не будут использовать Edge Runtime
  },
  
  // Исключение предупреждений о несовместимых API
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config, { dev, isServer }) => {
    // Настройка загрузки 3D-моделей
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/media",
            outputPath: "static/media",
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });
    
    // Игнорирование предупреждений о Node.js API в Edge Runtime
    if (!isServer) {
      config.ignoreWarnings = [
        { message: /A Node\.js API is used/ },
        { module: /node_modules\/scheduler/ },
        { module: /node_modules\/axios/ }
      ];
    }
    
    // Дополнительные оптимизации для production
    if (!dev && !isServer) {
      // Включение разделения кода для улучшения загрузки
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next|use-sync-external-store)[\\/]/,
            priority: 40,
            enforce: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name(module, chunks) {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight((item) => item);
              return `lib-${moduleFileName.replace(/\.(js|mjs|ts|tsx)$/, '')}`;
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Сжатие HTML и улучшение загрузки страниц
  compress: true,
  productionBrowserSourceMaps: false,
};

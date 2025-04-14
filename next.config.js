module.exports = {
  reactStrictMode: true,
  output: "export",
  webpack: (config) => {
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
    return config;
  },
};

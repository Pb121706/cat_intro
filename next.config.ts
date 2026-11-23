import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 讓同一個 Wi-Fi 的手機／電腦用區網 IP 開啟時，按鈕和彈窗也能正常運作
  allowedDevOrigins: ["192.168.1.118", "192.168.1.139"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

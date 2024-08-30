import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    react(),
    WindiCSS(), // 仅加载使用到的CSS类
    viteCompression({
      algorithm: 'brotliCompress', // Use Brotli for better compression
      ext: '.br', // File extension for Brotli compressed files
      deleteOriginFile: false, // Keep the original uncompressed files
      threshold: 1024, // Compress files larger than 1 KiB
    }),
    viteCompression({
      algorithm: 'gzip', // Also use gzip compression
      ext: '.gz',
      deleteOriginFile: false,
      threshold: 1024,
    }),
    legacy({
      targets: ["defaults", "not IE 11"], // 兼容性配置
    }),
    VitePWA({
      manifest: {
        name: "My App",
        short_name: "App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", // 使用最新的ES特性
    cssCodeSplit: true, // 启用CSS代码拆分
    sourcemap: false, // 生产环境不生成sourcemap
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // 将React库分离到单独的vendor包中
        },
      },
    },
  },
  server: {
    https: false, // 开发环境使用HTTP
    open: true, // 自动打开浏览器
  },
});

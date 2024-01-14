import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import http from "https";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/v1": {
          target: "http://localhost:5000/",
          changeOrigin: true,
        },
        "/api/v2": {
          target: "http://localhost:5117",
          changeOrigin: true,
        },
      },
    },
  };
});

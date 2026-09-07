import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The account API (server/) runs as its own Node process. Proxying /api to it
// keeps the browser on one origin in development, which is what lets the
// session cookie be HttpOnly and SameSite=Lax without any CORS handling.
const apiTarget = process.env.SG_API_URL ?? "http://127.0.0.1:8787";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": { target: apiTarget, changeOrigin: false },
    },
  },
});

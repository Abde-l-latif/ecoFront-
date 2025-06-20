import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  define: {
    // eslint-disable-next-line no-undef
    "process.env": process.env,
  },
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://ecoback-jzym.onrender.com",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});

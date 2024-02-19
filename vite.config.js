import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      port: "https://master--the-other-nuub.netlify.app/",
    },
    plugins: [react()],
  };
});

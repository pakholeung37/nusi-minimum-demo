import path from 'path'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,

    lib: {
      entry: path.resolve(__dirname, 'src/App.tsx'),
      name: 'TMaterialUI',
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "antd",
        "react-router-dom",
        "@terminus/engine-shell",
      ],
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});

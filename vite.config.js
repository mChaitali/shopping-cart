import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: [
      ...configDefaults.exclude,
      "src/**/*.d.js",
      "**/main.jsx",
      "**/*.config.js",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/main.jsx",
        "**/cypress",
        "**/coverage",
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.config.js",
      ],
    },
  },
});

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// এই দুটি import হয়তো দরকার হতে পারে, যদি error থাকে।
// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(),
    // @tailwindcss/vite প্লাগিনটির পরিবর্তে নিচের প্লাগিনটি ব্যবহার করতে পারেন
    // যদি উপরের প্লাগিনটি সমস্যা করে।
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),
  ],
  define: {
    // এই define ব্লকটি আপনার __HMR_CONFIG_NAME__ error-এর সমাধান করবে।
    // এটি ভ্যারিয়েবলটিকে একটি খালি অবজেক্ট হিসেবে ডিফাইন করে,
    // যাতে কোডটি error না দিয়ে সঠিকভাবে রান করতে পারে।
    __HMR_CONFIG_NAME__: '{}',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});



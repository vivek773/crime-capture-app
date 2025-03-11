"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white relative"
      style={{
        backgroundImage: "url('/police-car.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.button
        className="absolute top-6 right-6 p-2 rounded-full bg-white text-black shadow-lg hover:bg-gray-200"
        onClick={() => router.push("/settings")}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      <motion.h1
        className="text-4xl font-bold mb-6 text-green"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Fugitive Capture Game 🚔
      </motion.h1>
      <motion.button
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110"
        onClick={() => router.push("/selection")}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Start Game 🎮
      </motion.button>
    </div>
  );
}

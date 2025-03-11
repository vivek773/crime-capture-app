"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { fetchResult } from "@/services/selectionService";

export default function ResultPage() {
  const [resultData, setResultData] = useState<{
    capturedBy?: string;
    city?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getResult = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchResult();
      setResultData(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getResult();
  }, [getResult]);

  const resultMessage = useMemo(() => {
    if (!resultData) return null;
    return resultData.capturedBy
      ? `Fugitive was captured by ${resultData.capturedBy}`
      : "Fugitive escaped!";
  }, [resultData]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white relative"
      style={{
        backgroundImage: "url('/police-criminal.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-lg p-6 text-center max-w-lg w-full"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Capture Result
        </h1>

        {loading ? (
          <p className="text-xl font-medium text-gray-700">Processing...</p>
        ) : error ? (
          <p className="text-xl font-medium text-red-500">{error}</p>
        ) : (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xl font-medium text-gray-700"
          >
            {resultMessage}
          </motion.p>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 rounded transition"
        >
          Play Again 🔄
        </button>
      </motion.div>
    </div>
  );
}

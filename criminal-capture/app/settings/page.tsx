"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import CitiesCard from "@/components/CitiesCard";
import VehiclesCard from "@/components/VehiclesCard";
import CopsCard from "@/components/CopsCard";

const Settings = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 flex items-center gap-2 text-lg bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Settings ⚙️</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[CitiesCard, VehiclesCard, CopsCard].map((Card, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
};

export default Settings;

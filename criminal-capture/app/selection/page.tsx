"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import CitySelector from "@/components/CitySelector";
import VehicleSelector from "@/components/VehicleSelector";
import { Cop, SelectionState } from "@/types";
import { getCops } from "@/services/copService";
import { submitSelections } from "@/services/selectionService";

export default function SelectionPage() {
  const router = useRouter();
  const [selections, setSelections] = useState<SelectionState>({});
  const [cops, setCops] = useState<Cop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCops = useCallback(async () => {
    try {
      const data = await getCops();
      setCops(data);

      const initialSelections: SelectionState = data.reduce(
        (acc: any, cop: any) => {
          acc[cop.name] = {
            city: "",
            cityId: null,
            vehicle: "",
            vehicleId: null,
          };
          return acc;
        },
        {} as SelectionState
      );

      setSelections(initialSelections);
    } catch (error) {
      console.error("Error fetching cops:", error);
      setError("Failed to fetch cops data");
    }
  }, []);

  useEffect(() => {
    fetchCops();
  }, [fetchCops]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const formattedPayload = {
        cops: Object.entries(selections).map(([key, value]) => ({
          name: key,
          city_id: value?.cityId,
          vehicle_id: value?.vehicleId,
        })),
      };
      const resultsPayload = {
        cops: Object.entries(selections).map(([key, value]) => ({
          name: key,
          cityId: value?.cityId,
        })),
      };
      await submitSelections(formattedPayload, resultsPayload);

      router.push("/results");
    } catch (error: any) {
      console.log(error);
      setError("Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  const copSelectionUI = useMemo(
    () =>
      cops.map((cop) => (
        <div key={cop.id} className="mb-6 p-4 bg-gray-50 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {cop.name} (COP)
          </h2>

          <CitySelector
            selectedCity={selections[cop.name]?.city || ""}
            onSelect={(city, cityId) =>
              setSelections((prev) => ({
                ...prev,
                [cop.name]: { ...prev[cop.name], city, cityId },
              }))
            }
          />

          <VehicleSelector
            selectedVehicle={selections[cop.name]?.vehicle || ""}
            onSelect={(vehicle, vehicleId) =>
              setSelections((prev) => ({
                ...prev,
                [cop.name]: { ...prev[cop.name], vehicle, vehicleId },
              }))
            }
          />
        </div>
      )),
    [cops, selections]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white relative">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-5 left-5 flex items-center gap-2 text-lg bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Select City & Vehicle
        </h1>

        <div className="max-h-[calc(100vh-300px)] overflow-y-auto p-2">
          {copSelectionUI}
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-600 text-white text-lg font-medium py-3 rounded-lg shadow-md transition hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Choices"}
        </button>
      </div>
    </div>
  );
}

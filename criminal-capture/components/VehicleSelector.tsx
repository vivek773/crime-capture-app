// Vehicle Card
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import { Vehicle } from "@/types";

export default function VehicleSelector({
  selectedVehicle,
  onSelect,
}: {
  selectedVehicle: string;
  onSelect: (vehicle: string, vehicleId: number) => void;
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/vehicles");
        setVehicles(response?.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load vehicles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="mt-3">
      <label className="block text-gray-600 font-medium mb-1">Select Vehicle:</label>

      {loading ? (
        <p className="text-gray-500">Loading vehicles...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          value={selectedVehicle}
          onChange={(e) => {
            const selectedOption = vehicles?.find((vehicle) => vehicle?.type === e?.target?.value);
            if (selectedOption) {
              onSelect(selectedOption?.type, selectedOption?.id);
            }
          }}
          className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Choose a vehicle</option>
          {vehicles?.map((vehicle) => (
            <option key={vehicle?.id} value={vehicle?.type}>
              {vehicle?.type} (Range: {vehicle.range} KM)
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

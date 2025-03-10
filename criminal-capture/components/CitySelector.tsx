"use client";
import { useState, useEffect, useCallback } from "react";
import { getCities } from "@/services/cityService";
import { City, CitySelectorProps } from "@/types";

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onSelect }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCities();
      setCities(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load cities. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <div className="mt-2">
      <label className="block text-gray-600 font-medium mb-1">Select City:</label>

      {loading ? (
        <p className="text-gray-500">Loading cities...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          value={selectedCity}
          onChange={(e) => {
            const selectedOption = cities.find(city => city.name === e.target.value);
            if (selectedOption) {
              onSelect(selectedOption.name, selectedOption.id);
            }
          }}
          className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Choose a city</option>
          {cities.map(({ id, name, distance }) => (
            <option key={id} value={name}>
              {name} ({distance} KM)
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CitySelector;

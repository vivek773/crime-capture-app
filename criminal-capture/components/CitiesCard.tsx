// Cities Card
"use client";
import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import { Pencil, Trash, Plus, X } from "lucide-react";

import { City } from "@/types";
import { getCities, addCity, updateCity, deleteCity } from "@/services/cityService";

export default function CitiesCard() {
  const [cities, setCities] = useState<City[]>([]);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({ name: "", distance: "" });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = useCallback(async () => {
    try {
      const data = await getCities();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, []);

  const openModal = (type: "add" | "edit" | "delete", city?: City) => {
    setSelectedCity(city || null);
    setFormData({
      name: city?.name || "",
      distance: city?.distance?.toString() || "",
    });
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCity(null);
    setFormData({ name: "", distance: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e?.target?.value }));
  };

  const handleSubmit = async () => {
    if (!formData?.name?.trim() || !formData?.distance?.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (modalType === "add") {
        const newCity = await addCity({
          name: formData?.name,
          distance: parseInt(formData?.distance),
        });
        setCities([...cities, newCity]);
      } else if (modalType === "edit" && selectedCity) {
        const updatedCity = await updateCity(selectedCity?.id, {
          name: formData?.name,
          distance: parseInt(formData?.distance),
        });
        setCities(cities.map((city) => (city.id === selectedCity?.id ? updatedCity : city)));
      }
      closeModal();
    } catch (error) {
      console.error(`Error ${modalType} city:`, error);
    }
  };

  const handleDelete = async () => {
    if (!selectedCity) return;
    try {
      await deleteCity(selectedCity?.id);
      setCities(cities.filter((city) => city.id !== selectedCity?.id));
      closeModal();
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Cities</h2>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
        >
          <Plus size={20} />
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-gray-500 font-semibold text-lg">
            <th className="py-2 text-left">City Name</th>
            <th className="py-2 text-left">Distance</th>
            <th className="py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {cities?.length > 0 ? (
            cities?.map((city) => (
              <tr key={city.id} className="border-b border-gray-200">
                <td className="py-3 text-gray-700 text-lg">{city.name}</td>
                <td className="py-3 text-gray-700 text-lg">{city.distance} km</td>
                <td className="py-3 flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal("edit", city)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openModal("delete", city)}
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-4 text-lg">
                No cities available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Reusable Modal */}
      <Modal
        isOpen={!!modalType}
        ariaHideApp={false}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto relative"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={closeModal}>
          <X size={24} />
        </button>

        {modalType === "delete" ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-700 text-center mb-4">
              Are you sure you want to delete <strong>{selectedCity?.name}</strong>?
            </p>
            <button
              onClick={handleDelete}
              className="w-full bg-red-500 text-white p-2 rounded-lg mt-4 hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              {modalType === "add" ? "Add City" : "Edit City"}
            </h2>

            <label className="block text-gray-700 text-sm font-semibold mb-1">
              City Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter city name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 mb-3"
            />

            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Distance (km):
            </label>
            <input
              type="number"
              name="distance"
              placeholder="Enter distance"
              value={formData.distance}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2"
            />

            <button
              onClick={handleSubmit}
              className={`w-full ${
                modalType === "add" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
              } text-white p-2 rounded-lg mt-4 transition`}
            >
              {modalType === "add" ? "Submit" : "Update"}
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

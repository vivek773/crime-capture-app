/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { Pencil, Trash, Plus, X } from "lucide-react";
import { Vehicle } from "@/types";
import {
  addVehicle,
  deleteVehicle,
  getVehicles,
  updateVehicle,
} from "@/services/vehicleService";

export default function VehiclesCard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    type: "",
    range: "",
    count: "",
  });
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [vehicleToDelete, setCopToDelete] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = useCallback(async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, []);

  const handleAddVehicle = async () => {
    if (!newVehicle.type.trim() || !newVehicle.range || !newVehicle.count)
      return;
    const vehicleData = {
      type: newVehicle?.type,
      range: Number(newVehicle?.range),
      count: Number(newVehicle?.count),
    };
    try {
      await addVehicle(vehicleData);
      fetchVehicles();
      setNewVehicle({ type: "", range: "", count: "" });
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  // Function to handle opening the edit modal
  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle({
      type: vehicle?.type,
      range: vehicle?.range?.toString(),
      count: vehicle?.count?.toString(),
    });
    setEditModalIsOpen(true);
  };

  const handleUpdateVehicle = async () => {
    if (!editingVehicle) return;
    const updatedVehicleData = {
      type: newVehicle?.type,
      range: Number(newVehicle?.range),
      count: Number(newVehicle?.count),
    };
    try {
      await updateVehicle(editingVehicle.id, updatedVehicleData);
      fetchVehicles();
      setEditModalIsOpen(false);
      setEditingVehicle(null);
      setNewVehicle({ type: "", range: "", count: "" });
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  const openDeleteModal = (vehicle: Vehicle) => {
    setCopToDelete(vehicle);
    setDeleteModalIsOpen(true);
  };

  const handleDeleteVehicle = async () => {
    if (!vehicleToDelete) return;
    try {
      await deleteVehicle(vehicleToDelete.id);
      setVehicles(vehicles.filter((v) => v.id !== vehicleToDelete.id));
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Vehicles</h2>
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
        >
          <Plus size={20} />
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-gray-500 font-semibold text-lg">
            <th className="py-2 text-left">Vehicle Name</th>
            <th className="py-2 text-left">Range</th>
            <th className="py-2 text-left">Count</th>
            <th className="py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.length > 0 ? (
            vehicles?.map((vehicle) => (
              <tr key={vehicle?.id} className="border-b border-gray-200">
                <td className="py-3 text-gray-700 text-lg">{vehicle?.type}</td>
                <td className="py-3 text-gray-700 text-lg">
                  {vehicle?.range} km
                </td>
                <td className="py-3 text-gray-700 text-lg text-center">
                  {vehicle?.count}
                </td>
                <td className="py-3 flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openEditModal(vehicle)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openDeleteModal(vehicle)}
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center text-gray-500 py-4 text-lg"
              >
                No vehicles available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Vehicle"
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
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setModalIsOpen(false)}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add Vehicle
        </h2>

        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Vehicle Name:
        </label>
        <input
          type="text"
          placeholder="Enter vehicle name"
          value={newVehicle?.type}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, type: e?.target?.value })
          }
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />

        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Range (km):
        </label>
        <input
          type="number"
          placeholder="Enter range"
          value={newVehicle?.range}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, range: e?.target?.value })
          }
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />

        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Count:
        </label>
        <input
          type="number"
          placeholder="Enter count"
          value={newVehicle?.count}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, count: e?.target?.value })
          }
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
        <button
          onClick={handleAddVehicle}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </Modal>

      {/* Edit Vehicle Modal Modal */}
      <Modal
        isOpen={editModalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setEditModalIsOpen(false)}
        contentLabel="Edit Vehicle"
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
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setEditModalIsOpen(false)}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Edit Vehicle
        </h2>

        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Vehicle Name:
        </label>
        <input
          type="text"
          value={newVehicle?.type}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, type: e?.target?.value })
          }
          className="w-full p-2 border rounded-lg focus:ring-2 mb-3"
        />

        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Range (km):
        </label>
        <input
          type="number"
          value={newVehicle?.range}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, range: e?.target?.value })
          }
          className="w-full p-2 border rounded-lg focus:ring-2 mb-3"
        />

        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Count:
        </label>
        <input
          type="number"
          value={newVehicle?.count}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, count: e?.target?.value })
          }
          className="w-full p-2 border rounded-lg focus:ring-2"
        />

        <button
          onClick={handleUpdateVehicle}
          className="w-full bg-green-500 text-white p-2 rounded-lg mt-4 hover:bg-green-600 transition"
        >
          Update
        </button>
      </Modal>

      {/* DELETE Vehicle Modal */}
      <Modal
        isOpen={deleteModalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-700 text-center mb-4">
          Are you sure you want to delete{" "}
          <strong>{vehicleToDelete?.type}</strong>?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteModalIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteVehicle}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Confirm Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

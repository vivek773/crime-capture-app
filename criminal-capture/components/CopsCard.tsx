"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import { Cop } from "@/types";
import { getCops, addCop, updateCop, deleteCop } from "@/services/copService";
import ModalComponent from "./common/ModalComponent";

export default function CopsCard() {
  const [cops, setCops] = useState<Cop[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCop, setNewCop] = useState("");
  const [editingCop, setEditingCop] = useState<Cop | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [copToDelete, setCopToDelete] = useState<Cop | null>(null);

  useEffect(() => {
    fetchCops();
  }, []);

  const fetchCops = async () => {
    try {
      const response = await getCops();
      setCops(response);
    } catch (error) {
      console.error("Error fetching cops:", error);
    }
  };

  const handleAddCop = async () => {
    if (!newCop.trim()) return;
    try {
      const addedCop = await addCop({ name: newCop });
      setCops([...cops, addedCop]);
      setNewCop("");
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error adding cop:", error);
    }
  };

  const openEditModal = (cop: Cop) => {
    setEditingCop(cop);
    setNewCop(cop.name);
    setEditModalIsOpen(true);
  };

  const handleUpdateCop = async () => {
    if (!editingCop) return;
    try {
      const updatedCop = await updateCop(editingCop.id, { name: newCop });
      setCops(cops.map((cop) => (cop.id === editingCop.id ? updatedCop : cop)));
      setEditModalIsOpen(false);
      setEditingCop(null);
      setNewCop("");
    } catch (error) {
      console.error("Error updating cop:", error);
    }
  };

  const openDeleteModal = (cop: Cop) => {
    setCopToDelete(cop);
    setDeleteModalIsOpen(true);
  };

  const handleDeleteCop = async () => {
    if (!copToDelete) return;
    try {
      await deleteCop(copToDelete.id);
      setCops(cops.filter((cop) => cop.id !== copToDelete.id));
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error("Error deleting cop:", error);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Cops</h2>
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
            <th className="py-2 text-left">Officer Name</th>
            <th className="py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {cops.length > 0 ? (
            cops.map((cop) => (
              <tr key={cop.id} className="border-b border-gray-200">
                <td className="py-3 text-gray-700 text-lg">{cop.name}</td>
                <td className="py-3 flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openEditModal(cop)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openDeleteModal(cop)}
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className="text-center text-gray-500 py-4 text-lg"
              >
                No cops available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Cop Modal */}
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        title="Add Cop"
      >
        <input
          type="text"
          placeholder="Enter cop name"
          value={newCop}
          onChange={(e) => setNewCop(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
        <button
          onClick={handleAddCop}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </ModalComponent>

      {/* Edit Cop Modal */}
      <ModalComponent
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        title="Edit Cop"
      >
        <input
          type="text"
          value={newCop}
          onChange={(e) => setNewCop(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 mb-3"
        />
        <button
          onClick={handleUpdateCop}
          className="w-full bg-green-500 text-white p-2 rounded-lg mt-4 hover:bg-green-600 transition"
        >
          Update
        </button>
      </ModalComponent>

      {/* Delete Cop Modal */}
      <ModalComponent
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        title="Confirm Delete"
      >
        <p className="text-gray-700 text-center mb-4">
          Are you sure you want to delete <strong>{copToDelete?.name}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => setDeleteModalIsOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleDeleteCop} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Confirm Delete
          </button>
        </div>
      </ModalComponent>
    </div>
  );
}

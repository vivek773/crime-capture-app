import Modal from "react-modal";
import { X } from "lucide-react";
import { ModalComponentProps } from "@/types";

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  title,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
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
        onClick={onRequestClose}
      >
        <X size={24} />
      </button>
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
        {title}
      </h2>
      {children}
    </Modal>
  );
};

export default ModalComponent;

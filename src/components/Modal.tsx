type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, onSubmit, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hover:shadow-lg">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        {children}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import { toast } from "react-toastify";

interface EditTitleModalProps {
  showModal: boolean;
  modalTitleValue: string;
  setModalTitleValue: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
  message: string;
}

const TitleOrFileUpdateModal: React.FC<EditTitleModalProps> = ({
  showModal,
  modalTitleValue,
  setModalTitleValue,
  onSave,
  onClose,
  message,
}) => {
  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitleValue.trim()) {
      toast.warning("Field is required.");
      return;
    }
    onSave();
  };

  return (
    <div className="modal-overlays">
      <div className="modal-contents" style={{ position: "relative" }}>
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <label className="pb-2 font_25">{message}:</label>
          <textarea
            className="form-control mb-3"
            rows={3}
            value={modalTitleValue}
            onChange={(e) => setModalTitleValue(e.target.value)}
            required
          />
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              className="btn btn-success"
              style={{
                backgroundColor: "rgb(250, 122, 78)",
                color: "white",
                border: "none",
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TitleOrFileUpdateModal;

import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  modalId?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  modalId = "deleteSchedule",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      id={modalId}
      tabIndex={-1}
      aria-labelledby="deleteScheduleLabel"
      aria-hidden="true"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body schedule_box text-center">
            <p className="font_16 mb-1">
              Are you sure you want to delete this item?
            </p>
            <p className="font_16">This action cannot be undone.</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btn primary_btn ok_btn"
                onClick={onConfirm}
              >
                Yes
              </button>
              <button
                className="btn secondary_btn ok_btn"
                onClick={onCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

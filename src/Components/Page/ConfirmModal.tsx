import React from "react";

interface ConformModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  onClose: () => void;
  onCancel?: () => void;
}

const ConformModal: React.FC<ConformModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay ">
      <div className="custom-modal-content">
        <div className="schedule_box">
          <p className="font_16 mb-1">{title}</p>
          {message && <p className="font_25 mb-1">{message}</p>}

          <div className="modal-actions">
            <button className="btn primary_btn ok_btn" onClick={onClose}>
              Ok
            </button>
            <button className="btn secondary_btn ok_Cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformModal;

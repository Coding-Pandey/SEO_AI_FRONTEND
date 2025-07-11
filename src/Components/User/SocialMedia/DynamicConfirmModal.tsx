import React from "react";

interface DynamicModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  dateText?: string;
  onClose: () => void;
}

const DynamicConfirmModal: React.FC<DynamicModalProps> = ({
  isOpen,
  title,
  message,
  dateText,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="schedule_box">
          <p className="font_16 mb-1">{title}</p>
          {message && <p className="font_14 mb-1">{message}</p>}
          {dateText && <p className="font_14 text_blue">{dateText}</p>}
          <button className="btn primary_btn ok_btn" onClick={onClose}>
             Ok
          </button>
        </div>
      </div>
    </div>
  );
};

 
export default DynamicConfirmModal

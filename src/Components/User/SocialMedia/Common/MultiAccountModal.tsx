import React, { useState } from "react";
import { linkedInOptions } from "../../Setting/IntegrationsTab";

interface DynamicModalProps {
  title: string;
  platform: string;
  isOpen: boolean;
  selectedLinkedIn: string;
  setSelectedLinkedIn: (val: string) => void;
  onSubmit: () => void;
  handleCancel: () => void;
}

const MultiAccountModal: React.FC<DynamicModalProps> = ({
  title,
  platform,
  isOpen,
  selectedLinkedIn,
  setSelectedLinkedIn,
  onSubmit,
  handleCancel,
}) => {
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (platform === "linkedin" && !selectedLinkedIn) {
      setError("Please select a LinkedIn account");
      return;
    }
    setError("");
    onSubmit();
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLinkedIn(e.target.value);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{ marginBottom: 20 }}>{title}</h3>

        <div>
          <select
            value={selectedLinkedIn}
            onChange={handleSelectionChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          >
            <option value="">-- Select an account --</option>
            {linkedInOptions.map((option) => (
              <option key={option.category} value={option.category}>
                {option.name}
              </option>
            ))}
          </select>
          {error && (
            <div style={{ color: "red", marginTop: 8, fontSize: 14 }}>
              {error}
            </div>
          )}
        </div>

        <div className="modal-buttons">
          <button className="btn primary_btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn secondary_btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiAccountModal;

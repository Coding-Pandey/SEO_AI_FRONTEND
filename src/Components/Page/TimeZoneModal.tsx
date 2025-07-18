import React from "react";
import TimezoneSelect from "react-timezone-select";

interface TimeZoneModalProps {
  message: string;
  showModal: boolean;
  selectedTimezone: any;
  setSelectedTimezone: (tz: any) => void;
  onSave: (timezone: string) => void;
  onClose: () => void;
}

const TimeZoneModal: React.FC<TimeZoneModalProps> = ({
  message,
  showModal,
  selectedTimezone,
  setSelectedTimezone,
  onSave,
  onClose,
}) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlays" style={styles.overlay}>
      <div className="modal-contents" style={styles.modal}>
        <h3>Select Your Timezone</h3>
        <div style={{ marginTop: 20 }}>
          <label style={{ marginBottom: "10px", display: "block" }}>
            Select Timezone:
          </label>
          <TimezoneSelect
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />
        </div>
        <div style={styles.actions}>
          <button
            className="primary_btn"
            onClick={() => onSave(selectedTimezone)}
          >
            Save
          </button>
          {message !== "dashboard" ? (
            <button
              className="secondary_btn"
              style={{ marginLeft: "10px" }}
              onClick={onClose}
            >
              Cancel
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeZoneModal;

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    maxWidth: "90%",
  },
  actions: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
  },
};

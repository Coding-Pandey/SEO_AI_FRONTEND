import React from "react";

interface FileNameUpdateModalProps {
  content: string;
  setContent: (value: string) => void;
  handleClose: () => void;
  handleSave: () => void;
}

const FileNameUpdateModal: React.FC<FileNameUpdateModalProps> = ({
  content,
  setContent,
  handleClose,
  handleSave,
}) => {
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
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h4>Update File Name</h4>

        <textarea
          className="form-control mb-3"
          placeholder="Enter filename"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="btn btn-success"
            style={{
              backgroundColor: "rgb(250, 122, 78)",
              color: "white",
              border: "none",
            }}
            onClick={handleSave}
          >
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileNameUpdateModal;

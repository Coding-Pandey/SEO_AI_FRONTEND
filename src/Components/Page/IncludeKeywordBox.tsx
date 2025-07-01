import React from "react";

interface IncludeKeywordBoxProps {
  show: boolean;
  includeKeywords: string[];
  includeInput: string;
  setIncludeInput: (value: string) => void;
  handleIncludeKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeIncludeKeyword: (index: number) => void;
  handleSaveIncludeKeywords: () => void;
}

const IncludeKeywordBox: React.FC<IncludeKeywordBoxProps> = ({
  show,
  includeKeywords,
  includeInput,
  setIncludeInput,
  handleIncludeKeyDown,
  removeIncludeKeyword,
  handleSaveIncludeKeywords,
}) => {
  if (!show) return null;

  return (
    <div className="brand_content_box">
      <div className="box_wrapper">
        <label>contains:</label>
        <div className="brand_tag_wrapper">
          {includeKeywords.map((tag, index) => (
            <div key={index} className="brang_tag">
              {tag}
              <span
                onClick={() => removeIncludeKeyword(index)}
                style={{
                  marginLeft: "6px",
                  cursor: "pointer",
                  color: "#007bff",
                  fontWeight: "bold",
                }}
              >
                ×
              </span>
            </div>
          ))}

          <input
            type="text"
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            onKeyDown={handleIncludeKeyDown}
            placeholder="Type include and press Enter or Comma"
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              minWidth: "120px",
              padding: "4px",
              fontSize: "14px",
              background: "transparent",
            }}
          />
        </div>
      </div>
      <button
        onClick={handleSaveIncludeKeywords}
        style={{
          marginLeft: "10px",
          padding: "8px 14px",
          backgroundColor: "#fff",
          border: "1px solid #007bff",
          color: "#007bff",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          height: "40px",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default IncludeKeywordBox;

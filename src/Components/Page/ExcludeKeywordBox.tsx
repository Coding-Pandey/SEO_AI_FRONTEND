import React from "react";

interface ExcludeKeywordBoxProps {
  show: boolean;
  excludeKeywords: string[];
  excludeInput: string;
  setExcludeInput: (value: string) => void;
  handleExcludeKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeExcludeKeyword: (index: number) => void;
  handleSaveExcludeKeywords: () => void;
}

const ExcludeKeywordBox: React.FC<ExcludeKeywordBoxProps> = ({
  show,
  excludeKeywords,
  excludeInput,
  setExcludeInput,
  handleExcludeKeyDown,
  removeExcludeKeyword,
  handleSaveExcludeKeywords,
}) => {
  if (!show) return null;

  return (
    <div className="brand_content_box">
      <div className="box_wrapper">
        <label>contains:</label>
        <div className="brand_tag_wrapper">
          {excludeKeywords.map((tag, index) => (
            <div key={index} className="brang_tag">
              {tag}
              <span
                onClick={() => removeExcludeKeyword(index)}
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
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyDown={handleExcludeKeyDown}
            placeholder="Type Exclude and press Enter or Comma"
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
        onClick={handleSaveExcludeKeywords}
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

export default ExcludeKeywordBox;

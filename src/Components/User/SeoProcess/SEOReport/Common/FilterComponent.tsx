import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";

interface FilterProps {
  FilterData: any;
  selectedSearchType: string;
  setSelectedSearchType: (value: string) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedDeviceType: string;
  setSelectedDeviceType: (value: string) => void;
  range: any;
  setRange: (value: any) => void;
  showCalendar: boolean;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  today: Date;
   brandTags: string[];
  onSaveBrandTags: (tags: string[]) => void;
  activeTab: string;
  minDate: Date;
}

const FilterComponent: React.FC<FilterProps> = ({
  FilterData,
  selectedSearchType,
  setSelectedSearchType,
  selectedCountry,
  setSelectedCountry,
  selectedDeviceType,
  setSelectedDeviceType,
  range,
  setRange,
  showCalendar,
  setShowCalendar,
  today,
  brandTags,
  onSaveBrandTags,
  activeTab,
  minDate,
}) => {
  const [tempRange, setTempRange] = useState<any>(range);
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>(brandTags);
  const [inputValue, setInputValue] = useState("");

   useEffect(() => {
    setTags(brandTags);
  }, [brandTags]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    // onSaveBrandTags(updatedTags);
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    // If there's unprocessed input, add it first
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }

    // Final list to save (including pending input)
    const finalTags = [...tags];
    console.log(finalTags, "finalTagsfinalTags");
    if (trimmed && !tags.includes(trimmed)) {
      finalTags.push(trimmed);
    }

    // if (finalTags.length === 0) {
    //   alert("Please add at least one brand term before saving.");
    //   return;
    // }
    onSaveBrandTags(finalTags);
    // setTags([]);
    setShowInputBox(false);
    setInputValue("");
  };

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setTempRange([
      {
        startDate,
        endDate,
        key: "selection",
      },
    ]);
  };

  const handleApply = () => {
    setRange(tempRange);
    setShowCalendar(false);
  };

  const handleCancel = () => {
    setTempRange(range);
    setShowCalendar(false);
  };
  // console.log(FilterData,"FilterData")

  return (
    <ul className="oraganic_report_filter list-unstyled">
      <li>
        <div className="form_input">
          <select
            className="form-select"
            value={selectedSearchType}
            onChange={(e) => setSelectedSearchType(e.target.value)}
          >
            <option value="web">Search type: {selectedSearchType}</option>
            {/* {FilterData?.search_types?.[0]?.map((type: string, idx: number) => (*/}
            {FilterData?.search_types?.map((type: string, idx: number) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </li>
      <li>
        <div className="form_input">
          <select
            className="form-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="USA">Country: {selectedCountry}</option>
            {FilterData.countries?.map((country: any, idx: number) => (
              <option key={idx} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </li>
      <li>
        <div className="form_input">
          <select
            className="form-select"
            value={selectedDeviceType}
            onChange={(e) => setSelectedDeviceType(e.target.value)}
          >
            <option value="mobile">Device type: {selectedDeviceType}</option>
            {FilterData.device_types?.map((device: string, idx: number) => (
              <option key={idx} value={device}>
                {device}
              </option>
            ))}
          </select>
        </div>
      </li>
      <li className="date_selector">
        <div
          className="form_input"
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <div className="form-control">
            Date Range:
            <span className="ms-1">
              {range[0].startDate?.toLocaleDateString()} -{" "}
              {range[0].endDate?.toLocaleDateString()}
            </span>
          </div>
        </div>

        {showCalendar && (
          <div className="calendar_box">
            <DateRange
              ranges={tempRange}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              minDate={minDate}
              maxDate={today}
              showDateDisplay={false}
              showMonthAndYearPickers={true}
              rangeColors={["#1E88E5"]}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                marginTop: 5,
                padding: "0 10px",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  border: "1px solid #1E88E5",
                  color: "#1E88E5",
                  backgroundColor: "transparent",
                }}
                className="btn"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="btn"
                style={{
                  border: "1px solid #1E88E5",
                  color: "#1E88E5",
                  backgroundColor: "transparent",
                  cursor:
                    tempRange[0].startDate.toDateString() ===
                    tempRange[0].endDate.toDateString()
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    tempRange[0].startDate.toDateString() ===
                    tempRange[0].endDate.toDateString()
                      ? 0.6
                      : 1,
                }}
                disabled={
                  tempRange[0].startDate.toDateString() ===
                  tempRange[0].endDate.toDateString()
                }
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </li>
      {activeTab === "brand" && (
        <li className="brand_select">
          <div
            className="form_input"
            onClick={() => setShowInputBox((prev) => !prev)}
          >
            <div className="form-control">
              Brand terms{" "}
              <span>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          {showInputBox && (
            <div className="brand_content_box">
              <div className="box_wrapper">
                <label>contains:</label>
                <div className="brand_tag_wrapper">
                  {tags.map((tag, index) => (
                    <div key={index} className="brang_tag">
                      {tag}
                      <span
                        onClick={() => handleRemoveTag(index)}
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
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type and press Enter Or Camma"
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
                onClick={handleSave}
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
          )}
        </li>
      )}
    </ul>
  );
};

export default FilterComponent;

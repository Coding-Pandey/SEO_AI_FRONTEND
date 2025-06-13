import React, { useState } from "react";
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
  threeMonthsAgo: Date;
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
  threeMonthsAgo,
}) => {
  const [tempRange, setTempRange] = useState<any>(range);

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
            {FilterData.search_types?.[0]?.map((type: string, idx: number) => (
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
      <li >
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
              minDate={threeMonthsAgo}
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
      {/* <li className="brand_terms">
        <div className="form_input">
          <select
            className="form-select"
            // value={selectedDeviceType}
            // onChange={(e) => setSelectedDeviceType(e.target.value)}
          >
            <option value="mobile">Brand terms</option>
            
          </select>
        </div>
      </li> */}
    </ul>
  );
};

export default FilterComponent;

 
import React from "react";
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
  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setRange([
      {
        startDate,
        endDate,
        key: "selection",
      },
    ]);
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
            <option value="UK">Country: {selectedCountry}</option>
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
      <li>
        <div
          className="form_input"
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            cursor: "pointer",
            background: "#fff",
            minWidth: "200px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <strong>Date Range:</strong>
          <span>
            {range[0].startDate?.toLocaleDateString()} -{" "}
            {range[0].endDate?.toLocaleDateString()}
          </span>
          {showCalendar && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCalendar(false);
              }}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "16px",
                cursor: "pointer",
                marginLeft: "15px",
              }}
              title="Close Calendar"
            >
              ❌
            </button>
          )}
        </div>

        {showCalendar && (
          <div
            style={{
              position: "relative",
              zIndex: 10,
            }}
          >
            <DateRange
              ranges={range}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              minDate={threeMonthsAgo}
              maxDate={today}
              showDateDisplay={false}
              showMonthAndYearPickers={true}
              rangeColors={["rgb(250, 122, 78)"]}
            />
          </div>
        )}
      </li>
    </ul>
  );
};

export default FilterComponent;

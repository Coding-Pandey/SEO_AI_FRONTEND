import React from 'react';
import { MetricType } from '../charts/RankingAreaChart';
 

interface ChartFilterProps {
  selectedMetric: MetricType;
  setSelectedMetric: React.Dispatch<React.SetStateAction<any>>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChartFilter: React.FC<ChartFilterProps> = ({
  selectedMetric,
  setSelectedMetric,
  showDropdown,
  setShowDropdown,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 8,
        right: 12,
        zIndex: 3,
        cursor: 'pointer',
      }}
    >
      <i
        className="bi bi-filter"
        style={{ fontSize: 20 }}
        onClick={() => setShowDropdown((prev) => !prev)}
      />
      {showDropdown && (
        <div
          style={{
            marginTop: 4,
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 4,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            padding: 8,
            position: 'absolute',
            right: 0,
            width: 140,
          }}
        >
          {(['clicks', 'impressions', 'ctr', 'position'] as MetricType[]).map((key) => (
            <label
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 6,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={selectedMetric === key}
                onChange={() => {
                  setSelectedMetric(key);
                  setShowDropdown(false);
                }}
                style={{ marginRight: 6 }}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartFilter;

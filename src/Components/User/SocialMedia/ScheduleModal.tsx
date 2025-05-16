import React, { useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isBefore,
  startOfDay,
} from "date-fns";

interface ScheduleModalProps {
  show: boolean;
  onClose: () => void;
  onSchedule: (date: string) => void;
}

const suggestedTimes = ["07:47", "10:36", "13:19", "15:18", "18:03"];

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  show,
  onClose,
  onSchedule,
}) => {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  //   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  if (!show) return null;

  const renderHeader = () => {
    return (
      <div className="calendar_header">
        <div className="month_name">{format(currentMonth, "MMMM yyyy")}</div>
        <div className="calendar_icons">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "eee"; // Mon, Tue, Wed

    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 }); // Monday start

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div style={{ display: "flex", marginBottom: 10 }}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;

        // Disable if day is before today OR not in current month
        const isBeforeToday = isBefore(startOfDay(day), today);
        const isDisabled = isBeforeToday || !isSameMonth(day, monthStart);

        const isSelected = selectedDate && isSameDay(day, selectedDate);

        days.push(
          <div
            key={day.toString()}
            onClick={() => {
              if (!isDisabled) setSelectedDate(cloneDay);
            }}
            style={{
              flex: 1,
              height: 30,
              lineHeight: "30px",
              textAlign: "center",
              cursor: isDisabled ? "default" : "pointer",
              backgroundColor: isSelected ? "#357edd" : "transparent",
              color: isDisabled ? "#ccc" : isSelected ? "#fff" : "#000",
              borderRadius: "50%",
              userSelect: "none",
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} style={{ display: "flex", marginBottom: 5 }}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const handleSuggestedTimeClick = (time: string) => {
    setSelectedTime(time);
    // Update hour/minute dropdowns to match selected time
    const [h, m] = time.split(":");
    setHour(h);
    setMinute(m);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(e.target.value);
    setSelectedTime(`${e.target.value}:${minute}`);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(e.target.value);
    setSelectedTime(`${hour}:${e.target.value}`);
  };

  const handleSchedule = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (hour == "" || minute == "") {
      alert("Please fill  Hours and Minutes");
      return;
    }

    console.log(selectedDate, "selectedDate");
    console.log(selectedTime, "selectedTime");
    const [h, m] = selectedTime.split(":").map(Number);
    console.log(h, m, "h, m");
    const scheduledDate = new Date(selectedDate);
    scheduledDate.setHours(h, m, 0, 0);
    const isoString = scheduledDate.toISOString();
    onSchedule(isoString);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="calendar_modal"
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 0 10px rgba(0,0,0,0.15)",
          userSelect: "none",
        }}
      >
        <div
          style={{ marginBottom: 10, fontWeight: "bold", textAlign: "center" }}
        >
          Schedule Your Post
        </div>

        <button
          className="text_orange"
          onClick={onClose}
          style={{
            position: "absolute",
            right: 30,
            top: 20,

            border: "none",
            background: "none",
            fontSize: 18,
            cursor: "pointer",
          }}
          aria-label="Close modal"
        >
          &times;
        </button>

        {renderHeader()}
        {renderDays()}
        {renderCells()}

        <div className="suggest_time_wrapper">
          Suggested Time:{" "}
          {suggestedTimes.map((time) => (
            <button
              key={time}
              className={selectedTime === time ? "active" : ""}
              onClick={() => handleSuggestedTimeClick(time)}
            >
              {time}
            </button>
          ))}
        </div>

        <div className="select_time_wrapper">
          <p className="font_16">Select Time:</p>
          <div className="select_time">
            <div className="select_hour">
              <label htmlFor="hour">Hours</label>
              <select value={hour} onChange={handleHourChange}>
                {Array.from({ length: 24 }).map((_, i) => {
                  const val = i.toString().padStart(2, "0");
                  return (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="select_hour minutes">
              <label htmlFor="minutes">Minutes</label>
              <select value={minute} onChange={handleMinuteChange}>
                {Array.from({ length: 60 }).map((_, i) => {
                  const val = i.toString().padStart(2, "0");
                  return (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={handleSchedule}
          style={{
            marginTop: 20,
            backgroundColor: "#357edd",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "8px 20px",
            cursor: "pointer",
            float: "right",
          }}
        >
          Schedule
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;

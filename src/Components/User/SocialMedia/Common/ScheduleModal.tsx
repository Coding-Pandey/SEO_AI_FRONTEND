import React, { useEffect, useState } from "react";
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
import TimezoneSelect from "react-timezone-select";
import Select from "react-select";
import { GetUserDetails } from "../../Services/Services";
import { GetFacebookPages, UpdatePlateFormList } from "./SocialMediaServices";

interface ScheduleModalProps {
  show: boolean;
  onClose: () => void;
  onSchedule: (date: string, timeZone: any, selectedFacebookList: any) => void;
  platform: string;
  selectedFacebookList:any,
  setSelectedFacebookList:any;
}

const suggestedTimes = ["07:47", "10:36", "13:19", "15:18", "18:03"];

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  show,
  onClose,
  onSchedule,
  platform,
  selectedFacebookList,
  setSelectedFacebookList
}) => {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  //   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [facebookList, setFacebookList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
 
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetUserDetails();
      const resFacebook = await GetFacebookPages();

      if (response.status === 200 || response.status === 201) {
        if (response.data.timezone !== null) {
          setSelectedTimezone(
            response?.data?.timezone
          );
        }
        setFacebookList(resFacebook.data.pages);
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshList = async () => {
    try {
      setSelectedFacebookList([])
      setIsLoading(true);
      const response = await UpdatePlateFormList();
      if (response.status === 200 || response.status === 201) {
        const resFacebook = await GetFacebookPages();
        if (response.status === 200 || response.status === 201) {
          setFacebookList(resFacebook.data.pages);
        }
      }
    } catch (error: any) {
      console.error("Error handleRefreshList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const facebookOptions = facebookList.map((page: any) => ({
    value: page.page_id,
    label: page.name,
  }));

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
            className="date_text"
            key={day.toString()}
            onClick={() => {
              if (!isDisabled) setSelectedDate(cloneDay);
            }}
            style={{
              cursor: isDisabled ? "default" : "pointer",
              backgroundColor: isSelected ? "#357edd" : "transparent",
              color: isDisabled ? "#ccc" : isSelected ? "#fff" : "#000",
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
        <div
          className="date_row"
          key={day.toString()}
          style={{ display: "flex", marginBottom: 5 }}
        >
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

    if (!selectedTimezone || !selectedTimezone.value) {
      alert("Please select a timezone");
      return;
    }

    const [h, m] = selectedTime.split(":").map(Number);
    const scheduledDate = new Date(selectedDate);
    scheduledDate.setHours(h, m, 0, 0);
    const isoString = scheduledDate.toISOString();
    const timeZone = selectedTimezone;
    onSchedule(isoString, timeZone, selectedFacebookList);
    setSelectedTime("");
    setHour("");
    setMinute("");
    setSelectedTimezone("");
    setSelectedDate(today);
  };

  return (
    <>
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
            style={{
              marginBottom: 10,
              fontWeight: "bold",
              textAlign: "center",
            }}
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

          <div style={{ marginTop: 20 }}>
            <label style={{ marginBottom: "10px" }}>Select Timezone :</label>
            <TimezoneSelect
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />
          </div>
          {platform === "facebook" && (
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <label style={{ margin: 0 }}>Select Facebook Pages:</label>
                <span
                  style={{ cursor: "pointer", fontSize: 16 }}
                  onClick={handleRefreshList}
                >
                  🔄
                </span>
              </div>
              <Select
                isMulti
                options={facebookOptions}
                value={selectedFacebookList}
                onChange={(selected) =>
                  setSelectedFacebookList(selected as any[])
                }
                placeholder="Select one or more pages"
              />
            </div>
          )}

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
            {isLoading ? "Please Wait" : "Schedule"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ScheduleModal;

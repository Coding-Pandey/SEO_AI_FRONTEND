// import { useEffect, useState } from 'react';
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { GetUserDetails, UpdateUserProfile } from "../Services/Services";
import TimeZoneModal from "../../Page/TimeZoneModal";
import Loading from "../../Page/Loading/Loading";

const DashBoard = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTimezone, setSelectedTimezone] = useState<any>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetUserDetails();
      if (response.status === 200 || response.status === 201) {
        if (response.data.timezone === null) {
          setShowModal(true);
        }
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTimezone = async (timezone: string) => {
    try {
      const formData = { additionalProp1: timezone };
      const res = await UpdateUserProfile(formData);
      if (res.status === 200 || res.status === 201) {
        setShowModal(false);
        fetchUserDetails();
      }
    } catch (error) {
      console.error("Error updating timezone:", error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content">
          <div className="keyword_tool_content">
            <h5>Good morning, Admira (main dashboard, not ready)</h5>
          </div>
        </div>
      </main>
      <TimeZoneModal
        message="dashboard"
        showModal={showModal}
        selectedTimezone={selectedTimezone}
        setSelectedTimezone={setSelectedTimezone}
        onSave={handleSaveTimezone}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default DashBoard;

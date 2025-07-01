// import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';

const DashBoard = () => {
  // const [timeZone, setTimeZone] = useState('');

  // useEffect(() => {
  //   const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   setTimeZone(userTimeZone);
  // }, []);

  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content">
          <div className="keyword_tool_content">
            <h5>Good morning, Admira (main dashboard, not ready)</h5>
            {/* <p><strong>Your Time Zone:</strong> {timeZone}</p> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashBoard;

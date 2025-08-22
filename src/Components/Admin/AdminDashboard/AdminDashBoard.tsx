import { useEffect, useState } from "react";
import Loading from "../../Page/Loading/Loading";
import AdminHeader from "../AdminComponent/AdminHeader/AdminHeader";
import AdminSideBar from "../AdminComponent/AdminSideBar/AdminSideBar";
 

const AdminDashBoard = () => {
 const [isLoading, setIsLoading] = useState<boolean>(false);
 

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      // const response = await GetUserDetails();
      // if (response.status === 200 || response.status === 201) {
      //   if (response.data.timezone === null) {
      //     setShowModal(true);
      //   }
      // }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

 

  return (
    <>
      {isLoading && <Loading />}
      <AdminHeader />
      <main className="main_wrapper">
        <AdminSideBar />
        <div className="inner_content">
          <div className="keyword_tool_content">
            <h5>Good morning, Admin (main dashboard, not ready)</h5>
          </div>
        </div>
      </main>
    </>
  );
};
 

export default AdminDashBoard

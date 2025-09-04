import { useEffect, useState, useCallback } from "react";
import Loading from "../../Page/Loading/Loading";
import AdminHeader from "../AdminComponent/AdminHeader/AdminHeader";
import AdminSideBar from "../AdminComponent/AdminSideBar/AdminSideBar";
import { GetAllOrganization } from "../Service";
import { capitalizeFirstLetter } from "../../User/SeoProcess/SEOReport/Reports";

import debounce from "lodash/debounce";

interface UserData {
  id: number;
  name: string;
  email: string;
}

const AdminDashBoard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [AllUsers, SetAllUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchUsername, setSearchUsername] = useState("");

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetAllOrganization({
        username: searchUsername || "",
        page: currentPage,
        per_page: perPage,
      });
      if (response.status === 200 || response.status === 201) {
        if (currentPage === 1) {
          SetAllUsers(response.data.data);
        } else {
          SetAllUsers((prev) => [...prev, ...response.data.data]);
        }
        setTotalPages(response.data.pagination.total_pages);
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced username search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setCurrentPage(1);
      setSearchUsername(value);
    }, 500),
    []
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [currentPage, searchUsername]);

  return (
    <>
      {isLoading && <Loading />}
      <AdminHeader />
      <main className="main_wrapper">
        <AdminSideBar />

        <div className="inner_content">
          <div className="keyword_tool_content">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
              <h5>Admin Dashboard</h5>
            </div>

            {/* Search & Role */}
            <div className="d-flex flex-wrap justify-content-end mb-3 gap-3 organization_btn">
              {/* Search input on the right */}
              <div className="w-20">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by username"
                  onChange={handleUsernameChange}
                />
              </div>
            </div>

            {/* Table */}
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              {AllUsers?.length > 0 ? (
                AllUsers.map((org) => (
                  <div
                    key={org.id}
                    className="border border-2 rounded p-3 d-flex align-items-center"
                    style={{ width: "300px", cursor: "pointer" }}
                  >
                    <div
                      className="me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#f1f1f1",
                      }}
                    >
                      <i className="bi bi-building"></i>
                    </div>

                    <div>
                      <h6
                        className="mb-1 text-primary font_16"
                        style={{ fontWeight: "bold" }}
                      >
                        {capitalizeFirstLetter(org?.name)}
                      </h6>
                      <small className="text-muted">
                        Owner: {capitalizeFirstLetter(org?.email)}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "100%", minHeight: "150px" }}
                >
                  <p className="text-muted m-0">No organizations found</p>
                </div>
              )}
            </div>
            <div className="text-center mt-5">
              {currentPage < totalPages ? (
                <button
                  className="view-more-btn"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  View More
                  <span className="arrow">⏷</span>
                </button>
              ) : (
                AllUsers.length > perPage && (
                  <button
                    className="view-more-btn"
                    onClick={() => {
                      setCurrentPage(1);
                      SetAllUsers([]);
                    }}
                  >
                    Show Less
                    <span className="arrow">⏶</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashBoard;

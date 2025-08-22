import { useEffect, useState } from "react";
import Loading from "../../../Page/Loading/Loading";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import { GetUserDetails } from "../../../User/Services/Services";
import { capitalizeFirstLetter } from "../../../User/SeoProcess/SEOReport/Reports";

 

const AdminProfile = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>("Profile");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetUserDetails();
      if (response.status === 200 || response.status === 201) {
        setUserDetails(response?.data);
      }
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
        <div className="inner_content ">
          <div className="keyword_tool_content  generate_post create_content">
            <div
              className="content_header mb-4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-gear-fill heading_icon me-1 text_blue"></i>
                Settings <span className="text_blue">/ {activeTab}</span>
              </h2>
            </div>
            <div className="profile_settings_wrapper">
              <div className="row gy-3">
                <div className="col-12 col-xl-3 col-xxl-2">
                  <div className="settings_tabs_wrapper previously_created_warpper">
                    <ul
                      className="nav nav-pills flex-column nav-pills"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="true"
                          onClick={() => setActiveTab("Profile")}
                        >
                          Profile{" "}
                          <span>
                            <i className="bi bi-chevron-right"></i>
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-xl-9 col-xxl-10">
                  <div
                    className="tab-content setting_tab_content"
                    id="pills-tabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="profile_content">
                        <div className="row">
                          <div className="col-12">
                            <h3 className="font_20 font_600 mb-2">
                              Your Profile
                            </h3>
                            <div className="card_box box-shadow">
                              {userDetails?.image_url ? (
                                <img
                                  src={userDetails.image_url}
                                  alt="profile image"
                                  className="img-fluid profile_pic"
                                />
                              ) : (
                                <img
                                  src="../../../assets/images/profile-pic1.jpg"
                                  alt="profile image"
                                  className="img-fluid profile_pic"
                                />
                              )}

                              <p className="font_16 font_600 mb-2">
                                Name:{" "}
                                <span>
                                  {userDetails?.username
                                    ? capitalizeFirstLetter(
                                        userDetails.username.trim()
                                      )
                                    : "N/A"}
                                </span>
                              </p>
                              <p className="font_16 font_600 mb-2">
                                Email:{" "}
                                <span className="text-decoration-underline">
                                  {userDetails?.email}
                                </span>
                              </p>
                              <p className="font_16 font_600 mb-2">
                                Role:{" "}
                                <span>
                                  {userDetails?.role
                                    ? capitalizeFirstLetter(
                                        userDetails.role.trim()
                                      )
                                    : "N/A"}
                                </span>
                              </p>


                            </div>
                          </div>

                          {/* <div className="col-12">
                        <h3 className="font_20 font_600 mb-2">Password</h3>
                        <div className="card_box box-shadow">
                          <div className="form-group mb-3">
                            <label htmlFor="psw" className="font_16 mb-2">Current Password</label>
                            <div className="psw_wrapper">
                              <input type="password" className="form-control" id="psw" />
                              <i className="bi bi-eye-fill"></i>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="newpsw" className="font_16 mb-2">New Password</label>
                            <div className="psw_wrapper">
                              <input type="password" className="form-control" id="newpsw" />
                              <i className="bi bi-eye-fill"></i>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminProfile;

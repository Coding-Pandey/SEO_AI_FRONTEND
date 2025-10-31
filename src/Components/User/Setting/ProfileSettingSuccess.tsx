import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const ProfileSettingSuccess = () => {
  const { category } = useParams();

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div
            className="keyword_tool_content"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "80vh",
            }}
          >
            <div className="modal-contents integrated_modal">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-body schedule_box">
                    <p className="font_16 mb-1 connected-message">
                      You've successfully connected to{" "}
                      <strong>{category?.replace(/_/g, " ")}</strong>.
                    </p>

                    <button
                      type="button"
                      className="btn primary_btn ok_btn"
                      onClick={() =>
                        navigate("/profile-setting", {
                          state: { openIntegrationModal: true, category },
                        })
                      }
                    >
                      Go Back to Settings
                    </button>
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

export default ProfileSettingSuccess;

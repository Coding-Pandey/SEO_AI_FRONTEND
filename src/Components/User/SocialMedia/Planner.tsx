import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const Planner = () => {
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content">
          <div className="keyword_tool_content generate_post">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-people-fill me-1 text_blue"></i> Planner
              </h2>
            </div>

            <div className="plan_post_wrapper">
              <div className="post_list_header">
                <div className="header_left">
                  <h2 className="font_25 font_600">Posts</h2>
                </div>
                <div className="header_right">
                  <div className="form_input">
                    <select
                      className="form-select"
                      id="social_post"
                      aria-label="social_post"
                    >
                      <option value="">All Platforms</option>
                      <option value="1">LinkedIn</option>
                      <option value="2">X</option>
                      <option value="3">Facebook</option>
                    </select>
                  </div>
                  <div className="form_input">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="This week"
                    />
                  </div>
                </div>
              </div>

              <div className="post_list_content">
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      {[...Array(7)].map((_, i) => (
                        <tr key={i}>
                          <th scope="row">
                            <img
                              src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                              className="img-fluid"
                              alt="Post"
                            />
                          </th>
                          <td>
                            <p className="font_16 table-content">
                              Your marketing needs speed & efficiency our "Plug
                              & Play, Grow' Accelerator delivers. Ready? Out
                              costs, scale faster. Our plug-and-play solution
                              transforms marketing.
                            </p>
                          </td>
                          <td>
                            <i
                              className={`bi ${
                                i % 3 === 0
                                  ? "bi-linkedin"
                                  : i % 3 === 1
                                  ? "bi-facebook"
                                  : "bi-twitter-x"
                              } social_icon`}
                            ></i>
                          </td>
                          <td>
                            <span
                              className={`post_day ${
                                i % 3 === 0 ? "today" : ""
                              }`}
                            >
                              {i % 3 === 0
                                ? "Today"
                                : i % 3 === 1
                                ? "Yesterday"
                                : "25.04.2025"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn primary_btn_outline"
                              data-bs-toggle="modal"
                              data-bs-target="#scheduleModal"
                            >
                              Re-schedule
                            </button>
                          </td>
                          <td>
                            <button className="btn primary_btn_outline">
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn text_orange font_20 pe-0"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteSchedule"
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <>
        {/* Schedule Modal */}
        <div
          className="modal fade"
          id="scheduleModal"
          tabIndex={-1}
          aria-labelledby="scheduleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body schedule_box">
                <p className="font_16 mb-1">Your post has been scheduled</p>
                <p className="font_14 text_blue">
                  Monday, April 24th at 8:17 AM
                </p>
                <button
                  className="btn primary_btn ok_btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Schedule Modal */}
        <div
          className="modal fade"
          id="deleteSchedule"
          tabIndex={-1}
          aria-labelledby="deleteScheduleLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body schedule_box">
                <p className="font_16 mb-1">
                  Are you sure you want to delete this item?
                </p>
                <p className="font_16">This action cannot be undone.</p>
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn primary_btn ok_btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Yes
                  </button>
                  <button
                    className="btn primary_btn ok_btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Planner;

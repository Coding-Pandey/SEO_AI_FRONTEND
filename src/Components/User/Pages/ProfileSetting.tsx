import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { GetUserDetails } from "../Services/Services";

const ProfileSetting = () => {
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await GetUserDetails();
      if (response.status === 200 || response.status === 201) {
         console.log(response.data,"Profile");
         setUserDetails(response.data)
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content  generate_post create_content">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-gear-fill heading_icon me-1 text_blue"></i>
                Settings <span className="text_blue">/ Profile settings</span>
              </h2>
            </div>
               <div className="profile_settings_wrapper">
          <div className="row gy-3">
            <div className="col-12 col-xl-3 col-xxl-2">
              <div className="settings_tabs_wrapper previously_created_warpper">
                <ul className="nav nav-pills flex-column nav-pills" id="pills-tab" role="tablist">
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
                    >
                      Profile <span><i className="bi bi-chevron-right"></i></span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-integration-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-integration"
                      type="button"
                      role="tab"
                      aria-controls="pills-integration"
                      aria-selected="false"
                    >
                      Integrations <span><i className="bi bi-chevron-right"></i></span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-source-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-source"
                      type="button"
                      role="tab"
                      aria-controls="pills-source"
                      aria-selected="false"
                    >
                      Source files <span><i className="bi bi-chevron-right"></i></span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-xl-9 col-xxl-10">
              <div className="tab-content setting_tab_content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="profile_content">
                    <div className="row">
                      <div className="col-12">
                        <h3 className="font_20 font_600 mb-2">Your Profile</h3>
                        <div className="card_box box-shadow">
                          {userDetails?.image_url ? (<img
                            src={userDetails.image_url}
                            alt="profile image"
                            className="img-fluid profile_pic"
                          />) :(<img
                            src="../../../assets/images/profile-pic1.jpg"
                            alt="profile image"
                            className="img-fluid profile_pic"
                          />)}
                          
                          <p className="font_16 font_600 mb-2">
                            Name: <span>{userDetails?.username}</span>
                          </p>
                          <p className="font_16 font_600 mb-2">
                            Email: <span className="text-decoration-underline">{userDetails?.email}</span>
                          </p>
                          <p className="font_16 font_600 mb-2">
                            User: <span>{userDetails?.role}</span>
                          </p>
                        </div>
                      </div>

                      <div className="col-12">
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
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-integration"
                  role="tabpanel"
                  aria-labelledby="pills-integration-tab"
                >
                  <div className="profile_content Integrations_settings">
                    <div className="row">
                      <div className="col-12">
                        <h3 className="font_20 font_600 mb-2">Integrations</h3>
                        <p className="font_16">
                          Enable connections for performance reporting, social media scheduling, and data-driven recommendations.
                        </p>
                        <ul className="list-unstyled integration_card_wrapper row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3">
                          {[
                            { name: "Search console", img: "search-console.png", connected: true },
                            { name: "Google Analytics", img: "google-analytics.png", connected: false },
                            { name: "Google Ads", img: "google-ads.png", connected: false },
                            { name: "LinkedIn", img: "linkedin.png", connected: false },
                            { name: "Twitter", img: "X.png", connected: false },
                            { name: "Instagram", img: "insta.png", connected: false },
                            { name: "Tiktok", img: "tiktok.png", connected: false },
                            { name: "Chrome UX Report", img: "chrome-ux.png", connected: false },
                            { name: "Facebook", img: "facebook.png", connected: false },
                          ].map((item, index) => (
                            <li className="col" key={index}>
                              <div
                                className="intergration_card card_box"
                                data-bs-toggle={item.name === "Search console" ? "modal" : ""}
                                data-bs-target={item.name === "Search console" ? "#integratedCard" : ""}
                              >
                                <div className="left_part">
                                  <img
                                    src={`assests/images/${item.img}`}
                                    className="img-fluid integrated_icon"
                                    alt="integrated icon"
                                  />
                                </div>
                                <div className="right_part">
                                  <h4 className="font_16 font_700 text_blue">{item.name}</h4>
                                  <p className="font_14 mb-0">Connect to access performance report date</p>
                                </div>
                                <button type="button" className="integrate_btn">
                                  <span>
                                    <i className={`bi bi-${item.connected ? "check" : "x"}-circle-fill ${item.connected ? "text-success" : "text-danger"}`}></i>
                                  </span>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade integrated_modal"
                    id="integratedCard"
                       tabIndex={-1}
                    aria-labelledby="integrationTabLabel"
                    aria-hidden="true"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-body schedule_box">
                          <p className="font_16 mb-1">We require authorisation to connect to the data</p>
                          <button type="button" className="btn primary_btn ok_btn">Connect</button>
                        </div>
                        <button className="btn modal_close" data-bs-dismiss="modal" aria-label="Close">
                          <i className="bi-x-circle-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-source"
                  role="tabpanel"
                  aria-labelledby="pills-source-tab"
                >
                  <div className="source_file_wrapper">
                    <div className="row outer_grid">
                      <div className="col-12">
                        <h3 className="font_20 font_600 mb-2">Source Files</h3>
                        <p className="font_16 file_note mb-0">
                          Note: Please provide all the required information to ensure a high-quality outcome and optimal results.
                        </p>
                      </div>

                      <div className="col-12">
                        <h3 className="font_20 font_600 mb-2">Marketing Files</h3>
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            <div className="card_box">
                              <h4 className="font_16 font_600"  >
                                Ideal Customer Profile (0/1)<span className="text-danger">*</span>
                              </h4>
                              <div className="add_media" data-bs-toggle="modal" data-bs-target="#idealCard">
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="card_box">
                              <h4 className="font_16 font_600" >
                                Tone of voice (1/1)<span className="text-danger">*</span>
                              </h4>
                              <ul className="upload_content_item links_upload_list">
                                <li>
                                  <div className="left_part font_14">
                                    <span>
                                      <i className="bi bi-file-earmark-text-fill"></i> Optiminder- tone of voice
                                    </span>
                                  </div>
                                  <div className="right_part">
                                    <button
                                      type="button"
                                      className="btn primary_btn_outline"
                                      aria-label="edit_icon"
                                      data-bs-toggle="modal"
                                      data-bs-target="#toneCard"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="btn text_orange font_25 px-0"
                                      aria-label="remove_icon"
                                    >
                                      <i className="bi bi-x"></i>
                                    </button>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="card_box">
                              <h4 className="font_16 font_600"  >
                                Buyer Persona<span className="text-danger">*</span>
                              </h4>
                              <ul className="upload_content_item links_upload_list">
                                {[
                                  "Tech- Savvy Tanya",
                                  "Luxury-Loving Leo",
                                ].map((persona, index) => (
                                  <li key={index}>
                                    <div className="left_part font_14">
                                      <span>
                                        <i className="bi bi-file-earmark-text-fill"></i> {persona}
                                      </span>
                                    </div>
                                    <div className="right_part">
                                      <button
                                        type="button"
                                        className="btn primary_btn_outline"
                                        aria-label="edit_icon"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn text_orange font_25 px-0"
                                        aria-label="remove_icon"
                                      >
                                        <i className="bi bi-x"></i>
                                      </button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <button
                                type="button"
                                className="btn primary_btn_outline"
                                data-bs-toggle="modal"
                                data-bs-target="#buyerCard"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="card_box">
                              <h4 className="font_16 font_600"  >
                                Brand Identity(1/1)<span className="text-danger">*</span>
                              </h4>
                              <ul className="upload_content_item links_upload_list">
                                <li>
                                  <div className="left_part font_14">
                                    <span>
                                      <i className="bi bi-file-earmark-text-fill"></i> Optiminder- tone of voice
                                    </span>
                                  </div>
                                  <div className="right_part">
                                    <button
                                      type="button"
                                      className="btn primary_btn_outline"
                                      aria-label="edit_icon"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="btn text_orange font_25 px-0"
                                      aria-label="remove_icon"
                                    >
                                      <i className="bi bi-x"></i>
                                    </button>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <h3 className="font_20 font_600 mb-2">Offering Files</h3>
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            <div className="card_box">
                              <h4 className="font_16 font_600"  >
                                Offering<span className="text-danger">*</span>
                              </h4>
                              <ul className="upload_content_item links_upload_list">
                                {[
                                  "Risk Assessment",
                                  "Account Verification",
                                ].map((offering, index) => (
                                  <li key={index}>
                                    <div className="left_part font_14">
                                      <span>
                                        <i className="bi bi-file-earmark-text-fill"></i> {offering}
                                      </span>
                                    </div>
                                    <div className="right_part">
                                      <button
                                        type="button"
                                        className="btn primary_btn_outline"
                                        aria-label="edit_icon"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn text_orange font_25 px-0"
                                        aria-label="remove_icon"
                                      >
                                        <i className="bi bi-x"></i>
                                      </button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <button
                                type="button"
                                className="btn primary_btn_outline"
                                data-bs-toggle="modal"
                                data-bs-target="#offeringCard"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="card_box mb-3">
                              <h4 className="font_16 font_600"  >
                                Common Pain Points(1/1)<span className="text-danger">*</span>
                              </h4>
                              <ul className="upload_content_item links_upload_list">
                                <li>
                                  <div className="left_part font_14">
                                    <span>
                                      <i className="bi bi-file-earmark-text-fill"></i> Optiminder- tone of voice
                                    </span>
                                  </div>
                                  <div className="right_part">
                                    <button
                                      type="button"
                                      className="btn primary_btn_outline"
                                      aria-label="edit_icon"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="btn text_orange font_25 px-0"
                                      aria-label="remove_icon"
                                    >
                                      <i className="bi bi-x"></i>
                                    </button>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <div className="card_box">
                              <h4 className="font_16 font_600"  >
                                Value Preposition(0/1)<span className="text-danger">*</span>
                              </h4>
                              <div className="add_media" data-bs-toggle="modal" data-bs-target="#idealCard">
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade source_modal"
                    id="buyerCard"
                        tabIndex={-1}
                    aria-labelledby="buyerTabLabel"
                    aria-hidden="true"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-body source_form_wrapper ideal_form">
                          <h3 className="font_25 font_600 text-center mb-4">Create you Buyer Persona</h3>
                          <p className="font_16 keyword_error">Please update the mission information</p>
                          <div className="row">
                            <div className="col-12">
                              <label htmlFor="buyerPersona" className="font_16 font_500 mb-2">
                                Name your buyer persona *
                              </label>
                              <input type="text" className="form-control" id="buyerPersona" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="uploadpersona" className="font_16 font_500 mb-2">
                                Upload persona description *
                              </label>
                              <div className="doc_file_wrapper" id="uploadpersona">
                                <input className="form-control upload_input" type="file" />
                                <div className="doc_left">
                                  <p className="font_14 mb-0">
                                    Drag and drop files here or <span className="text_blue font_500">browse</span> to Upload
                                  </p>
                                </div>
                              </div>
                              <ul className="upload_content_item file_upload_list">
                                <li className="font_14">
                                  <span>
                                    <i className="bi bi-file-earmark-pdf-fill me-1"></i> https:domain.com/file_name
                                  </span>
                                  <button
                                    type="button"
                                    className="btn text_orange font_16 pe-0"
                                    aria-label="remove_icon"
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div className="col-12">
                              <label htmlFor="uploadpersona2" className="font_16 font_500 mb-2">
                                Upload persona specifile pain points *
                              </label>
                              <div className="doc_file_wrapper" id="uploadpersona2">
                                <input className="form-control upload_input" type="file" />
                                <div className="doc_left">
                                  <p className="font_14 mb-0">
                                    Drag and drop files here or <span className="text_blue font_500">browse</span> to Upload
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <button type="button" className="btn primary_btn modal_btn">Save</button>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn modal_close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i className="bi-x-circle-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade source_modal"
                    id="idealCard"
                        tabIndex={-1}
                    aria-labelledby="idealTabLabel"
                    aria-hidden="true"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-body source_form_wrapper buyer_form">
                          <h3 className="font_25 font_600 text-center mb-4">Ideal Customer Profile</h3>
                          <div className="row">
                            <div className="col-12">
                              <label htmlFor="buyerPersona" className="font_16 font_500 mb-2">
                                Name your file *
                              </label>
                              <input type="text" className="form-control" id="buyerPersona" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="uploadpersona" className="font_16 font_500 mb-2">
                                Upload ICP description *
                              </label>
                              <div className="doc_file_wrapper" id="uploadpersona">
                                <input className="form-control upload_input" type="file" />
                                <div className="doc_left">
                                  <p className="font_14 mb-0">
                                    Drag and drop files here or <span className="text_blue font_500">browse</span> to Upload
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <button type="button" className="btn primary_btn modal_btn">Save</button>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn modal_close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i className="bi-x-circle-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade source_modal"
                    id="offeringCard"
                        tabIndex={-1}
                    aria-labelledby="offeringTabLabel"
                    aria-hidden="true"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-body source_form_wrapper offering_form">
                          <h3 className="font_25 font_600 text-center mb-4">Offering</h3>
                          <div className="row">
                            <div className="col-12">
                              <label htmlFor="offeringbuyerPersona" className="font_16 font_500 mb-2">
                                Name your offer *
                              </label>
                              <input type="text" className="form-control" id="buyerPersona" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="uploadpersona" className="font_16 font_500 mb-2">
                                Upload offer/service description *
                              </label>
                              <div className="doc_file_wrapper" id="uploadpersona">
                                <input className="form-control upload_input" type="file" />
                                <div className="doc_left">
                                  <p className="font_14 mb-0">
                                    Drag and drop files here or <span className="text_blue font_500">browse</span> to Upload
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <button type="button" className="btn primary_btn modal_btn">Save</button>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn modal_close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i className="bi-x-circle-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade source_modal"
                    id="toneCard"
                    tabIndex={-1}
                    aria-labelledby="toneTabLabel"
                    aria-hidden="true"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="card-body source_form_wrapper offering_form">
                          <h3 className="font_25 font_600 text-center mb-4">Tone of voice</h3>
                          <div className="row">
                            <div className="col-12">
                              <label htmlFor="buyerPersona" className="font_16 font_500 mb-2">
                                Name your file *
                              </label>
                              <input type="text" className="form-control" id="buyerPersona" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="uploadpersona" className="font_16 font_500 mb-2">
                                Upload persona description *
                              </label>
                              <div className="doc_file_wrapper" id="uploadpersona">
                                <input className="form-control upload_input" type="file" />
                                <div className="doc_left">
                                  <p className="font_14 mb-0">
                                    Drag and drop files here or <span className="text_blue font_500">browse</span> to Upload
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <button type="button" className="btn primary_btn modal_btn">Save</button>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn modal_close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i className="bi-x-circle-fill"></i>
                          </button>
                        </div>
                      </div>
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

export default ProfileSetting;

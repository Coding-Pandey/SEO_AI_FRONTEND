import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { GetUserDetails, UpdateUserProfile } from "../Services/Services";
import Loading from "../../Page/Loading/Loading";
import {
  DeleteSource,
  GetConnectIntegrations,
  GetIntegrationData,
  GetUploadedSourceFile,
} from "./ProfileServices";
import IntegrationsTab from "./IntegrationsTab";
import SourceFileModal from "./SourceFileModal";
import { toast } from "react-toastify";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { capitalizeFirstLetter } from "../SeoProcess/SEOReport/Reports";
import TimeZoneModal from "../../Page/TimeZoneModal";
import ManageModerator from "../Moderator/ManageByModerator/ManageModerator";
import { useAuth } from "../../../ContextApi/AuthContext/AuthContext";
// import BuyerPersonaModal from "./BuyerPersonaModal";

interface FileItem {
  file_name: string;
  category: string;
  uuid_id: string;
  uploaded_file_name: string;
}

export interface IntegrationsPayload {
  scope_categories: string[];
}

const ProfileSetting = () => {
  const { users } = useAuth();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IntegratedData, setIntegratedData] = useState<any>([]);
  // const [SourceFileData, setSourceFileData] = useState<any>([]);
  const [ToneOfVoice, setToneOfVoice] = useState<any>([]);
  const [IdealCustomerProfile, setIdealCustomerProfile] = useState<any>([]);
  const [BuyerPersona, setBuyerPersona] = useState<any>([]);
  const [BrandIdentity, setBrandIdentity] = useState<any>([]);
  const [Offering, setOffering] = useState<any>([]);
  const [CommonPainPoints, setCommonPainPoints] = useState<any>([]);
  const [ValueProposition, setValueProposition] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [FileEditData, setFileEditData] = useState<any>({});
  const [activeTab, setActiveTab] = useState<string | null>("Profile");
  const [selectedTimezone, setSelectedTimezone] = useState<any>();
  const openDeleteModal = (uuid: string) => {
    setSelectedDeleteId(uuid);
    setIsDeleteModalOpen(true);
  };
  // const [isBuyerModalOpen, setIsBuyerModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [showTimeZoneModal, setShowTimeZoneModal] = useState<boolean>(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (location.state?.activateSourceFilesTab) {
      setActiveTab("Source files");
    }
  }, [location.state]);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetUserDetails();
      const responseSuccess = await GetIntegrationData();
      const responseUploadFile = await GetUploadedSourceFile();
      if (response.status === 200 || response.status === 201) {
        setIntegratedData(responseSuccess?.data?.integrations);
        setUserDetails(response?.data);
        setSelectedTimezone(response?.data?.timezone);
        const sourceFileList: FileItem[] =
          responseUploadFile?.data?.uploaded_files;
        const toneOfVoiceFiles: FileItem[] = Array.isArray(sourceFileList)
          ? sourceFileList.filter(
              (file: FileItem) => file.category === "Tone of voice"
            )
          : [];
        setToneOfVoice(toneOfVoiceFiles);
        const IdealCustomerFiles: FileItem[] = Array.isArray(sourceFileList)
          ? sourceFileList.filter(
              (file: FileItem) => file.category === "Ideal Customer Profile"
            )
          : [];
        setIdealCustomerProfile(IdealCustomerFiles);
        const BuyerPersonaFiles: FileItem[] = Array.isArray(sourceFileList)
          ? sourceFileList.filter(
              (file: FileItem) => file.category === "Buyer Persona"
            )
          : [];
        setBuyerPersona(BuyerPersonaFiles);
        const BrandIdentityFiles: FileItem[] = Array.isArray(sourceFileList)
          ? sourceFileList.filter(
              (file: FileItem) => file.category === "Brand Identity"
            )
          : [];
        setBrandIdentity(BrandIdentityFiles);
        const OfferingFiles: FileItem[] = Array.isArray(sourceFileList)
          ? sourceFileList.filter(
              (file: FileItem) => file.category === "Offering"
            )
          : [];
        setOffering(OfferingFiles);
        const CommonPainPointsFiles: FileItem[] = Array.isArray(sourceFileList)
          ? sourceFileList.filter(
              (file: FileItem) => file.category === "Common Pain Points"
            )
          : [];
        setCommonPainPoints(CommonPainPointsFiles);
        const ValuePropositionFiles: FileItem[] = Array.isArray(sourceFileList)
          ? sourceFileList.filter(
              (file: FileItem) => file.category === "Value Proposition"
            )
          : [];
        setValueProposition(ValuePropositionFiles);
        setIsDeleteModalOpen(false);
        setSelectedDeleteId(null);
        setShowModal(false);
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (providers: string[]) => {
    const provider_names: IntegrationsPayload = {
      scope_categories: providers || [],
    };
    try {
      if (!selectedCategory) return;
      setIsLoading(true);
      const res = await GetConnectIntegrations(
        selectedCategory,
        provider_names
      );
      if (res.status === 201 || res.status === 200) {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      }
    } catch (error) {
      console.log(error, "error during handle connect");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (uuid_id: string) => {
    try {
      setIsLoading(true);
      const res = await DeleteSource(uuid_id);
      if (res.status === 201 || res.status === 200) {
        fetchUserDetails();
        toast.success("Source File deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error, "Error during handle delete source file");
    } finally {
      setIsLoading(false);
    }
  };

  const onhandleAddSouceFile = async () => {
    fetchUserDetails();
    toast.success("Source File Added successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleAddClose = () => {
    setShowModal(false);
    setFileEditData({});
  };

  const handleOpenModel = (title: string) => {
    setShowModal(true);
    setTitle(title);
    setFileEditData({});
  };

  const handleEditOpenModel = (title: string, fileData: any = {}) => {
    setShowModal(true);
    setTitle(title);
    setFileEditData(fileData);
  };

  const handleSaveTimezone = async (timezone: string) => {
    try {
      const res = await UpdateUserProfile(timezone);
      if (res.status === 200 || res.status === 201) {
        setShowTimeZoneModal(false);
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

              <button
                className="primary_btn"
                onClick={() => setShowTimeZoneModal(true)}
              >
                Change TimeZone
              </button>
              <TimeZoneModal
                message="profileSetting"
                showModal={showTimeZoneModal}
                selectedTimezone={selectedTimezone}
                setSelectedTimezone={setSelectedTimezone}
                onSave={handleSaveTimezone}
                onClose={() => setShowTimeZoneModal(false)}
              />
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
                          className={`nav-link ${
                            activeTab === "Profile" ? "active" : ""
                          }`}
                          id="pills-profile-tab"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected={activeTab === "Profile"}
                          onClick={() => setActiveTab("Profile")}
                        >
                          Profile{" "}
                          <span>
                            <i className="bi bi-chevron-right"></i>
                          </span>
                        </button>
                      </li>

                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "Integrations" ? "active" : ""
                          }`}
                          id="pills-integration-tab"
                          type="button"
                          role="tab"
                          aria-controls="pills-integration"
                          aria-selected={activeTab === "Integrations"}
                          onClick={() => setActiveTab("Integrations")}
                        >
                          Integrations{" "}
                          <span>
                            <i className="bi bi-chevron-right"></i>
                          </span>
                        </button>
                      </li>

                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "Source files" ? "active" : ""
                          }`}
                          id="pills-source-tab"
                          type="button"
                          role="tab"
                          aria-controls="pills-source"
                          aria-selected={activeTab === "Source files"}
                          onClick={() => setActiveTab("Source files")}
                        >
                          Source files{" "}
                          <span>
                            <i className="bi bi-chevron-right"></i>
                          </span>
                        </button>
                      </li>

                      {users?.user.role === "moderator" && (
                        <li className="nav-item" role="presentation">
                          <button
                            className={`nav-link ${
                              activeTab === "Manage Users" ? "active" : ""
                            }`}
                            id="pills-ManageUsers-tab"
                            type="button"
                            role="tab"
                            aria-controls="pills-ManageUsers"
                            aria-selected={activeTab === "Manage Users"}
                            onClick={() => setActiveTab("Manage Users")}
                          >
                            Manage Users{" "}
                            <span>
                              <i className="bi bi-chevron-right"></i>
                            </span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-xl-9 col-xxl-10">
                  <div
                    className="tab-content setting_tab_content"
                    id="pills-tabContent"
                  >
                    <div
                      className={`tab-pane fade ${
                        activeTab === "Profile" ? "show active" : ""
                      }`}
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
                                User:{" "}
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

                    <IntegrationsTab
                      activeTab={activeTab}
                      IntegratedData={IntegratedData}
                      setSelectedCategory={setSelectedCategory}
                      handleConnect={handleConnect}
                    />

                    <div
                      className={`tab-pane fade ${
                        activeTab === "Source files" ? "show active" : ""
                      }`}
                      id="pills-source"
                      role="tabpanel"
                      aria-labelledby="pills-source-tab"
                    >
                      <div className="source_file_wrapper">
                        <div className="row outer_grid">
                          <div className="col-12">
                            <h3 className="font_20 font_600 mb-2">
                              Source Files
                            </h3>
                            <p className="font_16 file_note mb-0">
                              Note: Please provide all the required information
                              to ensure a high-quality outcome and optimal
                              results.
                            </p>
                          </div>

                          <div className="col-12">
                            <h3 className="font_20 font_600 mb-2">
                              Marketing Files
                            </h3>
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="card_box">
                                  <h4 className="font_16 font_600">
                                    Ideal Customer Profile (0/1)
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <ul className="upload_content_item links_upload_list">
                                    {IdealCustomerProfile.length < 1 && (
                                      <div
                                        className="add_media"
                                        onClick={() =>
                                          handleOpenModel(
                                            "Ideal Customer Profile"
                                          )
                                        }
                                      >
                                        <div className="media_text">
                                          <i className="bi bi-plus-circle"></i>
                                          <span>Add</span>
                                        </div>
                                      </div>
                                    )}
                                    {IdealCustomerProfile?.map(
                                      (file: FileItem) => (
                                        <li key={file.uuid_id}>
                                          <div className="left_part font_14">
                                            <span>
                                              <i className="bi bi-file-earmark-text-fill"></i>{" "}
                                              {file.file_name}
                                            </span>
                                          </div>
                                          <div className="right_part">
                                            <button
                                              type="button"
                                              className="btn primary_btn_outline"
                                              aria-label="edit_icon"
                                              data-bs-toggle="modal"
                                              data-bs-target="#toneCard"
                                              onClick={() =>
                                                handleEditOpenModel(
                                                  "Ideal Customer Profile",
                                                  file
                                                )
                                              }
                                            >
                                              Edit
                                            </button>
                                            <button
                                              type="button"
                                              className="btn text_orange font_25 px-0"
                                              aria-label="remove_icon"
                                              onClick={() =>
                                                openDeleteModal(file.uuid_id)
                                              }
                                            >
                                              <i className="bi bi-x"></i>
                                            </button>
                                          </div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="card_box">
                                  <h4 className="font_16 font_600">
                                    Tone of voice (1/1)
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <ul className="upload_content_item links_upload_list">
                                    {ToneOfVoice.length < 1 && (
                                      <div
                                        className="add_media"
                                        data-bs-toggle="modal"
                                        data-bs-target="#idealCard"
                                      >
                                        <div
                                          className="media_text"
                                          onClick={() =>
                                            handleOpenModel("Tone of voice")
                                          }
                                        >
                                          <i className="bi bi-plus-circle"></i>
                                          <span>Add</span>
                                        </div>
                                      </div>
                                    )}
                                    {ToneOfVoice?.map((file: FileItem) => (
                                      <li key={file.uuid_id}>
                                        <div className="left_part font_14">
                                          <span>
                                            <i className="bi bi-file-earmark-text-fill"></i>{" "}
                                            {file.file_name}
                                          </span>
                                        </div>
                                        <div className="right_part">
                                          <button
                                            type="button"
                                            className="btn primary_btn_outline"
                                            aria-label="edit_icon"
                                            data-bs-toggle="modal"
                                            data-bs-target="#toneCard"
                                            onClick={() =>
                                              handleEditOpenModel(
                                                "Tone of voice",
                                                file
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            className="btn text_orange font_25 px-0"
                                            aria-label="remove_icon"
                                            onClick={() =>
                                              openDeleteModal(file.uuid_id)
                                            }
                                          >
                                            <i className="bi bi-x"></i>
                                          </button>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="card_box">
                                  <h4 className="font_16 font_600">
                                    Buyer Persona
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <ul className="upload_content_item links_upload_list">
                                    {BuyerPersona?.map((file: FileItem) => (
                                      <li key={file.uuid_id}>
                                        <div className="left_part font_14">
                                          <span>
                                            <i className="bi bi-file-earmark-text-fill"></i>{" "}
                                            {file.file_name}
                                          </span>
                                        </div>
                                        <div className="right_part">
                                          <button
                                            type="button"
                                            className="btn primary_btn_outline"
                                            aria-label="edit_icon"
                                            data-bs-toggle="modal"
                                            data-bs-target="#toneCard"
                                            onClick={() =>
                                              handleEditOpenModel(
                                                "Buyer Persona",
                                                file
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            className="btn text_orange font_25 px-0"
                                            aria-label="remove_icon"
                                            onClick={() =>
                                              openDeleteModal(file.uuid_id)
                                            }
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
                                    // onClick={() => setIsBuyerModalOpen(true)}

                                    onClick={() =>
                                      handleOpenModel("Buyer Persona")
                                    }
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="card_box">
                                  <h4 className="font_16 font_600">
                                    Brand Identity(1/1)
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <ul className="upload_content_item links_upload_list">
                                    {BrandIdentity.length < 1 && (
                                      <div
                                        className="add_media"
                                        data-bs-toggle="modal"
                                        data-bs-target="#idealCard"
                                      >
                                        <div
                                          className="media_text"
                                          onClick={() =>
                                            handleOpenModel("Brand Identity")
                                          }
                                        >
                                          <i className="bi bi-plus-circle"></i>
                                          <span>Add</span>
                                        </div>
                                      </div>
                                    )}
                                    {BrandIdentity?.map((file: FileItem) => (
                                      <li key={file.uuid_id}>
                                        <div className="left_part font_14">
                                          <span>
                                            <i className="bi bi-file-earmark-text-fill"></i>{" "}
                                            {file.file_name}
                                          </span>
                                        </div>
                                        <div className="right_part">
                                          <button
                                            type="button"
                                            className="btn primary_btn_outline"
                                            aria-label="edit_icon"
                                            data-bs-toggle="modal"
                                            data-bs-target="#toneCard"
                                            onClick={() =>
                                              handleEditOpenModel(
                                                "Brand Identity",
                                                file
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            className="btn text_orange font_25 px-0"
                                            aria-label="remove_icon"
                                            onClick={() =>
                                              openDeleteModal(file.uuid_id)
                                            }
                                          >
                                            <i className="bi bi-x"></i>
                                          </button>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <h3 className="font_20 font_600 mb-2">
                              Offering Files
                            </h3>
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="card_box">
                                  <h4 className="font_16 font_600">
                                    Offering
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <ul className="upload_content_item links_upload_list">
                                    {Offering?.map((file: FileItem) => (
                                      <li key={file.uuid_id}>
                                        <div className="left_part font_14">
                                          <span>
                                            <i className="bi bi-file-earmark-text-fill"></i>{" "}
                                            {file.file_name}
                                          </span>
                                        </div>
                                        <div className="right_part">
                                          <button
                                            type="button"
                                            className="btn primary_btn_outline"
                                            aria-label="edit_icon"
                                            data-bs-toggle="modal"
                                            data-bs-target="#toneCard"
                                            onClick={() =>
                                              handleEditOpenModel(
                                                "Offering",
                                                file
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            className="btn text_orange font_25 px-0"
                                            aria-label="remove_icon"
                                            onClick={() =>
                                              openDeleteModal(file.uuid_id)
                                            }
                                          >
                                            <i className="bi bi-x"></i>
                                          </button>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                  {Offering.length < 1 && (
                                    <button
                                      type="button"
                                      className="btn primary_btn_outline"
                                      onClick={() =>
                                        handleOpenModel("Offering")
                                      }
                                    >
                                      Add
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="card_box mb-3">
                                  <h4 className="font_16 font_600">
                                    Common Pain Points(1/1)
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <ul className="upload_content_item links_upload_list">
                                    {CommonPainPoints.length < 1 && (
                                      <div
                                        className="add_media"
                                        data-bs-toggle="modal"
                                        data-bs-target="#idealCard"
                                      >
                                        <div
                                          className="media_text"
                                          onClick={() =>
                                            handleOpenModel(
                                              "Common Pain Points"
                                            )
                                          }
                                        >
                                          <i className="bi bi-plus-circle"></i>
                                          <span>Add</span>
                                        </div>
                                      </div>
                                    )}
                                    {CommonPainPoints?.map((file: FileItem) => (
                                      <li key={file.uuid_id}>
                                        <div className="left_part font_14">
                                          <span>
                                            <i className="bi bi-file-earmark-text-fill"></i>{" "}
                                            {file.file_name}
                                          </span>
                                        </div>
                                        <div className="right_part">
                                          <button
                                            type="button"
                                            className="btn primary_btn_outline"
                                            aria-label="edit_icon"
                                            data-bs-toggle="modal"
                                            data-bs-target="#toneCard"
                                            onClick={() =>
                                              handleEditOpenModel(
                                                "Common Pain Points",
                                                file
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            className="btn text_orange font_25 px-0"
                                            aria-label="remove_icon"
                                            onClick={() =>
                                              openDeleteModal(file.uuid_id)
                                            }
                                          >
                                            <i className="bi bi-x"></i>
                                          </button>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="card_box">
                                  <h4 className="font_16 font_600">
                                    Value Preposition(0/1)
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <ul className="upload_content_item links_upload_list">
                                    {ValueProposition.length > 1 && (
                                      <div
                                        className="add_media"
                                        data-bs-toggle="modal"
                                        data-bs-target="#idealCard"
                                      >
                                        <div
                                          className="media_text"
                                          onClick={() =>
                                            handleOpenModel("Value Proposition")
                                          }
                                        >
                                          <i className="bi bi-plus-circle"></i>
                                          <span>Add</span>
                                        </div>
                                      </div>
                                    )}
                                    {ValueProposition?.map((file: FileItem) => (
                                      <li key={file.uuid_id}>
                                        <div className="left_part font_14">
                                          <span>
                                            <i className="bi bi-file-earmark-text-fill"></i>{" "}
                                            {file.file_name}
                                          </span>
                                        </div>
                                        <div className="right_part">
                                          <button
                                            type="button"
                                            className="btn primary_btn_outline"
                                            aria-label="edit_icon"
                                            data-bs-toggle="modal"
                                            data-bs-target="#toneCard"
                                            onClick={() =>
                                              handleEditOpenModel(
                                                "Value Proposition",
                                                file
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            className="btn text_orange font_25 px-0"
                                            aria-label="remove_icon"
                                            onClick={() =>
                                              openDeleteModal(file.uuid_id)
                                            }
                                          >
                                            <i className="bi bi-x"></i>
                                          </button>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <SourceFileModal
                        isOpen={showModal}
                        onClose={handleAddClose}
                        title={title}
                        FileEditData={FileEditData}
                        onAddSouceFile={onhandleAddSouceFile}
                      />
                      <DeleteConfirmModal
                        isOpen={isDeleteModalOpen}
                        onConfirm={() => {
                          if (selectedDeleteId) handleDelete(selectedDeleteId);
                        }}
                        onCancel={() => {
                          setIsDeleteModalOpen(false);
                          setSelectedDeleteId(null);
                        }}
                      />
                      {/* <BuyerPersonaModal
                        isOpen={isBuyerModalOpen}
                        onClose={() => setIsBuyerModalOpen(false)}
                        fileList={["https://domain.com/file_name.pdf"]}
                      /> */}
                    </div>

                    <div
                      className={`tab-pane fade ${
                        activeTab === "Manage Users" ? "show active" : ""
                      }`}
                      id="pills-ManageUsers"
                      role="tabpanel"
                      aria-labelledby="pills-ManageUsers-tab"
                    >
                      {users?.user.role === "moderator" && (
                        <div className="profile_content">
                          <div className="row">
                            <div className="col-12">
                              <h3 className="font_20 font_600 mb-2">
                                Manage Users
                              </h3>
                              <div className="card_box box-shadow">
                                <ManageModerator />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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

import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import TitleOrFileUpdateModal from "../../Page/TitleOrFileUpdateModal";
import Loading from "../../Page/Loading/Loading";
import { MoreGenerateSuggestion } from "./ContentServices";

const ContentGenerationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [generateKeywordDetails, setGenerateKeywordDetails] = useState<any>({});
  const [FormPreDetails, setFormPreDetails] = useState<any>(null);
  const [sections, setSections] = useState<any>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editSection, setEditSection] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitleValue, setModalTitleValue] = useState<string>("");
  const [Message, setMessage] = useState<string>("");
  const [loadingData, setloadingData] = useState<boolean>(false);

  // console.log(generateKeywordDetails, "generateKeywordDetails");

  useEffect(() => {
    if (location.state) {
      const storedData = localStorage.getItem("keywordToolResult");

      const formDataDetail = localStorage.getItem("FormDataDetails");
      if (formDataDetail) {
        const parsedFormData = JSON.parse(formDataDetail);
        setFormPreDetails(parsedFormData);
      }
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        const updatedData = {
          ...parsedData,
          data: {
            ...parsedData.data,
            id: "12",
          },
        };
        localStorage.setItem("keywordToolResult", JSON.stringify(updatedData));
        setGenerateKeywordDetails(updatedData);
        setSections(updatedData?.data?.Sections);
      }
    }
  }, [location.state]);

  const handleEdit = (section: any) => {
    setEditSection(section);
    setEditModalOpen(true);
  };

  const handleDelete = (sectionId: any) => {
    const updatedSections = sections.filter(
      (section: any) => section.section_id !== sectionId
    );
    setSections(updatedSections);
    updateLocalStorage(updatedSections);
    toast.success("Suggestion Deleted successfully");
  };

  const handleSaveEdit = () => {
    if (Message === "Add More") {
      const updatedData = {
        ...generateKeywordDetails,
        data: {
          ...generateKeywordDetails.data,
          Sections: [...sections, editSection],
        },
      };
      toast.success("Suggestion Added successfully");
      setSections((prevSections: any[]) => [...prevSections, editSection]);
      localStorage.setItem("keywordToolResult", JSON.stringify(updatedData));
      setGenerateKeywordDetails(updatedData);
    } else {
      const updatedSections = sections.map((section: any) =>
        section.section_id === editSection?.section_id ? editSection : section
      );
      setSections(updatedSections);
      updateLocalStorage(updatedSections);
      toast.success("Suggestion updated successfully");
    }
    setEditModalOpen(false);
  };

  const updateLocalStorage = (updatedSections: any) => {
    const updatedData = {
      ...generateKeywordDetails,
      data: {
        ...generateKeywordDetails.data,
        Sections: updatedSections,
      },
    };
    localStorage.setItem("keywordToolResult", JSON.stringify(updatedData));
    setGenerateKeywordDetails(updatedData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editSection) return;

    setEditSection({
      ...editSection,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenModal = async (data: string) => {
    setShowModal(true);
    console.log(data, "data");
    setModalTitleValue(data);
    setMessage("Update FileName");
  };

  const handleOpenTitleModal = async (data: string) => {
    setShowModal(true);
    setModalTitleValue(data);
    setMessage("Update Title");
  };

  const handleOpenIntroModal = async (data: string) => {
    setShowModal(true);
    setModalTitleValue(data);
    setMessage("Update Introduction");
  };

  const handleSaveTitle = async () => {
    let updatedData = {};
    if (Message == "Update FileName") {
      updatedData = {
        ...generateKeywordDetails,
        filename: modalTitleValue,
      };
      toast.success("Filename updated successfully");
    } else if (Message == "Update Introduction") {
      updatedData = {
        ...generateKeywordDetails,

        data: {
          ...generateKeywordDetails.data,
          Introduction: modalTitleValue,
        },
      };
      toast.success("Introduction updated successfully");
    } else {
      updatedData = {
        ...generateKeywordDetails,

        data: {
          ...generateKeywordDetails.data,
          Title: modalTitleValue,
        },
      };
      toast.success("Title updated successfully");
    }

    localStorage.setItem("keywordToolResult", JSON.stringify(updatedData));
    setGenerateKeywordDetails(updatedData);
    setShowModal(false);
  };

  const handleTitleOrFilenameModalClose = () => {
    setShowModal(false);
    setModalTitleValue("");
    setMessage("");
  };

  const handleDeleteIntroduction = (id: any) => {
    if (generateKeywordDetails?.data?.id === id) {
      const updatedData = {
        ...generateKeywordDetails,
        data: {
          ...generateKeywordDetails.data,
          Introduction: undefined,
        },
      };
      localStorage.setItem("keywordToolResult", JSON.stringify(updatedData));
      setGenerateKeywordDetails(updatedData);
      toast.success("Introduction Deleted successfully");
    }
  };

  const handleAddMore = () => {
    const newSection = {
      section_id: Date.now(),
      Subheading: "",
      Content: "",
    };
    setMessage("Add More");
    setEditSection(newSection);
    setEditModalOpen(true);
  };

  const handleAddSection = async () => {
    try {
      const Instructions = FormPreDetails?.AddInstructions;
      const preUploadFile = FormPreDetails?.temp_file_path;

      const formData = new FormData();
      // formData.append("file_name", FileName);
      // formData.append("content_type", String(contentType));
      // formData.append("objectives", JSON.stringify(PostObjectives));
      // formData.append("audience", JSON.stringify(TargetAudience));
      // formData.append("links", JSON.stringify(links));
      formData.append("generated_blog", generateKeywordDetails);
      formData.append("text_data", Instructions);
      formData.append("file_path", preUploadFile);
      setloadingData(true);
      const response = await MoreGenerateSuggestion(formData);
      if (response.status === 200 || response.status === 201) {
        const newSectionsWithId = response.data.Sections.map(
          (section: any) => ({
            ...section,
            section_id: Math.floor(Math.random() * 1000000),
            color: "new",
          })
        );

        const updatedData = {
          ...generateKeywordDetails,
          data: {
            ...generateKeywordDetails.data,
            Sections: [
              ...(generateKeywordDetails.data.Sections || []),
              ...newSectionsWithId,
            ],
          },
        };

        // // Save updated section IDs for highlighting
        // const newIds = newSectionsWithId.map((section) => section.section_id);
        // setNewSectionIds(newIds);
        setSections([
          ...(generateKeywordDetails.data.Sections || []),
          ...newSectionsWithId,
        ]);
        localStorage.setItem("keywordToolResult", JSON.stringify(updatedData));
        setGenerateKeywordDetails(updatedData);
      }
    } catch (error) {
      console.log("Error during handleAddSection", error);
    } finally {
      setloadingData(false);
    }
  };

  const AddGenerate = async () => {
    try {
      setloadingData(true);
      const dataResult = generateKeywordDetails;
      localStorage.setItem("ClusterData", JSON.stringify(dataResult));
      navigate("/content/ContentSuggestionResult", { state: dataResult });
    } catch (error) {
      console.log("Error during AddGenerate", error);
    } finally {
      setloadingData(false);
    }
  };

  return (
    <>
      {loadingData && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="content_header mb-5">
            <h2 className="font_25 font_600 mb-2">
              <img
                src="/assets/images/content_icon.png"
                alt="icon"
                className="img-fluid heading_icon"
                style={{ marginRight: "10px" }}
              />
              Content Generator{" "}
              <span className="text_blue">
                /
                {generateKeywordDetails?.filename
                  ? generateKeywordDetails.filename.charAt(0).toUpperCase() +
                    generateKeywordDetails.filename.slice(1)
                  : ""}
              </span>
              <button
                className="btn font_16 pe-0"
                aria-label="edit_icon"
                onClick={() =>
                  handleOpenModal(generateKeywordDetails?.filename)
                }
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
            </h2>
          </div>

          {editModalOpen ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
              className="content_suggest_edit"
            >
              <div className="row justify-content-center">
                <div className="col-12 col-xl-7">
                  <div className="card_box box-shadow">
                    <button
                      className="btn text_orange font_20 px-0 close_btn"
                      type="button"
                      onClick={() => {
                        setEditModalOpen(false);
                        setEditSection({});
                        setMessage("");
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                    <div className="row gy-3">
                      <div className="col-12">
                        <label
                          htmlFor="generate_post_name"
                          className="font_20 font_500 mb-2"
                        >
                          Suggested paragraph name*
                        </label>
                        <input
                          type="text"
                          name="Subheading"
                          className="form-control"
                          value={editSection?.Subheading || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="post_msg"
                          className="font_20 font_500 mb-2"
                        >
                          Describe paragraph's content*
                        </label>
                        <textarea
                          name="Content"
                          className="form-control"
                          placeholder="Describe your message"
                          style={{ height: "120px" }}
                          value={editSection?.Content || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 text-center">
                        <button type="submit" className="btn primary_btn">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="content_draft_list">
              <div className="row">
                <div className="col-12 col-xl-7">
                  <div className="d-flex justify-content-between mb-3">
                    <h3 className="font_25 font_600 mb-0">Draft</h3>
                    <button className="btn primary_btn_outline">Edit</button>
                  </div>

                  {generateKeywordDetails && (
                    <div className="card draft_card box-shadow">
                      <div className="card-header mb-2">
                        <h4 className="font_20 font_600">
                          Title: {generateKeywordDetails?.data?.Title}
                          <button
                            className="btn font_16 pe-0"
                            aria-label="edit_icon"
                            onClick={() =>
                              handleOpenTitleModal(
                                generateKeywordDetails?.data?.Title
                              )
                            }
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </button>
                        </h4>
                      </div>

                      <div className="card-body">
                        <div className="content_item_wrapper">
                          {generateKeywordDetails?.data?.Introduction !==
                            undefined && (
                            <div className="content_item_box">
                              <div className="content_item_header">
                                <h5 className="font_20 mb-0">Introduction</h5>

                                <div className="content_right_btn">
                                  <button
                                    className="btn font_16 p-0"
                                    aria-label="edit_icon"
                                    onClick={() =>
                                      handleOpenIntroModal(
                                        generateKeywordDetails?.data
                                          ?.Introduction
                                      )
                                    }
                                  >
                                    <i className="bi bi-pencil-fill"></i>
                                  </button>
                                  <button
                                    className="btn p-0 text_orange font_20"
                                    aria-label="remove_icon"
                                    onClick={() =>
                                      handleDeleteIntroduction(
                                        generateKeywordDetails?.data?.id
                                      )
                                    }
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="content_body">
                                <p className="font_16">
                                  {" "}
                                  {generateKeywordDetails?.data?.Introduction}
                                </p>
                              </div>
                            </div>
                          )}
                          {sections?.map((section: any) => (
                            <div
                              className={`content_item_box ${
                                section.color === "new" ? "new-section" : ""
                              }`}
                              key={section.section_id}
                            >
                              <div className="content_item_header">
                                <h5 className="font_20 mb-0">
                                  {section.Subheading}
                                </h5>
                                <div className="content_right_btn">
                                  <button
                                    className="btn font_16 p-0"
                                    aria-label="edit_icon"
                                    onClick={() => handleEdit(section)}
                                  >
                                    <i className="bi bi-pencil-fill"></i>
                                  </button>
                                  <button
                                    className="btn p-0 text_orange font_20"
                                    aria-label="remove_icon"
                                    onClick={() =>
                                      handleDelete(section.section_id)
                                    }
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="content_body">
                                {/* <p className="font_16">{section.Content}</p> */}
                                <ReactMarkdown>{section.Content}</ReactMarkdown>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="content_suggest_btn">
                          <button
                            className="btn primary_btn_outline"
                            onClick={handleAddSection}
                          >
                            Suggest more
                          </button>
                          <button
                            className="btn primary_btn_outline"
                            onClick={handleAddMore}
                          >
                            Add more
                          </button>
                        </div>
                      </div>

                      <div className="card-footer text-center">
                        <button
                          className="btn primary_btn content_gen_btn"
                          onClick={AddGenerate}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <TitleOrFileUpdateModal
            showModal={showModal}
            modalTitleValue={modalTitleValue}
            setModalTitleValue={setModalTitleValue}
            onSave={handleSaveTitle}
            onClose={handleTitleOrFilenameModalClose}
            message={Message}
          />
        </div>
      </main>
    </>
  );
};

export default ContentGenerationResult;

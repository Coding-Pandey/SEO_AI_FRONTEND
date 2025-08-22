import { useLocation, useNavigate } from "react-router-dom";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import TitleOrFileUpdateModal from "../../Page/TitleOrFileUpdateModal";
import Loading from "../../Page/Loading/Loading";
import {
  AddGenerateContent,
  GetFormDetails,
  MoreGenerateSuggestion,
} from "./ContentServices";
import { GetUploadedSourcefiles } from "../SocialMedia/Common/SocialMediaServices";
import ContentFormForSeo from "./ContentFormForSeo";
import { language_options, location_options } from "../../Page/store";

const ContentGeneratBySeo = () => {
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
  const [FormDynamictData, setFormDynamictData] = useState<any>({});
  const [contentType, setContentType] = useState<number | "">("");
  const [FileName, setFileName] = useState<string>("");
  const [PostObjectives, setPostObjectives] = useState<string[]>([]);
  const [TargetAudience, setTargetAudience] = useState<string[]>([]);
  const [AddInstructions, setAddInstructions] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [FileUrl, setFileUrl] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [linkInput, setLinkInput] = useState<string>("");
  const [links, setLinks] = useState<string[]>([]);
  const [EditFormOpen, setEditFormOpen] = useState<boolean>(true);
  const [UploadedSourcefiles, setUploadedSourcefiles] = useState<any>({});
  const [id, userid] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [country, setCountry] = useState<any>([]);
  const [language, setLanguage] = useState<string | null>(null);
  const [NewMessage, setNewMessage] = useState<string>("editContent");

  useEffect(() => {
    fetchGenerateData();
  }, []);

  const fetchGenerateData = async () => {
    try {
      setloadingData(true);
      const responseSourcefiles = await GetUploadedSourcefiles();
      const responseForm = await GetFormDetails();
      if (responseForm.status === 200 || responseForm.status === 201) {
        setFormDynamictData(responseForm.data);
        setUploadedSourcefiles(responseSourcefiles.data);
      }
    } catch (error: any) {
      console.error("Error fetchPPCClusterData:", error);
    } finally {
      setloadingData(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      const newData = location.state;
      setFileName(newData?.items?.Page_Title);
      userid(newData?.id);
      const extractedKeywords = newData?.items?.Keywords.map(
        (k: any) => k.Keyword
      );
      setKeywords(extractedKeywords);
      const LanguageAndCountryData = newData;
      setLanguage(String(LanguageAndCountryData.language.ID));
      setNewMessage("editContent");
      const mappedCountries = location_options
        .filter((loc) =>
          LanguageAndCountryData.country.some((c: any) => c.id === loc.id)
        )
        .map((loc) => ({ value: loc.id, label: loc.country }));

      setCountry(mappedCountries);
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
      formData.append("generated_blog", JSON.stringify(generateKeywordDetails));
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContentType(Number(e.target.value));
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setPostObjectives((prev) => {
      let updatedObjectives;
      if (checked) {
        updatedObjectives = [...prev, value];
      } else {
        updatedObjectives = prev.filter((item) => item !== value);
      }
      return updatedObjectives;
    });
  };

  const handleTargetAudience = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setTargetAudience((prev) => {
      let updatedObjectives;
      if (checked) {
        updatedObjectives = [...prev, value];
      } else {
        updatedObjectives = prev.filter((item) => item !== value);
      }
      return updatedObjectives;
    });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files) return;

  //   // Filter accepted files: .doc, .docx only
  //   const allowedExtensions = /(\.doc|\.docx)$/i;
  //   const validFiles = Array.from(files).filter((file) =>
  //     allowedExtensions.test(file.name)
  //   );

  //   if (validFiles.length !== files.length) {
  //     toast.error("Only .doc and .docx files are allowed");
  //   }

  //   setUploadedFiles((prev) => [...prev, ...validFiles]);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedExtensions = /(\.doc|\.docx)$/i;

    if (!allowedExtensions.test(file.name)) {
      toast.error("Only .doc and .docx files are allowed");
      return;
    }

    setUploadedFiles([file]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number, message: string) => {
    if (message === "fileurl") {
      setFileUrl((prev) => prev.filter((_, i) => i !== index));
    } else {
      setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddLink = () => {
    const trimmedLink = linkInput.trim();
    if (trimmedLink && !links.includes(trimmedLink)) {
      setLinks([...links, trimmedLink]);
      setLinkInput("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLink();
    }
  };

  const handleAddButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddLink();
  };

  const handleGenerateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!FileName) {
        toast.error("Please enter information page name");
        return;
      }
      if (!contentType) {
        toast.error("Please select contentType");
        return;
      }

      if (PostObjectives.length > 10) {
        toast.error("Please select a maximum of 10 post Objectives");
        return;
      }

      if (keywords.length <= 0) {
        toast.error("Please enter at least one keyword.");
        return;
      }

      if (
        !AddInstructions.trim() &&
        uploadedFiles.length === 0 &&
        FileUrl.length === 0
      ) {
        toast.error(
          "Please provide additional instructions or upload at least one file"
        );
        return;
      }

      setloadingData(true);
      const selectedCountries = location_options.filter((loc) =>
        country.some((c: any) => c.value === loc.id)
      );

      const selectedLanguage = language_options.find(
        (lang) => lang.ID === Number(language)
      );
      const formData = new FormData();
      formData.append("file_name", FileName);
      formData.append("content_type", String(contentType));
      formData.append("objectives", JSON.stringify(PostObjectives));
      formData.append("audience", JSON.stringify(TargetAudience));
      formData.append("text_data", AddInstructions);
      formData.append("language_id", JSON.stringify(selectedLanguage));
      formData.append("location_ids", JSON.stringify(selectedCountries));
      let newFileUpload;
      if (uploadedFiles.length > 0) {
        const file = uploadedFiles[0];
        formData.append("file", file);
        newFileUpload = file.name;
      }
      // if (FileUrl.length > 0){
      //   const tempFile = FileUrl[0];
      //   formData.append("temp_file_path", tempFile);
      // }
      formData.append("temp_file_path", generateKeywordDetails?.temp_file_path);
      formData.append("links", JSON.stringify(links));
      formData.append("keywords", JSON.stringify(keywords));
      const newFormData = {
        FileName,
        contentType,
        PostObjectives,
        TargetAudience,
        AddInstructions,
        uploadedFiles: newFileUpload,
        links,
        keywords,
        language: selectedLanguage?.ID,
        country: selectedCountries.map((c) => c.id),
      };
      const response = await AddGenerateContent(formData);
      if (response.status === 200 || response.status === 201) {
        const dataResult = response.data;
        const tempfile = {
          ...newFormData,
          temp_file_path: dataResult?.temp_file_path,
        };
        const updatedNewData = {
          ...dataResult,
          data: {
            ...dataResult.data,
            id: "12",
          },
        };
        localStorage.setItem(
          "keywordToolResult",
          JSON.stringify(updatedNewData)
        );
        setFormPreDetails(tempfile);
        setFileUrl([dataResult?.temp_file_path]);
        setGenerateKeywordDetails(updatedNewData);
        setSections(updatedNewData?.data?.Sections);
        setEditFormOpen(false);
        toast.success("Updated Successfully");
      }
    } catch (error: any) {
      console.error("Error handle Generate Submit:", error);
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
                {FileName
                  ? FileName.charAt(0).toUpperCase() + FileName.slice(1)
                  : ""}
              </span>
            </h2>
          </div>
          {EditFormOpen ? (
            <div className="generate_post_form keyword_search_form">
              <div className="row justify-content-center gy-3">
                <div className="col-12 col-xl-7 card_box box-shadow p-0">
                  <div className="text-end">
                    <button
                      className="btn text_orange font_20 close_btn"
                      aria-label="remove_icon"
                      onClick={() =>
                        navigate(`/seo/SuggestionsResultById/${id}`)
                      }
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                  <ContentFormForSeo
                    contentType={String(contentType)}
                    PostObjectives={PostObjectives}
                    TargetAudience={TargetAudience}
                    AddInstructions={AddInstructions}
                    uploadedFiles={uploadedFiles}
                    FileUrl={FileUrl}
                    linkInput={linkInput}
                    links={links}
                    FormDynamictData={FormDynamictData}
                    handleSelectChange={handleSelectChange}
                    handleObjectiveChange={handleObjectiveChange}
                    handleTargetAudience={handleTargetAudience}
                    setAddInstructions={setAddInstructions}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    handleRemoveFile={handleRemoveFile}
                    handleInputChange={handleInputChanges}
                    handleKeyDown={handleKeyDown}
                    handleAddButtonClick={handleAddButtonClick}
                    handleRemoveLink={handleRemoveLink}
                    handleGenerateSubmit={handleGenerateSubmit}
                    UploadedSourcefiles={UploadedSourcefiles}
                    keywords={keywords}
                    setKeywords={setKeywords}
                    keywordInput={keywordInput}
                    setKeywordInput={setKeywordInput}
                    language={language}
                    setLanguage={setLanguage}
                    country={country}
                    setCountry={setCountry}
                    NewMessage={NewMessage}
                  />
                </div>
              </div>
            </div>
          ) : editModalOpen ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMessage("Suggest More");
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
                    <button
                      className="btn primary_btn_outline"
                      onClick={() => setEditFormOpen(true)}
                    >
                      Edit
                    </button>
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
                                section.color === "new" ? "active" : ""
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

export default ContentGeneratBySeo;

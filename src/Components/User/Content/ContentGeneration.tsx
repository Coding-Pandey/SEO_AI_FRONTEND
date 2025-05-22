import { toast } from "react-toastify";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import Loading from "../../Page/Loading/Loading";
import PreviouslyCreatedPosts from "../../Page/PreviouslyCreatedPosts";
import {
  deleteContentPreviousList,
  GetContentPreviousList,
} from "./ContentServices";

interface contentData {
  uuid: string;
  file_name: string;
  last_reset: string;
}
const ContentGeneration = () => {
  const navigate = useNavigate();
  const [ContentData, setContentData] = useState<contentData[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [contentType, setContentType] = useState<string>("");
  const [FileName, setFileName] = useState<string>("");
  const [PostObjectives, setPostObjectives] = useState<string[]>([]);
  const [TargetAudience, setTargetAudience] = useState<string[]>([]);
  const [AddInstructions, setAddInstructions] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [linkInput, setLinkInput] = useState<string>("");
  const [links, setLinks] = useState<string[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setContentType(selectedValue);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Filter accepted files: .doc, .docx only
    const allowedExtensions = /(\.doc|\.docx)$/i;
    const validFiles = Array.from(files).filter((file) =>
      allowedExtensions.test(file.name)
    );

    if (validFiles.length !== files.length) {
      toast.error("Only .doc and .docx files are allowed");
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    fetchPPCClusterData();
  }, []);

  const fetchPPCClusterData = async () => {
    try {
      setLoadingData(true);
      const response = await GetContentPreviousList();
      if (response.status === 200 || response.status === 201) {
        setContentData(response.data);
      }
    } catch (error: any) {
      setLoadingData(false);
      console.error("Error fetchPPCClusterData:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this file?"
      );
      if (!isConfirmed) {
        return;
      }
      const formData = { uuid };
      const response = await deleteContentPreviousList(formData);
      if (response.status === 200) {
        setContentData((prevData) =>
          prevData.filter((item) => item.uuid !== uuid)
        );
        toast.success("File successfully deleted!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      toast.error("Failed to delete file.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleNavigate = (id: string) => {
    navigate(`/ppc/ContentGenerationById/${id}`);
  };

  return (
    <>
      {loadingData && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content generate_post create_content">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <img
                  src="/assets/images/content_icon.png"
                  alt="icon"
                  className="img-fluid heading_icon"
                />
                Content Generator{" "}
                {/* <span className="text_blue">/ Research number one</span> */}
              </h2>
            </div>

            <div className="generate_post_form keyword_search_form">
              <div className="row gy-3">
                {/* Left Panel */}
                <PreviouslyCreatedPosts
                  posts={ContentData}
                  onDelete={handleDelete}
                  onNavigate={handleNavigate}
                />

                {/* Right Form Panel */}
                <div className="col-12 col-xl-7">
                  <form>
                    {!contentType ? (
                      <div className="row content_select mb-3">
                        <div className="col-12">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={contentType}
                            onChange={handleSelectChange}
                          >
                            <option value="">Content Type</option>
                            <option value="Information Page">
                              Information Page
                            </option>
                            <option value="Blog article">Blog article</option>
                            <option value="Press Releases & News Pages">
                              Press Releases & News Pages
                            </option>
                            <option value="Case Study Pages">
                              Case Study Pages
                            </option>
                            <option value="FAQs">FAQs</option>
                            <option value="Campaign Landing Pages">
                              Campaign Landing Pages
                            </option>
                            <option value="Product description">
                              Product description
                            </option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <>
                        {PostObjectives?.length > 10 && (
                          <p className="keyword_error font_16">
                            Error: Limit Reached: Please enter no more than 10
                            keywords
                          </p>
                        )}

                        <div className="row content_type">
                          <div className="col-12">
                            <label
                              htmlFor="generate_post_name"
                              className="font_20 font_500 mb-2"
                            >
                              Name your information page*
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="generate_post_name"
                              placeholder="Enter Page Name"
                              value={FileName}
                              onChange={(e) => setFileName(e.target.value)}
                            />
                          </div>

                          <div className="col-12">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={contentType}
                              onChange={handleSelectChange}
                            >
                              <option value="Information Page">
                                Information Page
                              </option>
                              <option value="Blog article">Blog article</option>
                              <option value="Press Releases & News Pages">
                                Press Releases & News Pages
                              </option>
                              <option value="Case Study Pages">
                                Case Study Pages
                              </option>
                              <option value="FAQs">FAQs</option>
                              <option value="Campaign Landing Pages">
                                Campaign Landing Pages
                              </option>
                              <option value="Product description">
                                Product description
                              </option>
                            </select>
                          </div>

                          {/* Post Objective */}
                          <div className="col-12">
                            <div className="multicheckbox">
                              <div
                                className={`form_input ${
                                  PostObjectives?.length > 10
                                    ? "error-border"
                                    : ""
                                }`}
                              >
                                <h3 className="font_20 font_500 mb-3">
                                  Define Post Objective
                                </h3>
                                <div className="row mb-2">
                                  {[
                                    "Educate the Audience",
                                    "Facilitate Next Steps",
                                    "Establish Credibility",
                                    "Guide Decision-Making",
                                    "Compare & Contrast",
                                    "Support Brand Voice & Tone",
                                    "Drive Engagement",
                                    "Demonstrate Authority",
                                  ].map((label, index) => {
                                    const value = label
                                      .toLowerCase()
                                      .replace(/\s+/g, "_");
                                    return (
                                      <div
                                        className="col-12 col-lg-6"
                                        key={index}
                                      >
                                        <input
                                          type="checkbox"
                                          id={`objective${index}`}
                                          name={`objective${index}`}
                                          value={value}
                                          checked={PostObjectives.includes(
                                            value
                                          )}
                                          onChange={handleObjectiveChange}
                                        />
                                        <label
                                          htmlFor={`objective${index}`}
                                          className="font_16 ms-1"
                                        >
                                          {label}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Target Audience */}
                              <div className="form_input">
                                <h3 className="font_20 font_500 mb-3">
                                  Target Audience
                                </h3>
                                <div className="row mb-2">
                                  {[
                                    "Buyer Persona 1 - First Last Name",
                                    "Buyer Persona 2 - First Last Name",
                                    "Buyer Persona 3 - First Last Name",
                                    "General Industry Audience",
                                  ].map((label, index) => (
                                    <div className="col-12" key={index}>
                                      <input
                                        type="checkbox"
                                        id={`persona${index}`}
                                        name={`persona${index}`}
                                        value={label}
                                        checked={TargetAudience.includes(label)}
                                        onChange={handleTargetAudience}
                                      />
                                      <label
                                        htmlFor={`persona${index}`}
                                        className="font_16 ms-1"
                                      >
                                        {label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Textarea */}
                          <div className="col-12">
                            <label
                              htmlFor="post_msg"
                              className="font_20 font_500 mb-2"
                            >
                              Add more context/ instructions
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Describe your message"
                              id="post_msg"
                              style={{ height: "120px" }}
                              value={AddInstructions}
                              onChange={(e) =>
                                setAddInstructions(e.target.value)
                              }
                            ></textarea>
                          </div>

                          {/* File Upload */}
                          <div className="col-12">
                            <label
                              htmlFor="post_upload"
                              className="font_20 font_500 mb-2"
                            >
                              Upload Campaign Files
                            </label>
                            <div className="doc_file_wrapper">
                              <input
                                className="form-control upload_input"
                                type="file"
                                id="post_upload"
                                accept=".doc,.docx"
                                multiple
                                onChange={handleFileChange}
                              />
                              <div className="doc_left">
                                <p className="font_16 mb-1">
                                  Drag and drop files here or{" "}
                                  <span className="text_blue">browse</span> to
                                  upload
                                </p>
                              </div>
                            </div>

                            <ul className="upload_content_item file_upload_list">
                              {uploadedFiles.map((file, index) => (
                                <li key={index}>
                                  <span>
                                    <i className="bi bi-file-earmark-doc-fill me-1"></i>{" "}
                                    {file.name}
                                  </span>
                                  <button
                                    className="btn text_orange font_20 pe-0"
                                    aria-label="remove_icon"
                                    onClick={() => handleRemoveFile(index)}
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="col-12">
                            <label
                              htmlFor="add_link"
                              className="font_20 font_500 mb-2"
                            >
                              Add Links
                            </label>
                            <div className="add_link_wrapper">
                              <input
                                className="form-control link_input"
                                type="text"
                                id="add_link"
                                value={linkInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter URL here"
                              />
                              <button
                                className="btn primary_btn_outline"
                                onClick={handleAddButtonClick}
                                type="button"
                              >
                                Add
                              </button>
                            </div>

                            <ul className="upload_content_item links_upload_list">
                              {links.map((link, index) => (
                                <li key={index}>
                                  <span>
                                    <i className="bi bi-link me-1"></i> {link}
                                  </span>
                                  <button
                                    className="btn text_orange font_20 pe-0"
                                    aria-label="remove_icon"
                                    onClick={() => handleRemoveLink(index)}
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="col-12">
                            <button className="btn primary_btn">
                              Generate
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContentGeneration;

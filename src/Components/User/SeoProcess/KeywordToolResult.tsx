import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { KeyboardEvent, useEffect, useState } from "react";
import Select from "react-select";
import { language_options, location_options } from "../../Page/store";
import { toast } from "react-toastify";
import Loading from "../../Page/Loading/Loading";
import { SEOClusterKeywordService, SEOGenerateKeyword } from "./SeoServices";
import { capitalizeFirstLetter } from "./Reports";
import FileNameUpdateModal from "../../Page/FileNameUpdateModal";

const KeywordToolResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [generateKeywordDetails, setGenerateKeywordDetails] = useState<any[]>(
    []
  );
  const [volume, setVolume] = useState<number>(0);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [country, setCountry] = useState<any>([]);
  const [language, setLanguage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [brandedWords, setBrandedWords] = useState<boolean>(false);
  const [includeKeywords, setIncludeKeywords] = useState<string[]>([]);
  const [includeInput, setIncludeInput] = useState<string>("");
  const [FileNameData, setFileNameData] = useState<any>({});
  const [content, setContent] = useState<string>("");
  const [ShowFileModal, setShowFileModal] = useState<boolean>(false);
  const handleIncludeKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = includeInput.trim();
      if (trimmed && !includeKeywords.includes(trimmed)) {
        setIncludeKeywords([...includeKeywords, trimmed]);
      }
      setIncludeInput("");
    }
  };

  const removeIncludeKeyword = (index: number) => {
    setIncludeKeywords(includeKeywords.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (location.state) {
      const storedData = localStorage.getItem("keywordToolResult");
      const fileNameData = localStorage.getItem("fileNameData");
      if (storedData && fileNameData) {
        setGenerateKeywordDetails(JSON.parse(storedData));
        setFileNameData(JSON.parse(fileNameData));
      }
    }
  }, [location.state]);

  const handleDeleteKeyword = (index: number) => {
    const updatedKeywords = [...generateKeywordDetails];
    updatedKeywords.splice(index, 1);
    setGenerateKeywordDetails(updatedKeywords);
    localStorage.setItem("keywordToolResult", JSON.stringify(updatedKeywords));
    toast.success("Keyword deleted successfully!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword(input);
    }
  };

  const addKeyword = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords((prev) => [...prev, trimmed]);
    }
    setInput("");
  };

  const removeKeyword = (index: number) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const locationOptions = location_options.map((location) => ({
    value: location.id,
    label: location.country,
  }));

  const closeModal = () => {
    setIsModalOpen(false);
    setInput("");
    setDescription("");
    setKeywords([]);
    setCountry([]);
    setLanguage(null);
  };

  const handleSubmit = async () => {
    const selectedLocationIds = country.map((c: any) => c.value);
    const selectedLanguageId = Number(language);

    const formData = {
      keywords: keywords.join(","),
      description: description,
      language_id: selectedLanguageId,
      location_ids: selectedLocationIds,
    };

    setLoading(true);
    try {
      const SEOGenerateResponse = await SEOGenerateKeyword(formData);
      if (
        SEOGenerateResponse.status === 201 ||
        SEOGenerateResponse.status === 200
      ) {
        const resultData = SEOGenerateResponse.data;

        // Add flag for new result to highlight
        const updatedResultData = resultData.map((item: any) => ({
          ...item,
          isNew: true, // custom flag to show blue border
        }));

        const finalData = [...updatedResultData, ...generateKeywordDetails];

        // Update local storage and state
        localStorage.setItem("keywordToolResult", JSON.stringify(finalData));
        setGenerateKeywordDetails(finalData);
        closeModal();
      }
    } catch (error: any) {
      console.log("error fetching handleSubmit", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandedWords(e.target.value === "Branding Keywords");
  };

  const handleSuggestPages = async () => {
    const filteredData = generateKeywordDetails.filter(
      (item) => item.Avg_Monthly_Searches >= volume
    );
    const limitedData = filteredData.slice(0, 50);

    setLoadingSuggestion(true);
    const finalKeywords =
      includeKeywords.length > 0
        ? includeKeywords
        : includeInput.trim() !== ""
        ? [includeInput.trim()]
        : [];

    const newData = {
      file_name:FileNameData?.fileName,
      keywords: limitedData,
      delete_word: {
        branded_words: brandedWords,
        branded_keyword: finalKeywords,
      },
    };

    try {
      const SEOClusterResponse = await SEOClusterKeywordService(newData);
      if (
        SEOClusterResponse.status === 201 ||
        SEOClusterResponse.status === 200
      ) {
        const id = SEOClusterResponse.data.uuid;
        navigate(`/seo/SuggestionsResultById/${id}`);
        //  const ClusterData = SEOClusterResponse.data;
        // localStorage.setItem("ClusterData", JSON.stringify(ClusterData));
        // navigate("/seo/KeywordsSuggestionsResult", { state: ClusterData });
        // setLoadingSuggestion(false);
      }
    } catch (error: any) {
      console.log("error fetching handleSuggestPages", error);
    } finally {
      setLoadingSuggestion(false);
    }
  };

  const handleChangeFilename = async () => {
    if (!content.trim()) {
      toast.warning("Please enter a Filename");
      return;
    }
    try {
      const updatedFileNameData = { fileName: content };
      localStorage.setItem("fileNameData", JSON.stringify(updatedFileNameData));
      setFileNameData(updatedFileNameData);
      setShowFileModal(false);
      toast.success("Filename updated successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error: any) {
      console.error("Error updating title:", error);
    }
  };

  const handleCloseFileModel = () => {
    setShowFileModal(false);
  };

  return (
    <>
      {loadingSuggestion && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-search me-1 font_20 text-primary"></i>{" "}
                Keyword Manager /{" "}
                <span style={{ fontSize: "18px", fontWeight: 600,color:"rgb(72, 114, 183)" }}>
                  {FileNameData?.fileName
                    ? capitalizeFirstLetter(FileNameData.fileName)
                    : ""}
                </span>
                <span
                  className="heading_edit"
                  onClick={() => {
                    setShowFileModal(true);
                    setContent(FileNameData.fileName);
                  }}
                >
                  <i
                    className="bi bi-pencil-fill"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
                {ShowFileModal && (
                  <FileNameUpdateModal
                    content={content}
                    setContent={setContent}
                    handleClose={handleCloseFileModel}
                    handleSave={handleChangeFilename}
                  />
                )}
              </h2>
            </div>
            <div className="keyword_search_results">
              <div className="search_filter">
                <div className="row align-items-center gy-3">
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-input search_volume">
                      <label
                        htmlFor="keyword_volume"
                        className="form-label font_14 mb-0"
                      >
                        Search Volume:
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        id="keyword_volume"
                        min={0}
                        max={500}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                      />
                      <span>{volume}</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-8 col-xl-4">
                    <div className="exclue_include_wrapper">
                      <select
                        className="form-select"
                        id="excludeKeyword"
                        aria-label="Exclude Keyword"
                        onChange={handleSelectChange}
                      >
                        <option value="">Exclude</option>
                        <option value="Branding Keywords">
                          Branding Keywords
                        </option>
                        {/* <option value="2">Option 2</option>
                          <option value="3">Option 3</option> */}
                      </select>

                      {/* <select
                          className="form-select"
                          id="includeKeyword"
                          aria-label="Include Keyword"
                        >
                          <option value="">Include</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select> */}

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Include"
                        style={{ color: "black" }}
                        value={includeInput}
                        onChange={(e) => setIncludeInput(e.target.value)}
                        onKeyDown={handleIncludeKeyDown}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-12 col-xl-4">
                    <div className="result_btn_wrapper">
                      <button
                        type="button"
                        className="btn primary_btn add_more"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Add More Keywords
                      </button>
                      <button
                        className="btn primary_btn suggest_page"
                        onClick={() => handleSuggestPages()}
                      >
                        Suggest Pages
                      </button>
                    </div>
                  </div>
                </div>
                {includeKeywords.length > 0 && (
                  <div
                    className="mb-2 p-2 form-control mt-3"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "2px solid #e7e7e7",
                      borderRadius: "5px",
                    }}
                  >
                    {includeKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="primary_btn  badge mx-1 px-2 py-1 "
                      >
                        {keyword}{" "}
                        <i
                          className="bi bi-x ms-1 "
                          style={{ cursor: "pointer" }}
                          onClick={() => removeIncludeKeyword(index)}
                        ></i>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="result_keyword box-shadow">
                <div className="row">
                  {generateKeywordDetails.length > 0 ? (
                    generateKeywordDetails.map((item: any, index: any) => (
                      <div className="col-12 col-md-6 col-lg-4" key={index}>
                        <div
                          className={`keyword_item
              ${
                item.Avg_Monthly_Searches < volume
                  ? "red-border"
                  : item.isNew
                  ? "active"
                  : ""
              }
            `}
                        >
                          <p className="font_16 mb-0">{item.Keyword}</p>
                          <div className="font_16">
                            <span>{item.Avg_Monthly_Searches}</span>
                            <i
                              className="bi bi-x"
                              onClick={() => handleDeleteKeyword(index)}
                              style={{ cursor: "pointer" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p>No keywords found</p>
                    </div>
                  )}
                </div>
              </div>

              {isModalOpen && (
                <div
                  className="modal d-block"
                  role="dialog"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="font_25 font_600 mb-2">
                          <i className="bi bi-search me-1 font_20"></i> Keyword
                          Manager
                        </h2>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={closeModal}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="row mx-0 gy-3">
                          <div className="col-12">
                            <div className="keyword_tool_right">
                              <p className="font_16 mb-0">
                                Enter up to 10 keywords in the field. Separate
                                each keyword with a comma or press Enter after
                                each one. After entering your keywords, click{" "}
                                <span className="font_500">
                                  "Start Research"
                                </span>{" "}
                                to proceed with your search.
                              </p>
                            </div>
                          </div>

                          <div className="col-12">
                            <form>
                              {keywords.length > 10 && (
                                <p className="keyword_error font_16 text-danger bg-danger-subtle p-2">
                                  Error: Limit Reached. Please enter no more
                                  than 10 keywords.
                                </p>
                              )}
                              {keywords.length > 0 && (
                                <div
                                  className="mb-2 p-2 form-control mb-2"
                                  style={{
                                    backgroundColor: "#ffffff",
                                    border: "2px solid #e7e7e7",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <div className="d-flex flex-wrap gap-2">
                                    {keywords.map((keyword, index) => (
                                      <span
                                        key={index}
                                        className={`badge d-flex align-items-center p-2 ${
                                          index < 10
                                            ? "bg-light-green"
                                            : "bg-danger text-white"
                                        }`}
                                        style={{
                                          borderRadius: "5px",
                                        }}
                                      >
                                        {keyword}
                                        <button
                                          type="button"
                                          onClick={() => removeKeyword(index)}
                                          className={`btn-close btn-sm ms-2  ${
                                            index < 10
                                              ? "text-green"
                                              : "text-white"
                                          }`}
                                          aria-label="Remove"
                                        ></button>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="row">
                                <div className="col-12">
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Enter keywords (press Enter or comma to add)"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                  />
                                </div>
                                <div className="col-12">
                                  <textarea
                                    className="form-control"
                                    placeholder="Product/Service Description"
                                    id="key_tool_description"
                                    style={{ height: "100px" }}
                                    value={description}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  ></textarea>
                                </div>

                                <div className="col-6">
                                  <div className="form_input">
                                    <Select
                                      options={locationOptions}
                                      value={country}
                                      onChange={setCountry}
                                      isMulti
                                      placeholder="Select Target Country"
                                    />
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="targetLanguage"
                                      aria-label="target_language"
                                      onChange={(e) =>
                                        setLanguage(e.target.value)
                                      }
                                    >
                                      <option value="">Language</option>
                                      {language_options.map((language) => (
                                        <option
                                          key={language.ID}
                                          value={language.ID}
                                        >
                                          {language.Name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-6">
                                  <button
                                    type="button"
                                    className="btn primary_btn mt-2"
                                    onClick={handleSubmit}
                                    disabled={
                                      (keywords.length === 0 &&
                                        input.trim() === "") ||
                                      keywords.length > 10 ||
                                      country.length === 0 ||
                                      !language
                                    }
                                  >
                                    {loading ? "Please wait..." : "Start"}
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default KeywordToolResult;

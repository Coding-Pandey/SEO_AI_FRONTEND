 import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { KeyboardEvent, useEffect, useState } from "react";
import Select from "react-select";
import { language_options, location_options } from "../../Page/store";
import { SEOPPCClusterKeywordService, SEOPPCGenerateKeyword } from "../Services/Services";
import { toast } from "react-toastify";
import Loading from '../../Page/Loading/Loading';

const CreateCampaignKeywordResult = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(generateKeywordDetails)
  useEffect(() => {
    if (location.state) {
      const storedData = localStorage.getItem("keywordToolResult");
      if (storedData) {
        setGenerateKeywordDetails(JSON.parse(storedData));
      }
    } 
  }, [location.state]);

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
      const SEOGenerateResponse = await SEOPPCGenerateKeyword(formData);
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
      const status = error.response?.status;
      const message = (error.response?.data as any)?.detail;
      if (status === 401) {
        toast.error(message, { position: "top-right", autoClose: 3000 });
        navigate("/Logout");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveKeyword = (keyword:string) => {
    const updatedKeywords = generateKeywordDetails.filter((keywordDetail) => keywordDetail.Keyword !== keyword);
    setGenerateKeywordDetails(updatedKeywords);
    localStorage.setItem('keywordToolResult', JSON.stringify(updatedKeywords));
    toast.success("Keyword deleted successfully!", { position: "top-right", autoClose: 1000 });
  };
  
  const handleSuggestPages = async() => {
    const filteredData = generateKeywordDetails.filter(
      (item) => item.Avg_Monthly_Searches >= volume
    );
    const limitedData = filteredData.slice(0, 10);
 
    const cleanedData = limitedData.map(({ isNew, ...rest }) => rest);
 
    setLoadingSuggestion(true);
    try {
      const SEOClusterResponse = await SEOPPCClusterKeywordService(cleanedData);
      if (
        SEOClusterResponse.status === 201 ||
        SEOClusterResponse.status === 200
      ) {
        const ClusterData = SEOClusterResponse.data;
       console.log(ClusterData,"ClusterData")
       localStorage.setItem("ClusterData", JSON.stringify(ClusterData));
        navigate("/ppc/CreateCampaignSuggestionResult", { state: ClusterData });
        setLoadingSuggestion(false);
      }
    } catch (error: any) {
      const status = error.response?.status;
      const message = (error.response?.data as any)?.detail;
      if (status === 401) {
        toast.error(message, { position: "top-right", autoClose: 3000 });
        navigate("/Logout");
      }
    } finally {
      setLoadingSuggestion(false);
    }
  };

  return (
    <>
    {loadingSuggestion && <Loading/>}
    <Header />
    <main className="main_wrapper">
      <SideBar />
      <div className="inner_content ">
        <div className="keyword_tool_content">
          <div className="content_header mb-4">
            <h2 className="font_25 font_600 mb-2">
              <i className="bi bi-search me-1 font_20 text-primary"></i>{" "}
                Keyword Manager -{" "}
              <span style={{ fontSize: "18px", fontWeight: 600 }}>
                Search Results
              </span>
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
                  <div className="col-12 col-md-6 col-xl-3">
                    <div className="exclue_include_wrapper">
                      <select
                        className="form-select"
                        id="excludeKeyword"
                        aria-label="Exclude Keyword"
                      >
                        <option defaultValue="">Exclude</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>

                      <select
                        className="form-select"
                        id="includeKeyword"
                        aria-label="Include keyword"
                      >
                        <option defaultValue="">Include</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-xl-5">
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
                        <button className="btn primary_btn suggest_page" onClick={() => handleSuggestPages()} >
                          Suggest Pages
                        </button>
                      </div>
                    </div>
                </div>
              </div>
              <div className="result_keyword box-shadow">
                <div className="result_table_wrapper table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Keyword</th>
                        <th scope="col">Avg Monthly Searches (UK)</th>
                        <th scope="col">Competition (UK)</th>
                        <th scope="col">Low Top Of PageBid (€)</th>
                        <th scope="col">High Top Of PageBid (€)</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>  
             {generateKeywordDetails.map((keywordDetail, index) => (
               
              <tr key={index} className={`
                ${
                  keywordDetail.Avg_Monthly_Searches < volume
                    ? "red-border-ppc"
                    : keywordDetail.isNew
                    ? "active"
                    : ""
                } 
              `}>
                <td>{keywordDetail.Keyword}</td>
                <td>{keywordDetail.Avg_Monthly_Searches}</td>
                <td>{keywordDetail.Competition}</td>
                <td>{keywordDetail.LowTopOfPageBid}</td>
                <td>{keywordDetail.HighTopOfPageBid}</td>
                <td>
                  <span className="remove_key">
                    <i className="bi bi-x" onClick={() => handleRemoveKeyword(keywordDetail.Keyword)}></i>
                  </span>
                </td>
              </tr>
             ))}
                </tbody>    
                  </table>
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
                            <i className="bi bi-search me-1 font_20"></i>{" "}
                            Keyword Manager
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
                                        (keywords.length === 0 && input.trim() === "") ||
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
  )
}

export default CreateCampaignKeywordResult
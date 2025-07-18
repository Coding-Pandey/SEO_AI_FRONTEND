import { useState, KeyboardEvent, useEffect } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { language_options, location_options } from "../../Page/store";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Page/Loading/Loading";
import PreviouslyCreatedPosts from "../../Page/PreviouslyCreatedPosts";
import {
  SEOPPCGenerateKeyword,
  GetPpcClusterData,
  deletePpcClusterData,
} from "./PpcServices";

interface PpcCluster {
  uuid: string;
  file_name: string;
  last_reset: string;
}

const CreateCampaign = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [country, setCountry] = useState<any>([]);
  const [language, setLanguage] = useState<string | null>(null);
  const [ppcClusterData, setPpcClusterData] = useState<PpcCluster[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPPCClusterData();
  }, []);

  const fetchPPCClusterData = async () => {
    try {
      setLoadingData(true);
      const response = await GetPpcClusterData();
      if (response.status === 200 || response.status === 201) {
        const sortedData = response.data.sort(
          (a: PpcCluster, b: PpcCluster) =>
            new Date(b.last_reset).getTime() - new Date(a.last_reset).getTime()
        );
        setPpcClusterData(sortedData);
      }
    } catch (error: any) {
      setLoadingData(false);
      console.error("Error fetchPPCClusterData:", error);
    } finally {
      setLoadingData(false);
    }
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

  const handleSubmit = async () => {
    const selectedCountries = location_options.filter((loc) =>
      country.some((c: any) => c.value === loc.id)
    );

    const selectedLanguage = language_options.find(
      (lang) => lang.ID === Number(language)
    );
    const finalKeywords =
      keywords.length > 0
        ? keywords.join(",")
        : input.trim() !== ""
        ? input.trim()
        : "";

    const formData = {
      keywords: finalKeywords,
      description: description,
      language_id: selectedLanguage!,
      location_ids: selectedCountries,
    };
    setLoading(true);
    try {
      const SEOGenerateResponse = await SEOPPCGenerateKeyword(formData);
      if (
        SEOGenerateResponse.status === 201 ||
        SEOGenerateResponse.status === 200
      ) {
        const resultData = SEOGenerateResponse.data;
        const fileNameData = { fileName };
        localStorage.removeItem("includeKeywords");
        localStorage.removeItem("excludeKeywords");
        const NewData = {
          language: selectedLanguage?.ID,
          country: selectedCountries.map((c) => c.id),
        };
        localStorage.setItem("languageAndCountry", JSON.stringify(NewData));
        localStorage.setItem("fileNameData", JSON.stringify(fileNameData));
        localStorage.setItem("keywordToolResult", JSON.stringify(resultData));
        navigate("/ppc/CreateCampaignKeywordResult", { state: resultData });
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error handleSubmit:", error);
    }
  };

  // Format options for React Select
  const locationOptions = location_options.map((location) => ({
    value: location.id,
    label: location.country,
  }));

  const handleDelete = async (uuid: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this file?"
      );
      if (!isConfirmed) {
        return;
      }
      const formData = { uuid };
      const response = await deletePpcClusterData(formData);
      if (response.status === 200) {
        setPpcClusterData((prevData) =>
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
    navigate(`/ppc/CampaignSuggestionById/${id}`);
  };

  return (
    <>
      {loadingData && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-search me-1 font_20 text-primary"></i>{" "}
                Keyword Manager
              </h2>
            </div>
            <div className="keyword_search_form">
              <div className="row gy-3">
                <PreviouslyCreatedPosts
                  posts={ppcClusterData}
                  onDelete={handleDelete}
                  onNavigate={handleNavigate}
                />
                <div className="col-12 col-xl-7">
                  <form>
                    <h2 className="font_25 font_500 mb-3">
                      Start new research
                    </h2>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Name your research"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                    {keywords.length > 10 && (
                      <p className="keyword_error font_16 text-danger bg-danger-subtle p-2">
                        Error: Limit Reached. Please enter no more than 10
                        keywords.
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
                                  index < 10 ? "text-green" : "text-white"
                                }`}
                                aria-label="Remove"
                              ></button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter keywords (press Enter or comma to add)"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="row">
                      <div className="col-12">
                        <textarea
                          className="form-control"
                          placeholder="Product/Service Description"
                          id="key_tool_description"
                          style={{ height: "100px" }}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form_input">
                          <Select
                            options={locationOptions}
                            value={country}
                            onChange={setCountry}
                            isMulti
                            placeholder="Select Target Country"
                            classNamePrefix="react_select"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form_input">
                          <select
                            className="form-select"
                            id="targetLanguage"
                            aria-label="target_language"
                            onChange={(e) => setLanguage(e.target.value)}
                          >
                            <option value="">Language</option>
                            {language_options.map((language) => (
                              <option key={language.ID} value={language.ID}>
                                {language.Name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn primary_btn mt-2"
                          disabled={
                            (keywords.length === 0 && input.trim() === "") ||
                            keywords.length > 10 ||
                            country.length === 0 ||
                            !language ||
                            fileName.trim() === ""
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
      </main>
    </>
  );
};

export default CreateCampaign;

import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SEOClusterUploadFile } from "../Services/Services";

const KeywordsSuggestionsResult = () => {
  const location = useLocation();
 
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [SuggestionKeywordDetails, setSuggestionKeywordDetails] = useState<
    any[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitleId, setModalTitleId] = useState<number | null>(null);
  const [modalTitleValue, setModalTitleValue] = useState<string>("");
  const [modalURLValue, setModalURLValue] = useState<string>("");
  
  useEffect(() => {
    if (location.state) {
      const storedData = localStorage.getItem("ClusterData");
      if (storedData) {
        setSuggestionKeywordDetails(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  const removeKeyword = (keywordId: number, pageTitleId: number) => {
    setSuggestionKeywordDetails((prevDetails) => {
      const updatedDetails = prevDetails.map((item) => {
        if (item.Page_title_id === pageTitleId) {
          const updatedKeywords = item.Keywords.filter(
            (keyword: any) => keyword.Keyword_id !== keywordId
          );
          return { ...item, Keywords: updatedKeywords };
        }
        return item;
      });
      localStorage.setItem("ClusterData", JSON.stringify(updatedDetails));
      return updatedDetails;
    });
    toast.success("Keyword deleted successfully.", { position: "top-right", autoClose: 1000 });
  };

  const removePageTitle = (pageTitleId: number) => {
    setSuggestionKeywordDetails((prevDetails) => {
      const updatedDetails = prevDetails.filter(
        (item) => item.Page_title_id !== pageTitleId
      );
      localStorage.setItem("ClusterData", JSON.stringify(updatedDetails));
      return updatedDetails;
    });
    toast.success("Data deleted successfully.", { position: "top-right", autoClose: 1000 });
  };

  const handleSave = async () => {
    try {
      if (!fileName.trim()) {
        alert("Please enter a file name.");
        return;
      }
      const formData = {
        fileName: fileName,
        data: SuggestionKeywordDetails,
      };
      setLoading(true);
      const UploadFileResponse = await SEOClusterUploadFile(formData);
      if (
        UploadFileResponse.status === 201 ||
        UploadFileResponse.status === 200
      ) {
        setFileName("");
        setLoading(false);
        toast.success("Data uploaded successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error handleSave:", error);
    }
  };

  const handleSaveTitle = () => {
    if (!modalTitleValue.trim() ||!modalURLValue.trim()) {
      toast.warn("Title & Suggested URL cannot be empty");
      return;
    }

    const updatedData = SuggestionKeywordDetails.map((item) =>
      item.Page_title_id === modalTitleId
        ? { ...item, Page_Title: modalTitleValue,Suggested_URL_Structure: modalURLValue }
        : item
    );

    setSuggestionKeywordDetails(updatedData);
    localStorage.setItem("ClusterData", JSON.stringify(updatedData));
    setShowModal(false);
    toast.success("Title & Suggestion URL updated successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content">
            <div
              className="content_header mb-4 heading_btn"
            >
              <div>
                <h2 className="font_25 font_600 mb-2">
                  <i className="bi bi-search me-1 font_20 text-primary"></i>{" "}
                  Keyword Manager -{" "}
                  <span style={{ fontSize: "18px", fontWeight: 600 }}>
                    Search Results
                  </span>
                </h2>
              </div>

              {/* Right Side Input + Button */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="text"
                  placeholder="Enter file name"
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
                <button
                className="btn primary_btn"
                  style={{
                    fontWeight: "600",
                    padding: "8px 20px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleSave}
                >
                  {loading ? "Please Wait...." : "Save"}
                </button>
              </div>
            </div>

            <div className="suggest_page_wrapper">
              <div className="row">
                <div className={`col-12 col-lg-12 suggest_card_outer`}>
                  {SuggestionKeywordDetails.length === 0 ? (
                    <div className="no-suggestions">
                      <p>No suggestions found</p>
                    </div>
                  ) : (
                    SuggestionKeywordDetails.map((item, index) => (
                      <div
                        className="suggest_card box-shadow bg-white"
                        key={index}
                      >
                        <div className="remove_card">
                          <button className="btn">
                            <i
                              className="bi bi-x"
                              onClick={() =>
                                removePageTitle(item.Page_title_id)
                              }
                            ></i>
                          </button>
                        </div>
                        <h3 className="font_20 font_500">
                          {item.Page_Title}
                          <span>
                            <i
                              className="bi bi-pencil me-1 text-primary"
                              onClick={() => {
                                setShowModal(true);
                                setModalTitleId(item.Page_title_id);
                                setModalTitleValue(item.Page_Title);
                                setModalURLValue(item.Suggested_URL_Structure);
                              }}
                              style={{
                                paddingLeft: "10px",
                                cursor: "pointer",
                                fontSize: "15px",
                              }}
                            ></i>
                          </span>{" "}
                        </h3>
                        <p className="font_16">
                          Suggested URL: {item.Suggested_URL_Structure}
                        </p>
                        <div className="row gy-2">
                          {item.Keywords.map((keyword: any, idx: any) => (
                            <div
                              className="col-12 col-md-6"
                              key={`left-keyword-${idx}`}
                            >
                              <div className="keyword_item">
                                <p className="font_16 mb-0">
                                  {keyword.Keyword}
                                </p>
                                <div className="font_16 ">
                                  <span>{keyword.Avg_Monthly_Searches}</span>
                                  <i
                                    className="bi bi-x "
                                    style={{
                                      cursor: "pointer",
                                      paddingLeft: "5px",
                                    }}
                                    onClick={() =>
                                      removeKeyword(
                                        keyword.Keyword_id,
                                        item.Page_title_id
                                      )
                                    }
                                  ></i>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="btn primary_btn mt-3">
                          Generate
                        </button>
                      </div>
                    ))
                  )}
                      {showModal && (
                    <div className="modal-overlays">
                      <div
                        className="modal-contents"
                        style={{ position: "relative" }}
                      >
                        <button
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "transparent",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowModal(false)}
                          aria-label="Close"
                        >
                          &times;
                        </button>

                        <h4>Edit Page Title & Suggested URL</h4>

                        <label className="pb-2">Page Title :</label>
                        <textarea
                          className="form-control mb-3"
                          rows={3}
                          value={modalTitleValue}
                          onChange={(e) => setModalTitleValue(e.target.value)}
                        />

                        <label className="pb-2">Suggested URL :</label>
                        <textarea
                          className="form-control mb-3"
                          rows={2}
                          value={modalURLValue}
                          onChange={(e) => setModalURLValue(e.target.value)}
                        />

                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className="btn btn-success"
                            style={{
                              backgroundColor: "rgb(250, 122, 78)",
                              color: "white",
                              border: "none",
                            }}
                            onClick={handleSaveTitle}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default KeywordsSuggestionsResult;

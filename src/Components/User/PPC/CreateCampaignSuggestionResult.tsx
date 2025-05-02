import { useEffect, useState } from "react";
import Header from "../Header/Header"
import SideBar from "../SideBar/SideBar"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PPclusterUploadFile } from "../Services/Services";


const CreateCampaignSuggestionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [SuggestionKeywordDetails, setSuggestionKeywordDetails] = useState<
    any[]
  >([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitleId, setModalTitleId] = useState<number | null>(null);
  const [modalTitleValue, setModalTitleValue] = useState<string>("");

 
  useEffect(() => {
    if (location.state) {
      const storedData = localStorage.getItem("ClusterData");
      if (storedData) {
        setSuggestionKeywordDetails(JSON.parse(storedData));
      }
    }
  }, [location.state]);

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
      console.log(formData,"formData")
      // return false
      setLoading(true);
      const UploadFileResponse = await PPclusterUploadFile(formData);
      if (
        UploadFileResponse.status === 201 ||
        UploadFileResponse.status === 200
      ) {
        setFileName("");
        setLoading(false);
        toast.success("Data uploaded successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error:", error);
      const status = error.response?.status;
      const message = (error.response?.data as any)?.detail;
      if (status === 401) {
        toast.error(message, { position: "top-right", autoClose: 3000 });
        navigate("/Logout");
      }
    }
  };

  const handleDeleteGroup = (pageId: string) => {
    const updatedData = SuggestionKeywordDetails.filter(item => item.Page_title_id !== pageId);
    setSuggestionKeywordDetails(updatedData);
    localStorage.setItem("ClusterData", JSON.stringify(updatedData));
    toast.success("Data Deleted successfully.", { position: "top-right", autoClose: 1000 });
  };

  const handleDeleteKeyword = (pageId: string, keywordId: string) => {
    const updatedData = SuggestionKeywordDetails.map(item => {
      if (item.Page_title_id === pageId) {
        const filteredKeywords = item.Keywords.filter(
          (keyword: { Keyword_id: string }) => keyword.Keyword_id !== keywordId
        );
        return { ...item, Keywords: filteredKeywords };
      }
      return item;
    });
    setSuggestionKeywordDetails(updatedData);
    localStorage.setItem("ClusterData", JSON.stringify(updatedData));
    toast.success("Keyword deleted successfully!", { position: "top-right", autoClose: 1000 });
  };

  const handleSaveTitle = () => {
    if (!modalTitleValue.trim()) {
      toast.warning("Please enter a valid title");
      return;
    }
  
    const updatedData = SuggestionKeywordDetails.map(item => {
      if (item.Page_title_id === modalTitleId) {
        return { ...item, Ad_Group: modalTitleValue };
      }
      return item;
    });
  
    setSuggestionKeywordDetails(updatedData);
    localStorage.setItem("ClusterData", JSON.stringify(updatedData));
    setShowModal(false);
    toast.success("Title updated successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  



  const KeywordItem: React.FC<{ keyword: any; pageId: string }> = ({ keyword, pageId }) => (
    <div className="col-12 col-md-6">
      <div className="keyword_item">
        <p className="font_16 mb-0">{keyword.Keyword}</p>
        <div className="font_16">
          <span>{keyword.Avg_Monthly_Searches}</span>
          <i className="bi bi-x" style={{cursor:"pointer"}} onClick={() => handleDeleteKeyword(pageId, keyword.Keyword_id)}></i>
        </div>
      </div>
    </div>
  );


 

  const SearchItemComponent: React.FC<{ item: any; type: 'headline' | 'description'; groupId: string }> = ({
    item,
    type,
    groupId,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(item.text);
    const [charCount, setCharCount] = useState(item.text.length);
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    // Dynamic max length based on type
    const getMaxLength = () => {
      return type === 'headline' ? 50 : 100; // Headline max 50, Description max 100
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newText = e.target.value;
      const maxLength = getMaxLength();
      if (newText.length <= maxLength) {
        setEditedText(newText);
        setCharCount(newText.length);
      }
    };
  
    const handleSave = () => {
      if (editedText === "") {
        alert(`Please enter a ${type === 'headline' ? 'headline' : 'description'} name.`);
        return;
      }
  
      const updatedData = JSON.parse(localStorage.getItem("ClusterData") || "[]");
  
      const updatedDataWithText = updatedData.map((group: any) => {
        if (group.Page_title_id === groupId) {
          return {
            ...group,
            [type === 'headline' ? 'Ad_Headlines' : 'Descriptions']: group[type === 'headline' ? 'Ad_Headlines' : 'Descriptions'].map(
              (text: string) => (text === item.text ? editedText : text)
            ),
          };
        }
        return group;
      });
  
      localStorage.setItem("ClusterData", JSON.stringify(updatedDataWithText));
      item.text = editedText;
      setIsEditing(false);
      toast.success(` ${type === 'headline' ? 'headline' : 'description'} uploaded successfully`, {
        position: "top-right",
        autoClose: 2000,
      });
    };
  
    const handleCancel = () => {
      setEditedText(item.text);
      setCharCount(item.text.length); 
      setIsEditing(false);
    };
  
    return (
      <div className="col-12 col-md-12">
        <div className="search_headlines_item">
          {isEditing ? (
            <div className="edit-container">
              <textarea
                value={editedText}
                onChange={handleChange}
                maxLength={getMaxLength()} // Set maxLength dynamically based on type
                className="edit-input"
              />
              <p className="font_12 mb-0">{charCount}/{getMaxLength()}</p>
              <div className="button-container">
                <span onClick={handleSave} className="icon-save">
                  <i className="bi bi-check-circle-fill"></i> {/* Save Icon */}
                </span>
                <span onClick={handleCancel} className="icon-cancel">
                  <i className="bi bi-x-circle-fill"></i> {/* Cancel Icon */}
                </span>
              </div>
            </div>
          ) : (
            <>
              <p className="font_16 mb-0 item_heading">{item.text}</p>
              <div className="edit_item">
                <span className="edit_icon" onClick={handleEditClick}>
                  <i className="bi bi-pencil-fill"></i>
                </span>
                <p className="font_12 mb-0">{charCount}/{getMaxLength()}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  

  const SuggestCard: React.FC<{ group: any }> = ({ group }) => (
    <div className="col-12 card_left">
      <div className="suggest_card box-shadow bg-white">
        <div className="remove_card">
          <button className="btn" onClick={() => handleDeleteGroup(group.Page_title_id)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <h3 className="font_20 font_500">
          {group.Ad_Group}
          <span className="heading_edit" onClick={() => {
                                setShowModal(true);
                                setModalTitleId(group.Page_title_id);
                                setModalTitleValue(group.Ad_Group);
                              }}>
            <i className="bi bi-pencil-fill" style={{cursor:"pointer"}}></i>
          </span>
        </h3>
        {/* <p className="font_16">Suggested URL: {group.Page_title_id}</p> */}
        <div className="row mx-0 gy-4">
          <div className="col-12 col-lg-6">
            <div className="card_head">
              <h4 className="font_20 font_500 mb-1">Keywords</h4>
            </div>
            <div className="row gy-2">
              {group.Keywords.map((keyword: any) => (
                <KeywordItem
                  key={keyword.Keyword_id} // ✅ This resolves the warning
                  keyword={keyword}
                  pageId={group.Page_title_id}
                />
              ))}

            </div>
          </div>
          <div className="col-12 col-lg-1 text-center d-none d-lg-block">
            <span className="border-bottom"></span>
          </div>
          <div className="col-12 col-lg-5">
            <div className="card_head">
              <h4 className="font_20 font_500 mb-1">Responsive search ad</h4>
              <p className="font_16 mb-2 font_500">Headlines</p>
            </div>
            <div className="row gy-2 mb-3">
              {group.Ad_Headlines.map((headline: string, index: number) => (
                <SearchItemComponent key={index}  item={{ text: headline, length: "19/30" }} type="headline"
                groupId={group.Page_title_id} />
              ))}
            </div>
            <p className="font_16 font_500 mb-2">Description</p>
            <div className="row gy-2">
              {group.Descriptions.map((description: string, index: number) => (
                <SearchItemComponent key={index} item={{ text: description, length: "19/30" }} type="description"
                groupId={group.Page_title_id} />
              ))}
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content">
            <div
              className="content_header mb-4"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
              }}
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
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
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
            <div className="suggest_page_wrapper suggest_ppc_campaign">
              <div className="row">
                {SuggestionKeywordDetails.map((group, index) => (
                  <SuggestCard key={index} group={group} />
                ))}
                    {/* Modal JSX */}
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
      </main>
    </>
  )
}

export default CreateCampaignSuggestionResult
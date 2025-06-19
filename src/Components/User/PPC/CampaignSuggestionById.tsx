import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Page/Loading/Loading";
import {
  UpdatetitlePpc,
  deleteKeywordDataPpc,
  deletePageDataPpc,
  GetPpcClusterDataById,
  UpdatePpcFileName,
} from "./PpcServices";
import FileNameUpdateModal from "../../Page/FileNameUpdateModal";

const CampaignSuggestionById = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [SuggestionKeywordDetails, setSuggestionKeywordDetails] = useState<
    any | null
  >(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitleId, setModalTitleId] = useState<number | null>(null);
  const [modalTitleValue, setModalTitleValue] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [UUID, setUUID] = useState<string>("");
  const [ShowFileModal, setShowFileModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchPpcClusterData(id);
    }
  }, [id]);

  const fetchPpcClusterData = async (clusterId: string) => {
    try {
      setLoading(true);
      const response = await GetPpcClusterDataById(clusterId);
      if (response.status === 200 || response.status === 201) {
        setSuggestionKeywordDetails(response.data);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetchPpcClusterData:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGroup = async (uuid: string, pageId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this?");
    if (!isConfirmed) return;

    try {
      const response = await deletePageDataPpc(uuid, pageId);
      if (response.status === 200 || response.status === 204) {
        toast.success("Ad Group deleted successfully");

        // Update local state by removing the deleted Ad Group
        setSuggestionKeywordDetails((prev: any) => {
          if (!prev || !Array.isArray(prev.data)) return prev;

          const updatedData = prev.data.filter(
            (group: any) => group.Page_title_id !== pageId
          );

          return { ...prev, data: updatedData };
        });
      }
    } catch (error: any) {
      console.error("Error deleting Ad Group:", error);
    }
  };

  const handleDeleteKeyword = async (uuid: string, keywordId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this keyword?"
    );
    if (!isConfirmed) return;

    try {
      const response = await deleteKeywordDataPpc(uuid, keywordId);
      if (response.status === 200 || response.status === 204) {
        toast.success("Keyword deleted successfully");

        setSuggestionKeywordDetails((prev: any) => {
          if (!prev || !Array.isArray(prev.data)) return prev;

          const updatedData = prev.data.map((group: any) => {
            const updatedKeywords = group.Keywords.filter(
              (keyword: any) => keyword.Keyword_id !== keywordId
            );
            return { ...group, Keywords: updatedKeywords };
          });

          return { ...prev, data: updatedData };
        });
      }
    } catch (error: any) {
      console.error("Error deleting keyword:", error);
    }
  };

  const handleSaveTitle = async () => {
    if (!modalTitleValue.trim()) {
      toast.warning("Please enter a valid title");
      return;
    }
    const uuid = SuggestionKeywordDetails?.id;
    if (!uuid || modalTitleId === null) {
      toast.error("Missing UUID or Page Title ID");
      return;
    }

    try {
      //   const formData = { Ad_Group: modalTitleValue };
      const formData = {
        Ad_Group: modalTitleValue,
      };
      const response = await UpdatetitlePpc(
        uuid,
        modalTitleId.toString(),
        formData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Title updated successfully");

        setSuggestionKeywordDetails((prev: any) => {
          if (!prev || !Array.isArray(prev.data)) return prev;

          const updatedData = prev.data.map((item: any) => {
            if (item.Page_title_id === modalTitleId.toString()) {
              return { ...item, Ad_Group: modalTitleValue };
            }
            return item;
          });

          return { ...prev, data: updatedData };
        });

        setShowModal(false);
        setModalTitleValue("");
        setModalTitleId(null);
      }
    } catch (error: any) {
      console.error("Error updating title:", error);
    }
  };

  const handleChangeFilename = async () => {
    if (!content.trim()) {
      toast.warning("Please enter a Filename");
      return;
    }
    try {
      setLoading(true);
      const formData = { file_name: content };
      const res = await UpdatePpcFileName(UUID, formData);
      if (res.status === 200 || res.status === 201) {
        setSuggestionKeywordDetails((prev:any) =>
          prev ? { ...prev, fileName: content } : prev
        );
        setShowFileModal(false);
        toast.success("Filename updated successfully!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error: any) {
      console.error("Error updating title:", error);
    } finally {
      setLoading(false);
      setShowFileModal(false);
    }
  };

  const handleCloseFileModel = () => {
    setShowFileModal(false);
  };

  const KeywordItem: React.FC<{ keyword: any; pageId: string }> = ({
    keyword,
  }) => (
    <div className="col-12 col-md-6">
      <div className="keyword_item">
        <p className="font_16 mb-0">{keyword.Keyword}</p>
        <div className="font_16">
          <span>{keyword.Avg_Monthly_Searches}</span>
          <i
            className="bi bi-x"
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleDeleteKeyword(
                SuggestionKeywordDetails?.id,
                keyword.Keyword_id
              )
            }
          ></i>
        </div>
      </div>
    </div>
  );

  const SearchItemComponent: React.FC<{
    item: any;
    type: "headline" | "description";
    groupId: string;
  }> = ({ item, type, groupId }) => {
    const initialText =
      type === "headline" ? item.text.Ad_Headline : item.text.Description;
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(initialText);
    const [charCount, setCharCount] = useState(initialText.length);

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const getMaxLength = () => {
      return type === "headline" ? 50 : 100;
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const newText = e.target.value;
      const maxLength = getMaxLength();
      if (newText.length <= maxLength) {
        setEditedText(newText);
        setCharCount(newText.length);
      }
    };

    const handleSave = async () => {
      if (editedText.trim() === "") {
        alert(
          `Please enter a ${
            type === "headline" ? "headline" : "description"
          } name.`
        );
        return;
      }
      const uuid = SuggestionKeywordDetails?.id;
      if (!uuid) {
        toast.error("Missing UUID or Page Title ID");
        return;
      }

      const isHeadline = type === "headline";
      const itemId = isHeadline
        ? item.text.Headlines_id
        : item.text.Description_id;
      const fieldKey = isHeadline ? "Ad_Headlines" : "Descriptions";

      const formData: any = {
        [fieldKey]: [
          {
            [isHeadline ? "Headlines_id" : "Description_id"]: itemId,
            [isHeadline ? "Ad_Headline" : "Description"]: editedText,
          },
        ],
      };

      try {
        const response = await UpdatetitlePpc(uuid, groupId, formData);

        if (response.status === 200 || response.status === 204) {
          setSuggestionKeywordDetails((prev: any) => {
            const updatedData = prev.data.map((group: any) => {
              if (group.Page_title_id === groupId) {
                const updatedGroup = { ...group };
                updatedGroup[fieldKey] = group[fieldKey].map((entry: any) => {
                  if (
                    (isHeadline && entry.Headlines_id === itemId) ||
                    (!isHeadline && entry.Description_id === itemId)
                  ) {
                    return isHeadline
                      ? { ...entry, Ad_Headline: editedText }
                      : { ...entry, Description: editedText };
                  }
                  return entry;
                });
                return updatedGroup;
              }
              return group;
            });

            return { ...prev, data: updatedData };
          });

          setIsEditing(false);
          toast.success(
            `${isHeadline ? "Headline" : "Description"} updated successfully`,
            {
              position: "top-right",
              autoClose: 2000,
            }
          );
        }
      } catch (error: any) {
        console.error("Error updating:", error);
        toast.error(
          `Failed to update ${isHeadline ? "headline" : "description"}`
        );
      }
    };

    const handleCancel = () => {
      setEditedText(
        type === "headline" ? item.text.Ad_Headline : item.text.Description
      );
      setCharCount(
        (type === "headline" ? item.text.Ad_Headline : item.text.Description)
          .length
      );
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
                maxLength={getMaxLength()}
                className="edit-input"
              />
              <p className="font_12 mb-0">
                {charCount}/{getMaxLength()}
              </p>
              <div className="button-container">
                <span onClick={handleSave} className="icon-save">
                  <i className="bi bi-check-circle-fill"></i>
                </span>
                <span onClick={handleCancel} className="icon-cancel">
                  <i className="bi bi-x-circle-fill"></i>
                </span>
              </div>
            </div>
          ) : (
            <>
              <p className="font_16 mb-0 item_heading">
                {type === "headline"
                  ? item.text.Ad_Headline
                  : item.text.Description}
              </p>
              <div className="edit_item">
                <span className="edit_icon" onClick={handleEditClick}>
                  <i className="bi bi-pencil-fill"></i>
                </span>
                <p className="font_12 mb-0">
                  {charCount}/{getMaxLength()}
                </p>
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
          <button
            className="btn"
            onClick={() =>
              handleDeleteGroup(
                SuggestionKeywordDetails?.id,
                group.Page_title_id
              )
            }
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        <h3 className="font_20 font_500">
          {group.Ad_Group}
          <span
            className="heading_edit"
            onClick={() => {
              setShowModal(true);
              setModalTitleId(group.Page_title_id);
              setModalTitleValue(group.Ad_Group);
            }}
          >
            <i className="bi bi-pencil-fill" style={{ cursor: "pointer" }}></i>
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
                <SearchItemComponent
                  key={index}
                  item={{ text: headline, length: "19/30" }}
                  type="headline"
                  groupId={group.Page_title_id}
                />
              ))}
            </div>
            <p className="font_16 font_500 mb-2">Description</p>
            <div className="row gy-2">
              {group.Descriptions.map((description: string, index: number) => (
                <SearchItemComponent
                  key={index}
                  item={{ text: description, length: "19/30" }}
                  type="description"
                  groupId={group.Page_title_id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="upload_download_btns">
          <button className="btn primary_btn">
            <p>
              Upload to Google Ads 
            </p>
              <i className="bi bi-upload"></i>
          </button>
          <button className="btn primary_btn">
             <p>
              Download
             </p>
             <i className="bi bi-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {loading && <Loading />}
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
                  Keyword Manager /{" "}
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "rgb(72, 114, 183)",
                    }}
                  >
                    {SuggestionKeywordDetails?.fileName
                      ? SuggestionKeywordDetails.fileName
                          .charAt(0)
                          .toUpperCase() +
                        SuggestionKeywordDetails.fileName.slice(1)
                      : ""}
                  </span>
                  <span
                    className="heading_edit"
                    onClick={() => {
                      setShowFileModal(true);
                      setContent(SuggestionKeywordDetails?.fileName || "");
                      setUUID(SuggestionKeywordDetails?.id || "");
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
            </div>
            <div className="suggest_page_wrapper suggest_ppc_campaign">
              <div className="row">
                {SuggestionKeywordDetails?.data.map(
                  (group: any, index: any) => (
                    <SuggestCard key={index} group={group} />
                  )
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

                      <h4>Edit Page Title.</h4>

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
  );
};

export default CampaignSuggestionById;

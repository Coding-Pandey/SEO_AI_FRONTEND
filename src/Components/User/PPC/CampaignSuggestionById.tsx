import { useEffect, useState } from "react";
import Header from "../Header/Header"
import SideBar from "../SideBar/SideBar"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GetPpcClusterDataById, PPclusterUploadFile } from "../Services/Services";
import Loading from "../../Page/Loading/Loading";


const CampaignSuggestionById = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [SuggestionKeywordDetails, setSuggestionKeywordDetails] =
        useState<any | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalTitleId, setModalTitleId] = useState<number | null>(null);
    const [modalTitleValue, setModalTitleValue] = useState<string>("");

    console.log(SuggestionKeywordDetails, "SuggestionKeywordDetails")
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
            console.error("Error:", error);
            const status = error.response?.status;
            const message = error.response?.data?.detail;
            if (status === 401) {
                navigate("/Logout");
                toast.error(message || "Unauthorized access", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } finally {
            setLoading(false);
        }
    };




    const handleDeleteGroup = (pageId: string) => {
        // const updatedData = SuggestionKeywordDetails.filter(item => item.Page_title_id !== pageId);
        // setSuggestionKeywordDetails(updatedData);
        // localStorage.setItem("ClusterData", JSON.stringify(updatedData));
    };

    const handleDeleteKeyword = (pageId: string, keywordId: string) => {
        // const updatedData = SuggestionKeywordDetails.map(item => {
        //   if (item.Page_title_id === pageId) {
        //     const filteredKeywords = item.Keywords.filter(
        //       (keyword: { Keyword_id: string }) => keyword.Keyword_id !== keywordId
        //     );
        //     return { ...item, Keywords: filteredKeywords };
        //   }
        //   return item;
        // });

        // setSuggestionKeywordDetails(updatedData);
        // localStorage.setItem("ClusterData", JSON.stringify(updatedData));
    };

    const handleSaveTitle = () => {
        // if (!modalTitleValue.trim()) {
        //   toast.warning("Please enter a valid title");
        //   return;
        // }

        // const updatedData = SuggestionKeywordDetails.map(item => {
        //   if (item.Page_title_id === modalTitleId) {
        //     return { ...item, Ad_Group: modalTitleValue };
        //   }
        //   return item;
        // });

        // setSuggestionKeywordDetails(updatedData);
        // localStorage.setItem("ClusterData", JSON.stringify(updatedData));
        // setShowModal(false);
        // toast.success("Title updated successfully", {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
    };




    const KeywordItem: React.FC<{ keyword: any; pageId: string }> = ({ keyword, pageId }) => (
        <div className="col-12 col-md-6">
            <div className="keyword_item">
                <p className="font_16 mb-0">{keyword.Keyword}</p>
                <div className="font_16">
                    <span>{keyword.Avg_Monthly_Searches}</span>
                    <i className="bi bi-x" style={{ cursor: "pointer" }}
                    //   onClick={() => handleDeleteKeyword(pageId, keyword.Keyword_id)}
                    ></i>
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
            // setIsEditing(true);
        };

 
        const getMaxLength = () => {
            return type === 'headline' ? 50 : 100;  
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
                    <span className="heading_edit"
                    //   onClick={() => {
                    //                         setShowModal(true);
                    //                         setModalTitleId(group.Page_title_id);
                    //                         setModalTitleValue(group.Ad_Group);
                    //                       }}
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
                                <SearchItemComponent key={index} item={{ text: headline, length: "19/30" }} type="headline"
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
            {loading && (
                <Loading />
            )}
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
                                        {SuggestionKeywordDetails?.fileName
                                            ? SuggestionKeywordDetails.fileName
                                                .charAt(0)
                                                .toUpperCase() +
                                            SuggestionKeywordDetails.fileName.slice(1)
                                            : ""}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="suggest_page_wrapper suggest_ppc_campaign">
                            <div className="row">
                                {SuggestionKeywordDetails?.data.map((group: any, index: any) => (
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

export default CampaignSuggestionById
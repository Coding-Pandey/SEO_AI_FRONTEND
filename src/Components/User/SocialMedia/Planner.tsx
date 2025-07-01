import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Loading from "../../Page/Loading/Loading";
import { toast } from "react-toastify";
import ScheduleModal from "./ScheduleModal";
import {
  deletePlannerSocialMediaData,
  GetPlannerSocialMediaData,
  UpdateScheduleSocialMediaPlanner,
} from "./SocialMediaServices";

const platforms = [
  "linkedin_posts",
  "twitter_posts",
  "facebook_posts",
  "instagram_posts",
  "tiktok_posts",
];

function formatScheduleDate(scheduleTime: any) {
  const scheduleDate = new Date(scheduleTime);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1: any, d2: any) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  if (isSameDay(scheduleDate, today)) return { text: "Today", isToday: true };
  if (isSameDay(scheduleDate, yesterday))
    return { text: "Yesterday", isToday: false };

  return { text: scheduleDate.toLocaleDateString("en-GB"), isToday: false }; // DD/MM/YYYY
}

const Planner = () => {
  const [plannerData, setPlannerData] = useState<any>({});
  const [loadingData, setLoadingData] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    uuid: string;
    platform: string;
  } | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [SuccessScheduleModel, setSuccessScheduleModel] = useState(false);
  const [REScheduleDateAndTime, setREScheduleDateAndTime] = useState("");
  const [PlatformId, setPlatformId] = useState<string>("");
  const [CollectPlatform, setCollectPlatform] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [UUIDS, setUUIDS] = useState<string>("");
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [fileData, setFileData] = useState<any>(null);
  const [LoadingApi, setLoadingApi] = useState<boolean>(false);
  console.log(plannerData, "plannerData");

  useEffect(() => {
    fetchPlannerData();
  }, []);

  const fetchPlannerData = async () => {
    try {
      setLoadingData(true);
      const response = await GetPlannerSocialMediaData();
      if (response.status === 200 || response.status === 201) {
        setPlannerData(response.data);
      }
    } catch (error) {
      console.error("Error fetchPlannerData:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const filteredPosts = () => {
    let posts: any[] = [];
    if (!selectedPlatform) {
      platforms.forEach((plat) => {
        if (plannerData[plat]?.length) {
          posts = posts.concat(plannerData[plat]);
        }
      });
    } else {
      const key = `${selectedPlatform}_posts`;
      if (plannerData[key]?.length) posts = plannerData[key];
    }
    if (selectedDate) {
      posts = posts.filter((post) => {
        const postDate = new Date(post.schedule_time).toLocaleDateString(
          "en-CA"
        );

        return postDate === selectedDate;
      });
    }
    return posts;
  };

  const handleDeletePlanner = async (platform: string, uuid: string) => {
    try {
      const response = await deletePlannerSocialMediaData(platform, uuid);
      if (response.status === 200) {
        toast.success("Post deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        fetchPlannerData();
      }
    } catch (error: any) {
      console.log("Error during handleDeletePlanner", Error);
    }
  };

  const formatScheduledDate = (isoString: string) => {
    const date = new Date(isoString);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return `${n}th`;
      switch (n % 10) {
        case 1:
          return `${n}st`;
        case 2:
          return `${n}nd`;
        case 3:
          return `${n}rd`;
        default:
          return `${n}th`;
      }
    };

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = getOrdinal(date.getDate());

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${dayName}, ${monthName} ${day} at ${hours}:${minutes} ${ampm}`;
  };

  const handleScheduleClick = (
    uuid: string,
    platform: string,
    postPlatformId: string
  ) => {
    // console.log(postPlatformId,uuid,platform,"hfgshghdsf")
    setUUIDS(uuid);
    setShowModal(true);
    setCollectPlatform(platform);
    setPlatformId(postPlatformId);
    setREScheduleDateAndTime("");
  };

  const handleCloseSchedule = () => {
    setSuccessScheduleModel(false);
    setREScheduleDateAndTime("");
  };

  const handleSchedule = async (scheduledDate: string, timeZone: any) => {
    setREScheduleDateAndTime(scheduledDate);
    let formData = new FormData();
    formData.append("id", PlatformId);
    formData.append("reschedule_time", scheduledDate);
    formData.append("timezone", JSON.stringify(timeZone));

    try {
      const response = await UpdateScheduleSocialMediaPlanner(
        CollectPlatform,
        UUIDS,
        formData
      );
      // console.log(response.data, "response.data");
      if (response.status === 201 || response.status === 200) {
        toast.success("Updated Schedule successfully");
        setShowModal(false);
        fetchPlannerData();
        setUUIDS("");
        setPlatformId("");
        setCollectPlatform("");
        setSuccessScheduleModel(true);
      }
    } catch (error) {
      console.error("Error is create schedule", error);
    }
  };

  const handleEditFunction = (
    post: any,
    platform: string,
    uuid: string,
    postPlatformId: string
  ) => {
    setSelectedPost(post);
    setCollectPlatform(platform);
    setIsModalOpen(true);
    setContent(post?.discription?.join("\n") || "");
    setUUIDS(uuid);
    setFileData(null);
    setPlatformId(postPlatformId);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFileData(null);
    setLocalImage(null);
    setSelectedPost(null);
    setContent("");
    setCollectPlatform("");
    setPlatformId("");
    fetchPlannerData();
  };

  const handleSaveAndEditPost = async () => {
    try {
      let formData = new FormData();
      if (fileData) {
        formData.append("image", fileData);
      }
      formData.append("content", content);
      formData.append("id", PlatformId);
      setLoadingApi(true);
      const response = await UpdateScheduleSocialMediaPlanner(
        CollectPlatform,
        UUIDS,
        formData
      );
      console.log(response.data, "response.data");
      if (response.status === 201 || response.status === 200) {
        // setLocalImage(null);
        setLoadingApi(false);
        const updatedPost = {
          ...selectedPost,
          discription: [content],
        };

        toast.success("Updated image and content successfully");
        setSelectedPost(updatedPost);
      }
    } catch (error: any) {
      setLoadingApi(false);
      console.log("Failed to handleSaveAndEditPost.", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content">
          <div className="keyword_tool_content generate_post">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-people-fill me-1 text_blue"></i> Planner
              </h2>
            </div>
            {isModalOpen && selectedPost ? (
              <div className="edit_post_wrapper box-shadow">
                <button
                  className="btn text_orange font_20 edit_post_close"
                  aria-label="close_icon"
                >
                  <i className="bi bi-x" onClick={handleClose}></i>
                </button>
                <div className="edit_post_header">
                  <h2 className="post_heading font_20 font_500">
                    Edit Your Post
                  </h2>
                </div>
                <div className="edit_post_body">
                  {selectedPost.image || localImage ? (
                    <div className="social_post_img my-3">
                      <img
                        src={localImage || selectedPost.image}
                        className="img-fluid"
                        alt="image"
                      />
                      <div className="add_media">
                        <input
                          type="file"
                          className="media_input"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFileData(file);
                              setLocalImage(URL.createObjectURL(file)); // ⬅️ Preview the selected image
                            }
                          }}
                        />
                        <div className="media_text">
                          <span>Upload file</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="add_media">
                      <input
                        type="file"
                        className="media_input"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFileData(file);
                            setLocalImage(URL.createObjectURL(file)); // ⬅️ Preview the selected image
                          }
                        }}
                      />
                      <div className="media_text">
                        <i className="bi bi-plus-circle"></i>
                        <span>Add media</span>
                      </div>
                    </div>
                  )}

                  <div className="edit_post_content">
                    <textarea
                      id="post_content"
                      aria-label="post_content"
                      defaultValue={content || ""}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="edit_post_footer text-end">
                    <button
                      className="btn primary_btn"
                      type="submit"
                      onClick={handleSaveAndEditPost}
                    >
                      {LoadingApi ? "Please Wait..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="plan_post_wrapper">
                <div className="post_list_header">
                  <div className="header_left">
                    <h2 className="font_25 font_600">Posts</h2>
                  </div>
                  <div className="header_right">
                    <div className="form_input">
                      <select
                        className="form-select"
                        id="social_post"
                        aria-label="social_post"
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                      >
                        <option value="">All Platforms</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="tiktok">TikTok</option>
                      </select>
                    </div>
                    <div className="form_input">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="post_list_content">
                  {loadingData && <Loading />}

                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        {filteredPosts().length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-center py-4">
                              <p className="font_16 text-muted">
                                No posts available
                              </p>
                            </td>
                          </tr>
                        ) : (
                          filteredPosts().map((item: any) => {
                            const { text, isToday } = formatScheduleDate(
                              item.schedule_time
                            );
                            const socialIconClass = item.content.facebook_id
                              ? "bi-facebook"
                              : item.content.linkedin_id
                              ? "bi-linkedin"
                              : item.content.instagram_id
                              ? "bi-instagram"
                              : item.content.tiktok_id
                              ? "bi-tiktok"
                              : item.content.twitter_id
                              ? "bi-twitter"
                              : "";

                            const socialMediaPost = item.content.facebook_id
                              ? "facebook_posts"
                              : item.content.linkedin_id
                              ? "linkedin_posts"
                              : item.content.instagram_id
                              ? "instagram_posts"
                              : item.content.tiktok_id
                              ? "tiktok_posts"
                              : item.content.twitter_id
                              ? "twitter_posts"
                              : "";

                            const socialMediaId = item.content.facebook_id
                              ? "facebook_id"
                              : item.content.linkedin_id
                              ? "linkedin_id"
                              : item.content.instagram_id
                              ? "instagram_id"
                              : item.content.tiktok_id
                              ? "tiktok_id"
                              : item.content.twitter_id
                              ? "twitter_id"
                              : "";

                            return (
                              <tr key={item.uuid}>
                                <th scope="row">
                                  <img
                                    src={
                                      item.content.image
                                        ? item.content.image
                                        : "https://img.favpng.com/22/14/20/computer-icons-user-profile-png-favpng-t5jjbVtARafBFMz6SeBYs6wmS.jpg"
                                    }
                                    className="img-fluid"
                                    alt="Post"
                                  />
                                </th>
                                <td>
                                  <p className="font_16 table-content">
                                    {item.content.discription?.[0] ||
                                      "No description available"}
                                  </p>
                                </td>
                                <td>
                                  <i
                                    className={`bi ${socialIconClass} social_icon`}
                                  ></i>
                                </td>
                                <td>
                                  <span
                                    className={`post_day ${
                                      isToday ? "today" : ""
                                    }`}
                                  >
                                    {text}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className="btn primary_btn_outline"
                                    data-bs-toggle="modal"
                                    data-bs-target="#scheduleModal"
                                    onClick={() =>
                                      handleScheduleClick(
                                        item.uuid,
                                        socialMediaPost,
                                        item.content?.[socialMediaId]
                                      )
                                    }
                                  >
                                    Re-schedule
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn primary_btn_outline"
                                    onClick={() => {
                                      handleEditFunction(
                                        item.content,
                                        socialMediaPost,
                                        item.uuid,
                                        item.content?.[socialMediaId]
                                      );
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn text_orange font_20 pe-0"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteSchedule"
                                    onClick={() =>
                                      setDeleteItem({
                                        platform: socialMediaPost,
                                        uuid: item.uuid,
                                      })
                                    }
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <>
        <ScheduleModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setUUIDS("");
            setCollectPlatform("");
            setPlatformId("");
          }}
          onSchedule={handleSchedule}
        />

        {SuccessScheduleModel && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-content">
              <div className="schedule_box">
                <p className="font_16 mb-1">Your post has been scheduled</p>
                <p className="font_14 text_blue">
                  {formatScheduledDate(REScheduleDateAndTime)}
                </p>
                <button
                  className="btn primary_btn ok_btn"
                  onClick={handleCloseSchedule}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Schedule Modal */}
        <div
          className="modal fade"
          id="deleteSchedule"
          tabIndex={-1}
          aria-labelledby="deleteScheduleLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body schedule_box">
                <p className="font_16 mb-1">
                  Are you sure you want to delete this item?
                </p>
                <p className="font_16">This action cannot be undone.</p>
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn primary_btn ok_btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      if (deleteItem) {
                        handleDeletePlanner(
                          deleteItem.platform,
                          deleteItem.uuid
                        );
                        setDeleteItem(null); // Reset after deletion
                      }
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="btn primary_btn ok_btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Planner;

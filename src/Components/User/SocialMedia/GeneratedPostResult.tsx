import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import Loading from "../../Page/Loading/Loading";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import ScheduleModal from "./ScheduleModal";
import {
  AddScheduleSocialMedia,
  deleteSocialMediaData,
  deleteSocialMediaPost,
  GetGeneratedPostById,
  UpdateFileNameSocialMedia,
  UpdateImageSocialMedia,
} from "./SocialMediaServices";
import FileNameUpdateModal from "../../Page/FileNameUpdateModal";

const GeneratedPostResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedPostDetails, setGeneratedPostDetails] = useState<any | null>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [fileData, setFileData] = useState<any>(null);
  const [CollectPlatform, setCollectPlatform] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [UUIDS, setUUIDS] = useState<string>("");
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [SuccessScheduleModel, setSuccessScheduleModel] = useState(false);
  const [ScheduleDateAndTime, setScheduleDateAndTime] = useState("");
  const [LoadingApi, setLoadingApi] = useState<boolean>(false);
  const [ShowFileModal, setShowFileModal] = useState<boolean>(false);

  const handleScheduleClick = (
    uuid: string,
    postData: any,
    platform: string
  ) => {
    console.log(postData, "postData");
    setUUIDS(uuid);
    setSelectedPost(postData);
    setShowModal(true);
    setScheduleDateAndTime("");
    setCollectPlatform(platform);
  };

  useEffect(() => {
    if (id) {
      fetchGeneratedPost(id);
    }
  }, [id]);

  const fetchGeneratedPost = async (clusterId: string) => {
    try {
      setLoading(true);
      const response = await GetGeneratedPostById(clusterId);
      if (response.status === 200 || response.status === 201) {
        // console.log(response.data, "data");
        setGeneratedPostDetails(response.data);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetchPpcClusterData:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFileData(null);
    setLocalImage(null);
    setSelectedPost(null);
    setContent("");
    setCollectPlatform("");
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    postId: string,
    platform: string,
    uuid: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await UpdateImageSocialMedia(
        uuid,
        postId,
        platform,
        formData
      );
      console.log(response.data, "response.data");

      if (response.status === 201 || response.status === 200) {
        toast.success("Added image successfully");
        setGeneratedPostDetails((prev: any) => {
          const updatedPosts = { ...prev };
          const posts = updatedPosts.data[`${platform}_posts`];
          const updated = posts.map((post: any) =>
            post[`${platform}_id`] === postId
              ? { ...post, image: response.data.image }
              : post
          );
          updatedPosts.data[`${platform}_posts`] = updated;
          return updatedPosts;
        });
      }
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const deletePostFromServer = async (
    uuid: string,
    id: string,
    platform: string
  ) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!isConfirmed) {
        return;
      }
      const response = await deleteSocialMediaPost(uuid, id, platform);
      if (response.status === 200) {
        setGeneratedPostDetails((prev: any) => ({
          ...prev,
          data: {
            ...prev.data,
            [`${platform}_posts`]: prev.data[`${platform}_posts`].filter(
              (post: any) => post[`${platform}_id`] !== id
            ),
          },
        }));

        toast.success("Post successfully deleted!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      console.log("Failed to delete post.", error);
    }
  };

  const handleEditFunction = (post: any, platform: string, uuid: string) => {
    setSelectedPost(post);
    setCollectPlatform(platform);
    setIsModalOpen(true);
    setContent(post?.discription?.join("\n") || "");
    setUUIDS(uuid);
    setFileData(null);
  };

  const handleSaveAndEditPost = async () => {
    try {
      let formData = new FormData();
      if (fileData) {
        formData.append("image", fileData);
      }
      formData.append("content", JSON.stringify([content]));
      const postId = selectedPost[`${CollectPlatform}_id`];
      setLoadingApi(true);
      const response = await UpdateImageSocialMedia(
        UUIDS,
        postId,
        CollectPlatform,
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
        setGeneratedPostDetails((prev: any) => {
          const updatedPosts = { ...prev };
          const posts = updatedPosts.data[`${CollectPlatform}_posts`];
          let updated;
          if (fileData) {
            updated = posts.map((post: any) =>
              post[`${CollectPlatform}_id`] === postId
                ? { ...post, image: localImage, discription: [content] }
                : post
            );
          } else {
            updated = posts.map((post: any) =>
              post[`${CollectPlatform}_id`] === postId
                ? { ...post, discription: [content] }
                : post
            );
          }

          updatedPosts.data[`${CollectPlatform}_posts`] = updated;
          return updatedPosts;
        });
      }
    } catch (error: any) {
      setLoadingApi(false);
      console.log("Failed to handleSaveAndEditPost.", error);
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

  const handleCloseSchedule = () => {
    setSuccessScheduleModel(false);
    setScheduleDateAndTime("");
  };

  const handleSchedule = async (scheduledDate: string, timeZone: any) => {
    setScheduleDateAndTime(scheduledDate);
    const formData = {
      uuid: UUIDS,
      schedule_time: scheduledDate,
      content: [selectedPost],
      timezone: timeZone,
    };
    try {
      const response = await AddScheduleSocialMedia(formData);
      if (response.status === 201 || response.status === 200) {
        toast.success("Added Schedule successfully");
        setGeneratedPostDetails((prev: any) => {
          const updatedPosts = { ...prev };
          const posts = updatedPosts.data[`${CollectPlatform}_posts`];
          const updated = posts.map((post: any) =>
            post[`${CollectPlatform}_id`] ===
            selectedPost[`${CollectPlatform}_id`]
              ? { ...post, isSchedule: true }
              : post
          );
          updatedPosts.data[`${CollectPlatform}_posts`] = updated;
          return updatedPosts;
        });

        setUUIDS("");
        setSelectedPost(null);
        setCollectPlatform("");
        setShowModal(false);
        setSuccessScheduleModel(true);
      }
    } catch (error) {
      console.error("Error is create schedule", error);
    }
  };

  const handleChangeFilename = async () => {
    if (!content.trim()) {
      toast.warning("Please enter a Filename");
      return;
    }
    if (!UUIDS) {
      toast.error("Missing UUID");
      return;
    }
    try {
      let formData = new FormData();
      formData.append("new_file_name", content);
      const response = await UpdateFileNameSocialMedia(UUIDS, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("FileName updated successfully");
        setGeneratedPostDetails((prev: any) =>
          prev.id === UUIDS ? { ...prev, fileName: content } : prev
        );
        setShowFileModal(false);
        setContent("");
        setUUIDS("");
      }
    } catch (error: any) {
      console.error("Error updating title:", error);
    }
  };

  const handleCloseFileModel = () => {
    setShowFileModal(false);
    setContent("");
    setUUIDS("");
  };

  const handleDelete = async (uuid: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this set?"
      );
      if (!isConfirmed) {
        return;
      }
      const formData = { uuid };
      const response = await deleteSocialMediaData(formData);
      if (response.status === 200) {
        navigate("/social/GeneratePost");
        toast.success("File successfully deleted!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      console.log("Failed to delete file.");
    }
  };

  const extractHashtags = (descriptionArray: string[]) => {
    const text = descriptionArray.join(" ");
    const hashtags = text.match(/#[a-zA-Z0-9_]+/g);
    return hashtags || [];
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content  generate_post">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-people-fill me-1 text_blue"></i> Post
                Generator
                <span className="text_blue">
                  /
                  {generatedPostDetails?.fileName
                    ? generatedPostDetails.fileName.charAt(0).toUpperCase() +
                      generatedPostDetails.fileName.slice(1)
                    : ""}
                </span>
                <span
                  className="heading_edit"
                  onClick={() => {
                    setShowFileModal(true);
                    setUUIDS(generatedPostDetails?.id);
                    setContent(generatedPostDetails?.fileName);
                  }}
                >
                  <i
                    className="bi bi-pencil-fill"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </h2>
            </div>
            {ShowFileModal && (
              <FileNameUpdateModal
                content={content}
                setContent={setContent}
                handleClose={handleCloseFileModel}
                handleSave={handleChangeFilename}
              />
            )}
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
              <div className="multi_post_wrapper">
                <div className="download_media mb-3">
                  <button
                    className="btn primary_btn"
                    onClick={() => handleDelete(generatedPostDetails?.id)}
                  >
                    Delete the set
                  </button>
                  <button
                    className="btn primary_btn ms-2"
                    onClick={() => navigate("/social/GeneratePost")}
                  >
                    Generate new set
                  </button>
                  <button className="btn primary_btn ms-2">
                    Download <i className="bi bi-download ms-1"></i>
                  </button>
                </div>
                {generatedPostDetails?.data?.linkedin_posts?.length > 0 && (
                  <div className="social_post_wrapper linkedin_post mb-4">
                    <h3 className="font_20 font_600 mb-3">LinkedIn Posts</h3>
                    <div className="social_media_outer">
                      {generatedPostDetails.data.linkedin_posts.map(
                        (post: any) => (
                          <div
                            className="social_media_item box-shadow bg-white"
                            key={post.linkedin_id}
                          >
                            <div className="item_header">
                              <div className="item_left">
                                {post?.isSchedule ? (
                                  <button
                                    className="secondary_btn secondary_btn_outline"
                                    style={{ marginRight: "10px" }}
                                  >
                                    Scheduled
                                  </button>
                                ) : (
                                  <>
                                    <button className="btn primary_btn_outline">
                                      Publish
                                    </button>
                                    <button
                                      className="btn primary_btn_outline"
                                      onClick={() =>
                                        handleScheduleClick(
                                          generatedPostDetails?.id,
                                          post,
                                          "linkedin"
                                        )
                                      }
                                    >
                                      Schedule
                                    </button>
                                  </>
                                )}
                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    handleEditFunction(
                                      post,
                                      "linkedin",
                                      generatedPostDetails?.id
                                    );
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="item_right">
                                <button
                                  className="btn text_orange font_20 pe-0"
                                  aria-label="remove_icon"
                                  onClick={() =>
                                    deletePostFromServer(
                                      generatedPostDetails?.id,
                                      post?.linkedin_id,
                                      "linkedin"
                                    )
                                  }
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </div>
                            </div>

                            {post.image ? (
                              <div className="social_post_img my-3">
                                <img
                                  src={post.image}
                                  className="img-fluid"
                                  alt="linkedin_post_image"
                                />
                              </div>
                            ) : (
                              <div className="add_media">
                                <input
                                  type="file"
                                  className="media_input"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      post.linkedin_id,
                                      "linkedin",
                                      generatedPostDetails?.id
                                    )
                                  }
                                />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}

                            <div className="social_post_content font_16">
                              {post.discription.map(
                                (text: string, i: number) => {
                                  const withoutHashtags = text
                                    .replace(/#[a-zA-Z0-9_]+/g, "")
                                    .trim();
                                  return (
                                    <ReactMarkdown key={i}>
                                      {withoutHashtags}
                                    </ReactMarkdown>
                                  );
                                }
                              )}
                            </div>
                            {extractHashtags(post.discription).length > 0 && (
                              <div className="post_hastag mt-3">
                                {extractHashtags(post.discription).map(
                                  (tag, idx) => (
                                      <span className="hashtag me-2" style={{color:"rgb(72, 114, 183)"}} key={idx}>
                                      {tag}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {generatedPostDetails?.data?.twitter_posts?.length > 0 && (
                  <div className="social_post_wrapper twitter_post mb-4">
                    <h3 className="font_20 font_600 mb-3">X Posts</h3>
                    <div className="social_media_outer">
                      {generatedPostDetails.data.twitter_posts.map(
                        (post: any) => (
                          <div
                            className="social_media_item box-shadow bg-white"
                            key={post.twitter_id}
                          >
                            <div className="item_header">
                              <div className="item_left">
                                {post?.isSchedule ? (
                                  <button
                                    className="secondary_btn secondary_btn_outline"
                                    style={{ marginRight: "10px" }}
                                  >
                                    Scheduled
                                  </button>
                                ) : (
                                  <>
                                    <button className="btn primary_btn_outline">
                                      Publish
                                    </button>
                                    <button
                                      className="btn primary_btn_outline"
                                      onClick={() =>
                                        handleScheduleClick(
                                          generatedPostDetails?.id,
                                          post,
                                          "twitter"
                                        )
                                      }
                                    >
                                      Schedule
                                    </button>
                                  </>
                                )}
                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    handleEditFunction(
                                      post,
                                      "twitter",
                                      generatedPostDetails?.id
                                    );
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="item_right">
                                <button
                                  className="btn text_orange font_20 pe-0"
                                  aria-label="remove_icon"
                                  onClick={() =>
                                    deletePostFromServer(
                                      generatedPostDetails?.id,
                                      post?.twitter_id,
                                      "twitter"
                                    )
                                  }
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </div>
                            </div>

                            {post.image ? (
                              <div className="social_post_img my-3">
                                <img
                                  src={post.image}
                                  className="img-fluid"
                                  alt="twitter_post_image"
                                />
                              </div>
                            ) : (
                              <div className="add_media">
                                <input
                                  type="file"
                                  className="media_input"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      post.twitter_id,
                                      "twitter",
                                      generatedPostDetails?.id
                                    )
                                  }
                                />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}

                             <div className="social_post_content font_16">
                              {post.discription.map(
                                (text: string, i: number) => {
                                  const withoutHashtags = text
                                    .replace(/#[a-zA-Z0-9_]+/g, "")
                                    .trim();
                                  return (
                                    <ReactMarkdown key={i}>
                                      {withoutHashtags}
                                    </ReactMarkdown>
                                  );
                                }
                              )}
                            </div>
                            {extractHashtags(post.discription).length > 0 && (
                              <div className="post_hastag mt-3">
                                {extractHashtags(post.discription).map(
                                  (tag, idx) => (
                                      <span className="hashtag me-2" style={{color:"rgb(72, 114, 183)"}} key={idx}>
                                      {tag}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {generatedPostDetails?.data?.facebook_posts?.length > 0 && (
                  <div className="social_post_wrapper facebook_post mb-4">
                    <h3 className="font_20 font_600 mb-3">Facebook Posts</h3>
                    <div className="social_media_outer">
                      {generatedPostDetails.data.facebook_posts.map(
                        (post: any) => (
                          <div
                            className="social_media_item box-shadow bg-white"
                            key={post.facebook_id}
                          >
                            <div className="item_header">
                              <div className="item_left">
                                {post?.isSchedule ? (
                                  <button
                                    className="secondary_btn secondary_btn_outline"
                                    style={{ marginRight: "10px" }}
                                  >
                                    Scheduled
                                  </button>
                                ) : (
                                  <>
                                    <button className="btn primary_btn_outline">
                                      Publish
                                    </button>
                                    <button
                                      className="btn primary_btn_outline"
                                      onClick={() =>
                                        handleScheduleClick(
                                          generatedPostDetails?.id,
                                          post,
                                          "facebook"
                                        )
                                      }
                                    >
                                      Schedule
                                    </button>
                                  </>
                                )}

                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    handleEditFunction(
                                      post,
                                      "facebook",
                                      generatedPostDetails?.id
                                    );
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="item_right">
                                <button
                                  className="btn text_orange font_20 pe-0"
                                  aria-label="remove_icon"
                                  onClick={() =>
                                    deletePostFromServer(
                                      generatedPostDetails?.id,
                                      post?.facebook_id,
                                      "facebook"
                                    )
                                  }
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </div>
                            </div>

                            {post.image ? (
                              <div className="social_post_img my-3">
                                <img
                                  src={post.image}
                                  className="img-fluid"
                                  alt="facebook_post_image"
                                />
                              </div>
                            ) : (
                              <div className="add_media">
                                <input
                                  type="file"
                                  className="media_input"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      post.facebook_id,
                                      "facebook",
                                      generatedPostDetails?.id
                                    )
                                  }
                                />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}

                            <div className="social_post_content font_16">
                              {post.discription.map(
                                (text: string, i: number) => {
                                  const withoutHashtags = text
                                    .replace(/#[a-zA-Z0-9_]+/g, "")
                                    .trim();
                                  return (
                                    <ReactMarkdown key={i}>
                                      {withoutHashtags}
                                    </ReactMarkdown>
                                  );
                                }
                              )}
                            </div>
                            {extractHashtags(post.discription).length > 0 && (
                              <div className="post_hastag mt-3">
                                {extractHashtags(post.discription).map(
                                  (tag, idx) => (
                                      <span className="hashtag me-2" style={{color:"rgb(72, 114, 183)"}} key={idx}>
                                      {tag}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                         
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {generatedPostDetails?.data?.instagram_posts?.length > 0 && (
                  <div className="social_post_wrapper instagram_post mb-4">
                    <h3 className="font_20 font_600 mb-3">Instagram Posts</h3>
                    <div className="social_media_outer">
                      {generatedPostDetails.data.instagram_posts.map(
                        (post: any, index: number) => (
                          <div
                            className="social_media_item box-shadow bg-white"
                            key={index}
                          >
                            <div className="item_header">
                              <div className="item_left">
                                {post?.isSchedule ? (
                                  <button
                                    className="secondary_btn secondary_btn_outline"
                                    style={{ marginRight: "10px" }}
                                  >
                                    Scheduled
                                  </button>
                                ) : (
                                  <>
                                    <button className="btn primary_btn_outline">
                                      Publish
                                    </button>
                                    <button
                                      className="btn primary_btn_outline"
                                      onClick={() =>
                                        handleScheduleClick(
                                          generatedPostDetails?.id,
                                          post,
                                          "instagram"
                                        )
                                      }
                                    >
                                      Schedule
                                    </button>
                                  </>
                                )}

                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    handleEditFunction(
                                      post,
                                      "instagram",
                                      generatedPostDetails?.id
                                    );
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="item_right">
                                <button
                                  className="btn text_orange font_20 pe-0"
                                  aria-label="remove_icon"
                                  onClick={() =>
                                    deletePostFromServer(
                                      generatedPostDetails?.id,
                                      post?.instagram_id,
                                      "instagram"
                                    )
                                  }
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </div>
                            </div>
                            {post.image ? (
                              <div className="social_post_img my-3">
                                <img
                                  src={post.image}
                                  className="img-fluid"
                                  alt="facebook_post_image"
                                />
                              </div>
                            ) : (
                              <div className="add_media">
                                <input
                                  type="file"
                                  className="media_input"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      post.instagram_id,
                                      "instagram",
                                      generatedPostDetails?.id
                                    )
                                  }
                                />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}
                             <div className="social_post_content font_16">
                              {post.discription.map(
                                (text: string, i: number) => {
                                  const withoutHashtags = text
                                    .replace(/#[a-zA-Z0-9_]+/g, "")
                                    .trim();
                                  return (
                                    <ReactMarkdown key={i}>
                                      {withoutHashtags}
                                    </ReactMarkdown>
                                  );
                                }
                              )}
                            </div>
                            {extractHashtags(post.discription).length > 0 && (
                              <div className="post_hastag mt-3">
                                {extractHashtags(post.discription).map(
                                  (tag, idx) => (
                                      <span className="hashtag me-2" style={{color:"#e25087"}} key={idx}>
                                      {tag}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {generatedPostDetails?.data?.tiktok_posts?.length > 0 && (
                  <div className="social_post_wrapper tiktok_post mb-4">
                    <h3 className="font_20 font_600 mb-3">Tiktok Posts</h3>
                    <div className="social_media_outer">
                      {generatedPostDetails.data.tiktok_posts.map(
                        (post: any, index: number) => (
                          <div
                            className="social_media_item box-shadow bg-white"
                            key={index}
                          >
                            <div className="item_header">
                              <div className="item_left">
                                {post?.isSchedule ? (
                                  <button
                                    className="secondary_btn secondary_btn_outline"
                                    style={{ marginRight: "10px" }}
                                  >
                                    Scheduled
                                  </button>
                                ) : (
                                  <>
                                    <button className="btn primary_btn_outline">
                                      Publish
                                    </button>
                                    <button
                                      className="btn primary_btn_outline"
                                      onClick={() =>
                                        handleScheduleClick(
                                          generatedPostDetails?.id,
                                          post,
                                          "tiktok"
                                        )
                                      }
                                    >
                                      Schedule
                                    </button>
                                  </>
                                )}

                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    handleEditFunction(
                                      post,
                                      "tiktok",
                                      generatedPostDetails?.id
                                    );
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="item_right">
                                <button
                                  className="btn text_orange font_20 pe-0"
                                  aria-label="remove_icon"
                                  onClick={() =>
                                    deletePostFromServer(
                                      generatedPostDetails?.id,
                                      post?.tiktok_id,
                                      "tiktok"
                                    )
                                  }
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </div>
                            </div>
                            {post.image ? (
                              <div className="social_post_img my-3">
                                <img
                                  src={post.image}
                                  className="img-fluid"
                                  alt="facebook_post_image"
                                />
                              </div>
                            ) : (
                              <div className="add_media">
                                <input
                                  type="file"
                                  className="media_input"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      post.tiktok_id,
                                      "tiktok",
                                      generatedPostDetails?.id
                                    )
                                  }
                                />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}
                            <div className="social_post_content font_16">
                              {post.discription.map(
                                (text: string, i: number) => {
                                  const withoutHashtags = text
                                    .replace(/#[a-zA-Z0-9_]+/g, "")
                                    .trim();
                                  return (
                                    <ReactMarkdown key={i}>
                                      {withoutHashtags}
                                    </ReactMarkdown>
                                  );
                                }
                              )}
                            </div>
                            {extractHashtags(post.discription).length > 0 && (
                              <div className="post_hastag mt-3">
                                {extractHashtags(post.discription).map(
                                  (tag, idx) => (
                                      <span className="hashtag me-2" style={{color:"#9ce0ee"}} key={idx}>
                                      {tag}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <ScheduleModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSchedule={handleSchedule}
            />

            {SuccessScheduleModel && (
              <div className="custom-modal-overlay">
                <div className="custom-modal-content">
                  <div className="schedule_box">
                    <p className="font_16 mb-1">Your post has been scheduled</p>
                    <p className="font_14 text_blue">
                      {formatScheduledDate(ScheduleDateAndTime)}
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
          </div>
        </div>
      </main>
    </>
  );
};

export default GeneratedPostResult;

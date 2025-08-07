import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import { useEffect, useState } from "react";
import Loading from "../../../Page/Loading/Loading";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import ScheduleModal from "../Common/ScheduleModal";
import {
  AddScheduleSocialMedia,
  deleteSocialMediaData,
  deleteSocialMediaPost,
  GetGeneratedPostById,
  PostPublicSocialMedia,
  UpdateFileNameSocialMedia,
  UpdateImageSocialMedia,
} from "../Common/SocialMediaServices";
import FileNameUpdateModal from "../../../Page/FileNameUpdateModal";
import DynamicConfirmModal from "../Common/DynamicConfirmModal";
import FaceBookListModal from "../Common/FaceBookListModal";
import MultiAccountModal from "../Common/MultiAccountModal";

const GeneratedPostResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedPostDetails, setGeneratedPostDetails] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [fileData, setFileData] = useState<any>(null);
  const [platform, setPlatform] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [successSchedule, setSuccessSchedule] = useState<boolean>(false);
  const [scheduleTime, setScheduleTime] = useState<string>("");
  const [loadingApi, setLoadingApi] = useState<boolean>(false);
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [selectedFacebookList, setSelectedFacebookList] = useState<any[]>([]);
  const [ShowListModal, setShowListModal] = useState<boolean>(false);
  const [ShowMultiAccountModal, setShowMultiAccountModal] =
    useState<boolean>(false);
  const [selectedLinkedIn, setSelectedLinkedIn] = useState<string>("");
  const [facebookPostPayload, setFacebookPostPayload] = useState({
    uuid: "",
    id: "",
    post: {},
    platform: "",
  });
  const handleScheduleClick = (uuid: string, post: any, platform: string) => {
    setSelectedFacebookList([]);
    setUuid(uuid);
    setSelectedPost(post);
    setShowModal(true);
    setScheduleTime("");
    setPlatform(platform);
  };

  const handlePublishSocialMedia = async (
    uuid: string,
    id: string,
    post: any,
    platform: string
  ) => {
     setPlatform(platform);
    if (platform === "facebook" && ShowListModal === false) {
      setSelectedFacebookList([]);
      setFacebookPostPayload({ uuid, id, post, platform });
      setShowListModal(true);
    } else if (platform === "linkedin" && ShowMultiAccountModal === false) {
      setSelectedFacebookList([]);
      setFacebookPostPayload({ uuid, id, post, platform });
      setShowMultiAccountModal(true);
    } else {
      try {
        setShowMultiAccountModal(false);
        setShowListModal(false);
        setLoadingApi(true);
        setLoading(true);
        const selectedFacebookListIds =
          selectedFacebookList?.length > 0
            ? selectedFacebookList.map((list: any) => ({
                name: list.label,
                page_id: list.value,
              }))
            : [];
        const response = await PostPublicSocialMedia({
          uuid,
          content: [post],
          page_details: selectedFacebookListIds,
          // Account:selectedLinkedIn
        });
        if (response.status === 201 || response.status === 200) {
          toast.success(`${platform} Post Publish successfully`);
          const response = await deleteSocialMediaPost(uuid, id, platform);
          if (response.status === 200 || response.status === 201) {
            setFacebookPostPayload({
              uuid: "",
              id: "",
              post: {},
              platform: "",
            });
            removePostFromState(platform, id);
            setPlatform("");
            setShowListModal(false);
            setShowMultiAccountModal(false);
          }
        }
      } catch (error) {
        console.log("Error during Publish Social Media", error);
      } finally {
        setLoadingApi(false);
        setLoading(false);
      }
    }
  };

  const handleCloseListModal = () => {
    handlePublishSocialMedia(
      facebookPostPayload.uuid,
      facebookPostPayload.id,
      facebookPostPayload.post,
      facebookPostPayload.platform
    );
  };

  useEffect(() => {
    if (id) fetchGeneratedPost(id);
  }, [id]);

  const fetchGeneratedPost = async (id: string) => {
    try {
      setLoading(true);
      const response = await GetGeneratedPostById(id);
      if (response.status === 200 || response.status === 201) {
        setGeneratedPostDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
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
    setPlatform("");
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    postId: string,
    platform: string,
    uuid: string
  ) => {
    const file = e.target.files?.[0];
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
      if (response.status === 201 || response.status === 200) {
        toast.success("Image added successfully");
        updatePostImage(platform, postId, response.data.image);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const updatePostImage = (
    platform: string,
    postId: string,
    imageUrl: string
  ) => {
    setGeneratedPostDetails((prev: any) => {
      const updated = { ...prev };
      const posts = updated.data[`${platform}_posts`];
      updated.data[`${platform}_posts`] = posts.map((post: any) =>
        post[`${platform}_id`] === postId ? { ...post, image: imageUrl } : post
      );
      return updated;
    });
  };

  const deletePost = async (uuid: string, id: string, platform: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await deleteSocialMediaPost(uuid, id, platform);
      if (response.status === 200) {
        removePostFromState(platform, id);
        toast.success("Post deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const removePostFromState = (platform: string, postId: string) => {
    console.log(platform, postId, "postId");
    setGeneratedPostDetails((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        [`${platform}_posts`]: prev.data[`${platform}_posts`].filter(
          (post: any) => post[`${platform}_id`] !== postId
        ),
      },
    }));
  };

  const handleEditPost = (post: any, platform: string, uuid: string) => {
    setSelectedPost(post);
    setPlatform(platform);
    setIsModalOpen(true);
    setContent(post?.discription?.join("\n") || "");
    setUuid(uuid);
  };

  const handleSavePost = async () => {
    try {
      const formData = new FormData();
      if (fileData) formData.append("image", fileData);
      formData.append("content", JSON.stringify([content]));

      setLoadingApi(true);
      const response = await UpdateImageSocialMedia(
        uuid,
        selectedPost[`${platform}_id`],
        platform,
        formData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Post updated successfully");
        updatePostContent(
          platform,
          selectedPost[`${platform}_id`],
          content,
          fileData ? localImage : null
        );
        handleClose();
      }
    } catch (error) {
      console.error("Failed to update post", error);
    } finally {
      setLoadingApi(false);
    }
  };

  const updatePostContent = (
    platform: string,
    postId: string,
    content: string,
    image: string | null
  ) => {
    setGeneratedPostDetails((prev: any) => {
      const updated = { ...prev };
      const posts = updated.data[`${platform}_posts`];
      updated.data[`${platform}_posts`] = posts.map((post: any) =>
        post[`${platform}_id`] === postId
          ? {
              ...post,
              discription: [content],
              ...(image && { image }),
            }
          : post
      );
      return updated;
    });
  };

  const formatScheduledDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSchedule = async (
    scheduledDate: string,
    timeZone: string,
    selectedFacebookList: any
  ) => {
    try {
      setScheduleTime(scheduledDate);

      const selectedFacebookListIds =
        selectedFacebookList?.length > 0
          ? selectedFacebookList.map((list: any) => ({
              name: list.label,
              page_id: list.value,
            }))
          : [];

      const response = await AddScheduleSocialMedia({
        uuid,
        schedule_time: scheduledDate,
        content: [selectedPost],
        timezone: timeZone,
        page_details: selectedFacebookListIds,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Post scheduled successfully");
        markPostAsScheduled(platform, selectedPost[`${platform}_id`]);
        setShowModal(false);
        setSuccessSchedule(true);
        setSelectedFacebookList([]);
      }
    } catch (error) {
      console.error("Error scheduling post", error);
    }
  };

  const markPostAsScheduled = (platform: string, postId: string) => {
    setGeneratedPostDetails((prev: any) => {
      const updated = { ...prev };
      const posts = updated.data[`${platform}_posts`];
      updated.data[`${platform}_posts`] = posts.map((post: any) =>
        post[`${platform}_id`] === postId ? { ...post, isSchedule: true } : post
      );
      return updated;
    });
  };

  const handleUpdateFilename = async () => {
    if (!content.trim()) {
      toast.warning("Please enter a filename");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("new_file_name", content);
      const response = await UpdateFileNameSocialMedia(uuid, formData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Filename updated");
        setGeneratedPostDetails((prev: any) =>
          prev.id === uuid ? { ...prev, fileName: content } : prev
        );
        setShowFileModal(false);
      }
    } catch (error) {
      console.error("Error updating filename", error);
    }
  };

  const handleDeleteSet = async (uuid: string) => {
    if (!window.confirm("Are you sure you want to delete this set?")) return;

    try {
      const response = await deleteSocialMediaData({ uuid });
      if (response.status === 200) {
        navigate("/social/GeneratePost");
        toast.success("Set deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete set", error);
    }
  };

  const extractHashtags = (description: string[]) => {
    const text = description.join(" ");
    return text.match(/#[a-zA-Z0-9_]+/g) || [];
  };

  const renderPostContent = (description: string[]) => {
    return description.map((text, i) => (
      <ReactMarkdown key={i}>
        {text.replace(/#[a-zA-Z0-9_]+/g, "").trim()}
      </ReactMarkdown>
    ));
  };

  const renderHashtags = (description: string[], color: string) => {
    const hashtags = extractHashtags(description);
    if (!hashtags.length) return null;

    return (
      <div className="post_hastag mt-3">
        {hashtags.map((tag, idx) => (
          <span key={idx} className="hashtag me-2" style={{ color }}>
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const renderPostSection = (
    platform: string,
    title: string,
    color: string
  ) => {
    const posts = generatedPostDetails?.data?.[`${platform}_posts`];
    if (!posts?.length) return null;

    return (
      <div className={`social_post_wrapper ${platform}_post mb-4`}>
        <h3 className="font_20 font_600 mb-3">{title} Posts</h3>
        <div className="social_media_outer">
          {posts.map((post: any) => (
            <div
              className="social_media_item box-shadow bg-white"
              key={post[`${platform}_id`]}
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
                      <button
                        className="btn primary_btn_outline"
                        onClick={() =>
                          handlePublishSocialMedia(
                            generatedPostDetails?.id,
                            post[`${platform}_id`],
                            post,
                            platform
                          )
                        }
                      >
                        Publish
                      </button>
                      <button
                        className="btn primary_btn_outline"
                        onClick={() =>
                          handleScheduleClick(
                            generatedPostDetails?.id,
                            post,
                            platform
                          )
                        }
                      >
                        Schedule
                      </button>
                    </>
                  )}
                  <button
                    className="btn primary_btn_outline"
                    onClick={() =>
                      handleEditPost(post, platform, generatedPostDetails?.id)
                    }
                  >
                    Edit
                  </button>
                </div>
                <div className="item_right">
                  <button
                    className="btn text_orange font_20 pe-0"
                    onClick={() =>
                      deletePost(
                        generatedPostDetails?.id,
                        post[`${platform}_id`],
                        platform
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
                    alt={`${platform}_post`}
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
                        post[`${platform}_id`],
                        platform,
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
                {renderPostContent(post.discription)}
              </div>
              {renderHashtags(post.discription, color)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content">
          <div className="keyword_tool_content generate_post">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-people-fill me-1 text_blue"></i> Post
                Generator
                <span className="text_blue">
                  /{generatedPostDetails?.fileName || ""}
                </span>
                <span
                  className="heading_edit"
                  onClick={() => {
                    setShowFileModal(true);
                    setUuid(generatedPostDetails?.id);
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

            {showFileModal && (
              <FileNameUpdateModal
                content={content}
                setContent={setContent}
                handleClose={() => setShowFileModal(false)}
                handleSave={handleUpdateFilename}
              />
            )}

            {isModalOpen ? (
              <div className="edit_post_wrapper box-shadow">
                <button
                  className="btn text_orange font_20 edit_post_close"
                  onClick={handleClose}
                >
                  <i className="bi bi-x"></i>
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
                        alt="post"
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
                              setLocalImage(URL.createObjectURL(file));
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
                            setLocalImage(URL.createObjectURL(file));
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
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="edit_post_footer text-end">
                    <button
                      className="btn primary_btn"
                      onClick={handleSavePost}
                    >
                      {loadingApi ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="multi_post_wrapper">
                <div className="download_media mb-3">
                  <button
                    className="btn primary_btn"
                    onClick={() => handleDeleteSet(generatedPostDetails?.id)}
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

                {renderPostSection("linkedin", "LinkedIn", "rgb(72, 114, 183)")}
                {renderPostSection("twitter", "X", "rgb(72, 114, 183)")}
                {renderPostSection("facebook", "Facebook", "rgb(72, 114, 183)")}
                {renderPostSection("instagram", "Instagram", "#e25087")}
                {renderPostSection("tiktok", "TikTok", "#9ce0ee")}
              </div>
            )}
            <ScheduleModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSchedule={handleSchedule}
              platform={platform}
              selectedFacebookList={selectedFacebookList}
              setSelectedFacebookList={setSelectedFacebookList}
            />

            <DynamicConfirmModal
              isOpen={successSchedule}
              title="Your post has been scheduled"
              dateText={formatScheduledDate(scheduleTime)}
              onClose={() => setSuccessSchedule(false)}
            />
            <FaceBookListModal
              isOpen={ShowListModal}
              selectedFacebookList={selectedFacebookList}
              setSelectedFacebookList={setSelectedFacebookList}
              onClose={handleCloseListModal}
              handleCancel={() => setShowListModal(false)}
            />

            <MultiAccountModal
              title="Select LinkedIn Account"
              platform={platform}
              isOpen={ShowMultiAccountModal}
              selectedLinkedIn={selectedLinkedIn}
              setSelectedLinkedIn={setSelectedLinkedIn}
              onSubmit={handleCloseListModal}
              handleCancel={() => setShowMultiAccountModal(false)}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default GeneratedPostResult;

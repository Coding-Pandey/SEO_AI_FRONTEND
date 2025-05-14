import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import Loading from "../../Page/Loading/Loading";
import {
  deleteSocialMediaPost,
  GetGeneratedPostById,
} from "../Services/Services";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const GeneratedPostResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedPostDetails, setGeneratedPostDetails] = useState<any | null>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  console.log(generatedPostDetails);
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
        console.log(response.data, "data");
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
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    postId: string,
    platform: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const localImageUrl = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("postId", postId);
    formData.append("platform", platform);

    try {
      // const response = await fetch("/api/upload-post-image", {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await response.json();

      // if (response.ok && data.imageUrl) {
      // update image in local UI
      setGeneratedPostDetails((prev: any) => {
        const updatedPosts = { ...prev };
        const posts = updatedPosts.data[`${platform}_posts`];
        const updated = posts.map((post: any) =>
          (platform === "linkedin" ? post.linkedIn_id : post.twitter_id) ===
          postId
            ? //  { ...post, image: data.imageUrl }
              { ...post, image: localImageUrl }
            : post
        );
        updatedPosts.data[`${platform}_posts`] = updated;
        return updatedPosts;
      });
      // }
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

  return (
    <>
      {loading && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content  generate_post">
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
                  {selectedPost.image ? (
                    <div className="social_post_img my-3">
                      <img
                        src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                        className="img-fluid"
                        alt="image"
                      />
                    </div>
                  ) : (
                    <div className="add_media">
                      <input type="file" className="media_input" />
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
                      defaultValue={selectedPost.discription || ""}
                    />
                  </div>

                  <div className="edit_post_footer text-end">
                    <button className="btn primary_btn">Save</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="multi_post_wrapper">
                <div className="download_media mb-3">
                  <button className="btn primary_btn">Delete the set</button>
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
                            key={post.linkedIn_id}
                          >
                            <div className="item_header">
                              <div className="item_left">
                                <button className="btn primary_btn_outline">
                                  Publish
                                </button>
                                <button className="btn primary_btn_outline">
                                  Schedule
                                </button>
                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setIsModalOpen(true);
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
                                      post?.linkedIn_id,
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
                                <input type="file" className="media_input" />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}

                            <div className="social_post_content font_16">
                              {post.discription.map((text: any, i: any) => (
                                <ReactMarkdown key={i}>{text}</ReactMarkdown>
                              ))}

                              {post?.list_items?.length > 0 && (
                                <ul>
                                  {post.list_items.map(
                                    (item: string, i: number) => (
                                      <li key={i}>{item}</li>
                                    )
                                  )}
                                </ul>
                              )}

                              {post.hashtag?.length > 0 && (
                                <div className="post_hastag">
                                  {post.hashtag.map((tag: any, i: any) => (
                                    <span className="text_blue" key={i}>
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
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
                                <button className="btn primary_btn_outline">
                                  Publish
                                </button>
                                <button className="btn primary_btn_outline">
                                  Schedule
                                </button>
                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setIsModalOpen(true);
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
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      post.twitter_id,
                                      "twitter"
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
                              {post.discription?.map((text: any, i: number) => (
                                <ReactMarkdown key={i}>{text}</ReactMarkdown>
                              ))}

                              {post.hashtag?.length > 0 && (
                                <div className="post_hastag">
                                  {post.hashtag.map((tag: any, i: number) => (
                                    <span className="text_blue" key={i}>
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
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
                                <button className="btn primary_btn_outline">
                                  Publish
                                </button>
                                <button className="btn primary_btn_outline">
                                  Schedule
                                </button>
                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setIsModalOpen(true);
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
                                <input type="file" className="media_input" />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}

                            <div className="social_post_content font_16">
                              {post.discription.map((text: any, i: any) => (
                                <ReactMarkdown key={i}>{text}</ReactMarkdown>
                              ))}

                              {post.hashtag?.length > 0 && (
                                <div className="post_hastag">
                                  {post.hashtag.map((tag: any, i: any) => (
                                    <span className="text_blue" key={i}>
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
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
                                <button className="btn primary_btn_outline">
                                  Publish
                                </button>
                                <button className="btn primary_btn_outline">
                                  Schedule
                                </button>
                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setIsModalOpen(true);
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
                                <input type="file" className="media_input" />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}
                            <div className="social_post_content font_16">
                              {post.discription.map((text: any, i: any) => (
                                <ReactMarkdown key={i}>{text}</ReactMarkdown>
                              ))}
                              {post.hashtag?.length > 0 && (
                                <div className="post_hastag">
                                  {post.hashtag.map(
                                    (tag: string, i: number) => (
                                      <span className="text_blue" key={i}>
                                        #{tag}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
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
                                <button className="btn primary_btn_outline">
                                  Publish
                                </button>
                                <button className="btn primary_btn_outline">
                                  Schedule
                                </button>
                                <button
                                  className="btn primary_btn_outline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setIsModalOpen(true);
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
                                <input type="file" className="media_input" />
                                <div className="media_text">
                                  <i className="bi bi-plus-circle"></i>
                                  <span>Add media</span>
                                </div>
                              </div>
                            )}
                            <div className="social_post_content font_16">
                              {post.discription.map((text: any, i: any) => (
                                <ReactMarkdown key={i}>{text}</ReactMarkdown>
                              ))}
                              {post.hashtag?.length > 0 && (
                                <div className="post_hastag">
                                  {post.hashtag.map(
                                    (tag: string, i: number) => (
                                      <span className="text_blue" key={i}>
                                        #{tag}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default GeneratedPostResult;

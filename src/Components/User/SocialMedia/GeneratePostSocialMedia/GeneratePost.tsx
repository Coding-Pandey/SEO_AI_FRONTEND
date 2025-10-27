import { useState, ChangeEvent, useEffect } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import Loading from "../../../Page/Loading/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PreviouslyCreatedPosts from "../../../Page/PreviouslyCreatedPosts";
import {
  GeneratePostService,
  deleteSocialMediaData,
  GetSocialMediaData,
  GetUploadedSourcefiles,
  getSMContentObjectives,
} from "../Common/SocialMediaServices";
import { ContentObjective } from "../../Content/ContentGeneration";
import DynamicConfirmModal from "../Common/DynamicConfirmModal";

interface GeneratePostCluster {
  uuid: string;
  file_name: string;
  last_reset: string;
}

const GeneratePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [contentObjectives, setContentObjectives] = useState<
    ContentObjective[]
  >([]);
  const [contentObjectivesId, setContentObjectivesId] = useState<number[]>([]);
  // const [PostObjectives, setPostObjectives] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [audience, setAudience] = useState<string[]>([]);
  const [additional, setAdditional] = useState<string[]>([]);
  const [generatedPostData, setGeneratedPostData] = useState<
    GeneratePostCluster[]
  >([]);
  const [UploadedSourcefiles, setUploadedSourcefiles] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetchPPCClusterData();
  }, []);

  const fetchPPCClusterData = async () => {
    try {
      setLoading(true);
      const response = await GetSocialMediaData();
      const responseSourcefiles = await GetUploadedSourcefiles();
      const responseContentObjectives = await getSMContentObjectives();
      if (response.status === 200 || response.status === 201) {
        const sortedData = response.data.sort(
          (a: GeneratePostCluster, b: GeneratePostCluster) =>
            new Date(b.last_reset).getTime() - new Date(a.last_reset).getTime()
        );
        setGeneratedPostData(sortedData);
        setUploadedSourcefiles(responseSourcefiles.data);
        setContentObjectives(responseContentObjectives.data.objectives);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetchPPCClusterData:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files.length > 0) {
    //   setFile(e.target.files[0]);
    // }
    const file = e.target.files?.[0];
    const allowedExtensions = /(\.doc|\.docx)$/i;

    if (file) {
      if (!allowedExtensions.test(file.name)) {
        toast.error("Only .doc and .docx files are allowed!");
        e.target.value = "";
        return;
      }

      setFile(file); // Your state setter
    }
  };

  const handleCheckbox = (
    value: string,
    selectedList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedList.includes(value)) {
      setter(selectedList.filter((item) => item !== value));
    } else {
      setter([...selectedList, value]);
    }
  };

  // const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;

  //   setPostObjectives((prev) => {
  //     let updatedObjectives;
  //     if (checked) {
  //       updatedObjectives = [...prev, value];
  //     } else {
  //       updatedObjectives = prev.filter((item) => item !== value);
  //     }
  //     return updatedObjectives;
  //   });
  // };

  const handleObjectiveIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const objectiveId = Number(value);

    setContentObjectivesId((prev) => {
      let updatedObjectives;
      if (checked) {
        updatedObjectives = [...prev, objectiveId];
      } else {
        updatedObjectives = prev.filter((item) => item !== objectiveId);
      }
      return updatedObjectives;
    });
  };

  const handleUpload = async () => {
    if (!input) {
      toast.warning("Please fill the post name.");
      return;
    } else if (!file && !description) {
      toast.warning("Please upload file or fill description.");
      return;
    } else if (platforms?.length <= 0) {
      toast.warning("Please select the platforms.");
      return;
    }

    try {
      const platformsToCheck: string[] = [
        "facebook",
        "instagram",
        "twitter",
        "linkedin",
        "tiktok",
      ];

      const posts: { [key: string]: boolean | null } = platformsToCheck.reduce(
        (acc: any, platform) => {
          // If the platform is in the array, set it to true, otherwise set it to null.
          acc[`${platform}_post`] = platforms.includes(platform) ? true : false;
          return acc;
        },
        {}
      );

      const hash_tag: boolean | null = additional.includes("hastag")
        ? true
        : false;
      const emoji: boolean | null = additional.includes("emojis")
        ? true
        : false;

      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("description", description);
      formData.append("fileName", input);
      platformsToCheck.forEach((platform) => {
        formData.append(`${platform}_post`, String(posts[`${platform}_post`]));
      });

      formData.append("objectives", JSON.stringify(objectives));
      formData.append("audience", JSON.stringify(audience));
      formData.append("hash_tag", String(hash_tag));
      formData.append("emoji", String(emoji));

      setLoading(true);
      const response = await GeneratePostService(formData);
      if (response.status === 200 || response.status === 201) {
        console.log(response.data, "response.data");
        setDescription("");
        setInput("");
        setFile(null);
        setAdditional([]);
        setPlatforms([]);
        setObjectives([]);
        setAudience([]);
        const id = response.data.uuid;
        navigate(`/social/GeneratedPostResult/${id}`);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setShowModal(true);
      setErrorMessage(
        error?.response?.data?.detail?.message ||
          "There was an error in the content generation"
      );
      console.log("Error handleUpload:", error);
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this file?"
      );
      if (!isConfirmed) {
        return;
      }
      const formData = { uuid };
      const response = await deleteSocialMediaData(formData);
      if (response.status === 200) {
        setGeneratedPostData((prevData) =>
          prevData.filter((item) => item.uuid !== uuid)
        );
        toast.success("File successfully deleted!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      console.log("Failed to delete file.");
    }
  };

  const handleNavigate = (id: string) => {
    navigate(`/social/GeneratedPostResult/${id}`);
  };

  const handleTargetAudience = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setAudience(() => {
      return checked ? [value] : [];
    });
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <DynamicConfirmModal
        isOpen={showModal}
        title="Missing Files"
        message={errorMessage}
        navigationPath="/ProfileSetting"
        onClose={() => {
          setShowModal(false);
          setErrorMessage("");
        }}
        navigateTo={() => {
          navigate("/ProfileSetting", {
            state: { activateSourceFilesTab: true },
          });
        }}
      />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content  generate_post">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-people-fill me-1 text_blue"></i> Post
                Generator
              </h2>
            </div>
            <div className="generate_post_form keyword_search_form">
              <div className="row gy-3 ">
                <PreviouslyCreatedPosts
                  posts={generatedPostData}
                  onDelete={handleDelete}
                  onNavigate={handleNavigate}
                />

                {/* Generate New Post */}
                <div className="col-12 col-xl-7">
                  <form>
                    <h2 className="font_25 font_500 mb-3">
                      Generate New Posts
                    </h2>
                    <div className="row">
                      {/* Post Name */}
                      <div className="col-12">
                        <label
                          htmlFor="generate_post_name"
                          className="font_20 font_500 mb-2"
                        >
                          Name your post set*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="generate_post_name"
                          placeholder="Enter fileName"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                      </div>

                      {/* Description */}
                      <div className="col-12">
                        <label
                          htmlFor="post_msg"
                          className="font_20 font_500 mb-2"
                        >
                          Describe Your Message or campaign*
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Describe your message"
                          id="post_msg"
                          style={{ height: "120px" }}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>

                      {/* File Upload */}
                      <div className="col-12">
                        <label
                          htmlFor="post_upload"
                          className="font_20 font_500 mb-2"
                        >
                          Upload Campaign Files
                        </label>

                        <div className="doc_file_wrapper">
                          <input
                            className="form-control upload_input"
                            type="file"
                            id="post_upload"
                            onChange={handleFileChange}
                            accept=".doc,.docx"
                          />
                          <div className="doc_left">
                            <p className="font_16 mb-1">
                              Drag and drop files here or{" "}
                              <span className="text_blue">browse</span> to
                              upload
                            </p>
                          </div>
                        </div>
                        {file && (
                          <div className="mt-2 mb-2 text-center">
                            <p className="font_16 mb-0">
                              <strong style={{ color: "rgb(250, 122, 78)" }}>
                                Uploaded file:
                              </strong>{" "}
                              {file.name}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Select Platforms */}
                      <div className="form_input mt-3">
                        <h3 className="font_20 font_500 mb-3">
                          Select Platforms
                        </h3>
                        <div className="row mb-2">
                          {[
                            "Facebook",
                            "Instagram",
                            "Twitter",
                            "LinkedIn",
                            "Tiktok",
                          ].map((platform, i) => (
                            <div className="col-12 col-lg-6 col-xxl-4" key={i}>
                              <input
                                type="checkbox"
                                id={`platform_${i}`}
                                value={platform.toLowerCase()}
                                onChange={() =>
                                  handleCheckbox(
                                    platform.toLowerCase(),
                                    platforms,
                                    setPlatforms
                                  )
                                }
                              />
                              <label
                                htmlFor={`platform_${i}`}
                                className="font_16 ms-1"
                              >
                                {platform}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Define Post Objective */}
                      <div className="form_input">
                        <h3 className="font_20 font_500 mb-3">
                          Define Post Objective
                        </h3>
                        <div className="row mb-2">
                          {contentObjectives?.length > 0 ? (
                            contentObjectives.map((item, i) => (
                              <div
                                className="col-12 col-lg-6 col-xxl-6"
                                key={item.id}
                              >
                                <div className="objective_box">
                                  <input
                                    type="checkbox"
                                    id={`persona_${i}`}
                                    name={`objective${i}`}
                                    checked={contentObjectivesId.includes(
                                      item.id
                                    )}
                                    value={item.id}
                                    onChange={handleObjectiveIdChange}
                                  />
                                  <label
                                    htmlFor={`persona_${i}`}
                                    className="font_16 ms-1"
                                  >
                                    {item.objective}
                                  </label>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-12">
                              <p className="text-muted">
                                No Post Objective uploaded.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Audience */}
                      <div className="form_input">
                        <h3 className="font_20 font_500 mb-3">Audience</h3>
                        <div className="row mb-2">
                          {UploadedSourcefiles?.Target_audience?.length > 0 ? (
                            // && UploadedSourcefiles?.define_objective?.length > 0
                            <>
                              {UploadedSourcefiles?.Target_audience.map(
                                (item: any, i: any) => (
                                  <div className="col-12" key={item.uuid_id}>
                                    <div className="objective_box">
                                      <input
                                        type="checkbox"
                                        name="audience"
                                        id={`persona1_${i}`}
                                        value={item.uuid_id}
                                        checked={audience[0] === item.uuid_id}
                                        onChange={handleTargetAudience}
                                      />
                                      <label
                                        htmlFor={`persona1_${i}`}
                                        className="font_16 ms-1"
                                      >
                                        {item.category} - {item.file_name}
                                      </label>
                                    </div>
                                  </div>
                                )
                              )}

                              {/* {UploadedSourcefiles.define_objective.map(
                                (item: any, i: any) => (
                                  <div
                                    className="col-12 col-lg-6 col-xxl-6"
                                    key={item.uuid_id}
                                  >
                                    <div className="objective_box">
                                      <input
                                        type="checkbox"
                                        id={`persona_${i}`}
                                        name={`objective${i}`}
                                        checked={PostObjectives.includes(
                                          item.uuid_id
                                        )}
                                        value={item.uuid_id}
                                        onChange={handleObjectiveChange}
                                      />
                                      <label
                                        htmlFor={`persona_${i}`}
                                        className="font_16 ms-1"
                                      >
                                        {item.category} - {item.file_name}
                                      </label>
                                    </div>
                                  </div>
                                )
                              )} */}
                            </>
                          ) : (
                            <div className="col-12">
                              <p className="text-muted">
                                No Audience uploaded.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional */}
                      <div className="form_input">
                        <h3 className="font_20 font_500 mb-3">Additional</h3>
                        <div className="row mb-2">
                          {["hastag", "emojis"].map((item, i) => (
                            <div
                              className={`col-12 col-lg-6 col-xxl-${
                                i === 0 ? "4" : "8"
                              }`}
                              key={i}
                            >
                              <input
                                type="checkbox"
                                id={item}
                                value={item}
                                onChange={() =>
                                  handleCheckbox(
                                    item,
                                    additional,
                                    setAdditional
                                  )
                                }
                              />
                              <label htmlFor={item} className="font_16 ms-1">
                                {item === "hastag"
                                  ? "Include Hashtags"
                                  : "Use Emojis"}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <button
                          className="btn primary_btn"
                          type="button"
                          onClick={handleUpload}
                        >
                          Generate
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
export default GeneratePost;

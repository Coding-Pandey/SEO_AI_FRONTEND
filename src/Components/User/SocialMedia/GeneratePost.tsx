import { useState, ChangeEvent } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { GeneratePostService } from "../Services/Services";
import Loading from "../../Page/Loading/Loading";

const GeneratePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [audience, setAudience] = useState<string[]>([]);
  const [additional, setAdditional] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
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

  const handleUpload = async () => {
    if (!file || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const platformsToCheck: string[] = [
        "facebook",
        "instagram",
        "twitter",
        "linkedIn",
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
      formData.append("file", file);
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
        setLoading(false);
        console.log(response.data, "response.data");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Error handleUpload:", error);
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
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-people-fill me-1 text_blue"></i> Post
                Generator
                <span className="text_blue">/ Research number one</span>
              </h2>
            </div>
            <div className="generate_post_form keyword_search_form">
              <div className="row gy-3 ">
                {/* Previously Created */}
                <div className="col-12 col-xl-5">
                  <div className="previously_created_warpper">
                    <h2 className="font_25 font_500 mb-4">
                      Previously Created (4/10)
                    </h2>
                    <ul className="previous_post p-0">
                      {[
                        { title: "Research number one", expires: "28 days" },
                        { title: "Another Research name", expires: "21 days" },
                        { title: "Number three new set", expires: "16 days" },
                        {
                          title: "Rure dolor in reprehendrit",
                          expires: "3 days",
                        },
                      ].map((item, index) => (
                        <li className="previous_item row" key={index}>
                          <div className="col-7">
                            <h3 className="font_16 font_600">{item.title}</h3>
                            <p className="font_16 mb-0">
                              Expires in {item.expires}
                            </p>
                          </div>
                          <div className="col-5 text-end">
                            <button className="btn primary_btn">View</button>
                            <button
                              className="btn pe-0 text_orange font_20"
                              aria-label="remove_icon"
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

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
                              <strong style={{color:"rgb(250, 122, 78)"}}>Uploaded file:</strong> {file.name}
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
                          {[
                            "Drive Traffic",
                            "Boost Engagement",
                            "Announce Product",
                            "Brand Awareness",
                            "Personal Post",
                            "Promote Event",
                          ].map((objective, i) => (
                            <div className="col-12 col-lg-6 col-xxl-6" key={i}>
                              <input
                                type="checkbox"
                                id={`objective_${i}`}
                                value={objective
                                  .toLowerCase()
                                  .replace(/\s/g, "")}
                                onChange={() =>
                                  handleCheckbox(
                                    objective.toLowerCase().replace(/\s/g, ""),
                                    objectives,
                                    setObjectives
                                  )
                                }
                              />
                              <label
                                htmlFor={`objective_${i}`}
                                className="font_16 ms-1"
                              >
                                {objective}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Audience */}
                      <div className="form_input">
                        <h3 className="font_20 font_500 mb-3">Audience</h3>
                        <div className="row mb-2">
                          {[
                            "Buyer Persona 1 - First Last Name",
                            "Buyer Persona 2 - First Last Name",
                            "Buyer Persona 3 - First Last Name",
                            "General Industry Audience",
                          ].map((persona, i) => (
                            <div className="col-12" key={i}>
                              <input
                                type="checkbox"
                                id={`persona_${i}`}
                                value={persona}
                                onChange={() =>
                                  handleCheckbox(persona, audience, setAudience)
                                }
                              />
                              <label
                                htmlFor={`persona_${i}`}
                                className="font_16 ms-1"
                              >
                                {persona}
                              </label>
                            </div>
                          ))}
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

            {/* <div className="multi_post_wrapper">
              <div className="download_media mb-3">
                <button className="btn primary_btn">Delete the set</button>
                <button className="btn primary_btn ms-2">
                  Generate new set
                </button>
                <button className="btn primary_btn ms-2">
                  Download <i className="bi bi-download ms-1"></i>
                </button>
              </div>
              <div className="social_post_wrapper linkedin_post mb-4">
                <h3 className="font_20 font_600 mb-3">LinkedIn Posts</h3>
                <div className="social_media_outer">
                  {[1, 2, 3].map((_, index) => (
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
                          <button className="btn primary_btn_outline">
                            Edit
                          </button>
                        </div>
                        <div className="item_right">
                          <button className="btn">
                            <i className="bi bi-x"></i>
                          </button>
                        </div>
                      </div>
                      <div className="social_post_img my-3">
                        <img
                          src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                          className="img-fluid"
                          alt="Post"
                        />
                      </div>
                      <div className="social_post_content font_16">
                        <p>
                          The way we do marketing is evolving-and so should you.
                          Marketing managers, are you struggling with execution
                          bottlenecks, scattered campaigns, and pressure from
                          leadership to deliver more with less? You're not
                          alone. But here's the thing-hiring a full in-house
                          team can cost £20K-£30K per month.
                        </p>
                        <p>
                          Now, let's break that down. That's salary, training.
                          software, and the cost of management. Hiring an SEO
                          manager alone costs around £40K a year. Add a PPC
                          specialist, a copywriter, a social media manager, a
                          designer-and you're looking at a hefty price tag. And
                          let's not forget recruitment time and training
                          periods. Enter "Plug & Play, Grow"—our £5K/month
                          accelerator that delivers expert multi-channel
                          campaigns without the headaches of recruitment,
                          overheads, and training.
                        </p>
                        {index === 1 && (
                          <p>
                            The way we do marketing is evolving-and so should
                            you. Marketing managers, are you struggling with
                            execution bottlenecks, scattered campaigns, and
                            pressure from leadership to deliver more with less?
                            You're not alone. But here's the thing-hiring a full
                            in-house team can cost £20K-£30K per month.
                          </p>
                        )}
                        <ul>
                          <li>
                            Instant integration-no long onboarding process
                          </li>
                          <li>
                            Full marketing execution at a fraction of in-house
                            costs
                          </li>
                          <li>
                            Advanced retargeting, A/B testing & automation for
                            maximised ROI
                          </li>
                        </ul>
                        {index !== 2 && (
                          <p>
                            For the same price as hiring a junior-level
                            employee, you get an entire expert marketing
                            team—SEO, PPC, social media, content creation, email
                            marketing, and AI-powered analytics. Why spend more
                            when you can achieve better results for less? Let's
                            talk. Book a discovery call today.
                          </p>
                        )}
                        <div className="post_hastag">
                          <span className="text_blue">#Productivity </span>
                          <span className="text_blue">#TeamWork</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="social_post_wrapper twitter_post mb-4">
                <h3 className="font_20 font_600 mb-3">X Posts</h3>
                <div className="social_media_outer">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="social_media_item box-shadow bg-white">
                      <div className="item_header">
                        <div className="item_left">
                          <button className="btn primary_btn_outline">Publish</button>
                          <button className="btn primary_btn_outline">Schedule</button>
                          <button className="btn primary_btn_outline">Edit</button>
                        </div>
                        <div className="item_right">
                          <button className="btn text_orange font_20 pe-0" aria-label="remove_icon">
                            <i className="bi bi-x"></i>
                          </button>
                        </div>
                      </div>
                      <div className="social_post_img my-3">
                        <img
                          src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                          className="img-fluid"
                          alt="image"
                        />
                      </div>
                      <div className="social_post_content font_16">
                        <p>
                          The way we do marketing is evolving-and so should you. Marketing managers, are you
                          struggling with execution bottlenecks, scattered campaigns, and pressure from
                          leadership to deliver more with less? You're not alone. But here's the thing-hiring a
                          full in-house team can cost £20K-£30K per month.
                        </p>
                        <div className="post_hastag">
                          <span className="text_blue">#Technology</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                <div className="social_post_wrapper facebook_post mb-4">
        <h3 className="font_20 font_600 mb-3">Facebook Posts</h3>
        <div className="social_media_outer">
          {[1, 2, 3].map((_, index) => (
            <div className="social_media_item box-shadow bg-white" key={index}>
              <div className="item_header">
                <div className="item_left">
                  <button className="btn primary_btn_outline">Publish</button>
                  <button className="btn primary_btn_outline">Schedule</button>
                  <button className="btn primary_btn_outline">Edit</button>
                </div>
                <div className="item_right">
                  <button className="btn text_orange font_20 pe-0" aria-label="remove_icon">
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              </div>
              <div className="social_post_img my-3">
                <img
                  src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                  className="img-fluid"
                  alt="image"
                />
              </div>
              <div className="social_post_content font_16">
                {index === 0 && (
                  <>
                    <p>
                      The way we do marketing is evolving—and so should you. Marketing managers, are you
                      struggling with execution bottlenecks, scattered campaigns, and pressure from
                      leadership to deliver more with less? You're not alone. But here's the thing—hiring a
                      full in-house team can cost £20K–£30K per month.
                    </p>
                    <p>
                      For the same price as hiring a junior-level employee, you get an entire expert
                      marketing team—SEO, PPC, social media, content creation, email marketing.
                    </p>
                  </>
                )}
                {index === 1 && (
                  <>
                    <p>
                      The way we do marketing is evolving—and so should you. Marketing managers, are you
                      struggling with execution bottlenecks, scattered campaigns, and pressure from
                      leadership to deliver more with less? You're not alone. But here's the thing—hiring a
                      full in-house team can cost £20K–£30K per month.
                    </p>
                    <p>
                      Now, let's break that down. That's salary, training, software, and the cost of
                      management. Hiring an SEO manager alone costs around £40K a year. Add a PPC
                      specialist, a copywriter, a social media manager, a designer—and you're looking at a
                      hefty price tag. And let's not forget recruitment time and training periods. Enter "Plug
                      & Play, Grow"—our £5K/month accelerator that delivers expert multi-channel campaigns
                      without the headaches of recruitment, overheads, and training.
                    </p>
                    <p>
                      For the same price as hiring a junior-level employee, you get an entire expert
                      marketing team—SEO, PPC, social media, content creation, email marketing, and
                      AI-powered analytics. Why spend more when you can achieve better results for less?
                      Let's talk. Book a discovery call today.
                    </p>
                  </>
                )}
                {index === 2 && (
                  <>
                    <p>
                      The way we do marketing is evolving—and so should you. Marketing managers, are you
                      struggling with execution bottlenecks, scattered campaigns, and pressure from
                      leadership to deliver more with less? You're not alone. But here's the thing—hiring a
                      full in-house team can cost £20K–£30K per month.
                    </p>
                    <ul>
                      <li>Instant integration—no long onboarding process</li>
                      <li>Full marketing execution at a fraction of in-house costs</li>
                      <li>Advanced retargeting, A/B testing & automation for maximised ROI</li>
                    </ul>
                  </>
                )}
                <div className="post_hastag">
                  <span className="text_blue">#Productivity </span>
                  <span className="text_blue">#TeamWork</span>
                </div>
              </div>
            </div>
          ))}
        </div>
               </div>
               <div className="social_post_wrapper instagram_post mb-4">
  <h3 className="font_20 font_600 mb-3">Instagram Posts</h3>
  <div className="social_media_outer">
    <div className="social_media_item box-shadow bg-white">
      <div className="social_post_img my-3">
        <img
          src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
          className="img-fluid"
          alt="image"
        />
      </div>
      <div className="social_post_content font_16">
        <p>
          The way we do marketing is evolving-and so should you. Marketing managers.
        </p>
        <div className="post_hastag">
          <span className="text_blue">#Photography</span>
        </div>
      </div>
    </div>
    <div className="social_media_item box-shadow bg-white">
      <div className="social_post_img my-3">
        <img
          src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
          className="img-fluid"
          alt="image"
        />
      </div>
      <div className="social_post_content font_16">
        <p>
          The way we do marketing is evolving-and so should you. Marketing managers.
        </p>
        <div className="post_hastag">
          <span className="text_blue">#Food</span>
        </div>
      </div>
    </div>
    <div className="social_media_item box-shadow bg-white">
      <div className="social_post_img my-3">
        <img
          src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
          className="img-fluid"
          alt="image"
        />
      </div>
      <div className="social_post_content font_16">
        <p>
          The way we do marketing is evolving-and so should you. Marketing managers.
        </p>
        <div className="post_hastag">
          <span className="text_blue">#Fashion</span>
        </div>
      </div>
    </div>
  </div>
              </div>
              <div className="social_post_wrapper tiktok_post mb-4">
              <h3 className="font_20 font_600 mb-3">Tiktok Posts</h3>
              <div className="social_media_outer">
                <div className="social_media_item box-shadow bg-white">
                  <div className="social_post_img my-3">
                    <img
                      src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                      className="img-fluid"
                      alt="image"
                    />
                  </div>
                  <div className="social_post_content font_16">
                    <p>
                      The way we do marketing is evolving-and so should you. Marketing managers.
                    </p>
                    <div className="post_hastag">
                      <span className="text_blue">#Photography</span>
                    </div>
                  </div>
                </div>
                <div className="social_media_item box-shadow bg-white">
                  <div className="social_post_img my-3">
                    <img
                      src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                      className="img-fluid"
                      alt="image"
                    />
                  </div>
                  <div className="social_post_content font_16">
                    <p>
                      The way we do marketing is evolving-and so should you. Marketing managers.
                    </p>
                    <div className="post_hastag">
                      <span className="text_blue">#Food</span>
                    </div>
                  </div>
                </div>
                <div className="social_media_item box-shadow bg-white">
                  <div className="social_post_img my-3">
                    <img
                      src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                      className="img-fluid"
                      alt="image"
                    />
                  </div>
                  <div className="social_post_content font_16">
                    <p>
                      The way we do marketing is evolving-and so should you. Marketing managers.
                    </p>
                    <div className="post_hastag">
                      <span className="text_blue">#Fashion</span>
                    </div>
                  </div>
                </div>
              </div>
             </div>
            </div>
            <hr></hr>
            <div className="edit_post_wrapper box-shadow">
              <button
                className="btn text_orange font_20 edit_post_close"
                aria-label="close_icon"
              >
                <i className="bi bi-x"></i>
              </button>
              <div className="edit_post_header">
                <h2 className="post_heading font_20 font_500">
                  Edit Your Post
                </h2>
              </div>
              <div className="edit_post_body">
                <div className="social_post_img my-3">
                  <img
                    src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1745327949~exp=1745331549~hmac=eb72dc233e5bbacd949f3c5860f88e02215575f5ec3f16f974e9df500dd70a97&w=996"
                    className="img-fluid"
                    alt="image"
                  />
                </div>

                <div className="edit_post_content">
                  <textarea
                    id="post_content"
                    aria-label="post_content"
                    defaultValue={`The way we do marketing is evolving-and so 
should you.
Marketing managers, are you struggling with
execution bottlenecks, scattered campaigns, and
pressure from leadership to deliver more with less?
You're not alone. But here's the thing-hiring a full in-
house team can cost £20K-£30K per month.
    
Instant integration-no long onboarding process
Full marketing execution at a fraction of in-house
    costs.
Advanced retargeting, A/B testing & automation
    for maximised ROI.

For the same price as hiring a junior-level employee, you get an entire expert
marketing team-SEO, PPC, social media, content cresation, email marketing, and Al-
powered analytics.

Why spend more when you can achieve better results for less? Let's talk. Book a
discovery call today.`}
                  />
                </div>

                <div className="edit_post_footer text-end">
                  <button className="btn primary_btn">Save</button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
};
export default GeneratePost;

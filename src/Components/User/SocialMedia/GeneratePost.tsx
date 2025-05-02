import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const GeneratePost = () => {
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content  generate_post">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-4">
                <i className="bi bi-people-fill me-1 text_blue"></i> Post
                Generator
              </h2>
            </div>
            <div className="generate_post_form keyword_search_form">
              <div className="row gy-3">
                <div className="col-12 col-md-7">
                  <form>
                    <p className="keyword_error font_16">
                      Error: Limit Reached: Please enter no more than 10
                      keywords
                    </p>

                    {/* Platforms */}
                    <div className="form_input">
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
                          "...",
                        ].map((platform, index) => (
                          <div
                            className="col-12 col-lg-6 col-xxl-4"
                            key={platform}
                          >
                            <input
                              type="checkbox"
                              id={`platform${index}`}
                              value={platform.toLowerCase()}
                            />
                            <label
                              htmlFor={`platform${index}`}
                              className="font_16 ms-1"
                            >
                              {platform}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Objectives */}
                    <div className="form_input">
                      <h3 className="font_20 font_500 mb-3">
                        Define Post Objective
                      </h3>
                      <div className="row mb-2">
                        {[
                          ["Drive Traffic", 4],
                          ["Boost Engagement", 8],
                          ["Announce Product", 4],
                          ["Brand Awareness", 8],
                          ["Personal Post", 4],
                          ["Promote Event", 8],
                        ].map(([label, col], idx) => (
                          <div
                            className={`col-12 col-lg-6 col-xxl-${col}`}
                            key={idx}
                          >
                            <input
                              type="checkbox"
                              id={`objective${idx}`}
                              value={
                                typeof label === "string"
                                  ? label.toLowerCase().replace(/\s/g, "")
                                  : String(label)
                                      .toLowerCase()
                                      .replace(/\s/g, "")
                              }
                            />
                            <label
                              htmlFor={`objective${idx}`}
                              className="font_16 ms-1"
                            >
                              {label}
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
                        ].map((label, idx) => (
                          <div className="col-12" key={idx}>
                            <input
                              type="checkbox"
                              id={`persona${idx}`}
                              value="persona"
                            />
                            <label
                              htmlFor={`persona${idx}`}
                              className="font_16 ms-1"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional */}
                    <div className="form_input">
                      <h3 className="font_20 font_500 mb-3">Additional</h3>
                      <div className="row mb-2">
                        <div className="col-12 col-lg-6 col-xxl-4">
                          <input type="checkbox" id="hastag1" value="hastag" />
                          <label htmlFor="hastag1" className="font_16 ms-1">
                            Include Hashtags
                          </label>
                        </div>
                        <div className="col-12 col-lg-6 col-xxl-8">
                          <input type="checkbox" id="emojis1" value="emojis" />
                          <label htmlFor="emojis1" className="font_16 ms-1">
                            Use Emojis
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="col-12" style={{ marginBottom: "15px" }}>
                      <label
                        htmlFor="social_msg"
                        className="font_20 font_500 mb-2"
                      >
                        Describe Your Message or campaign*
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Describe your message"
                        id="social_msg"
                        style={{ height: 120 }}
                      ></textarea>
                    </div>

                    {/* Upload */}
                    <div className="col-12" style={{ marginBottom: "15px" }}>
                      <label
                        htmlFor="uploadBuyer"
                        className="font_20 font_500 mb-2"
                      >
                        Upload Campaign Files
                      </label>
                      <div className="doc_file_wrapper">
                        <input
                          className="form-control upload_input"
                          type="file"
                          id="uploadBuyer"
                        />
                        <div className="doc_left">
                          <p className="font_16 mb-1">
                            Drag and drop files here or{" "}
                            <span className="text_blue">browse</span> to upload
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn primary_btn">
                        Generate
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Panel */}
                <div className="col-12 col-md-5">
                  <div className="keyword_tool_right">
                    <p className="font_16">
                      Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                      amet...
                    </p>
                    <p className="font_16">
                      Tip: Ut enim ad minima veniam, quis nostrum
                      exercitationem...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="multi_post_wrapper">
              <div className="download_media text-end mb-3">
                <button className="btn primary_btn">Download</button>
              </div>
              <div className="social_post_wrapper">
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default GeneratePost;

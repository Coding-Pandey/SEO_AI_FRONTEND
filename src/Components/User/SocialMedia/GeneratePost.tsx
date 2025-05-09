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
              <h2 className="font_25 font_600 mb-2">
                <i className="bi bi-people-fill me-1 text_blue"></i> Post
                Generator
                <span className="text_blue">/ Research number one</span>
              </h2>
            </div>
            <div className="generate_post_form keyword_search_form">
              <div className="row gy-3">
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
                    <p className="keyword_error font_16">
                      Error: Limit Reached: Please enter no more than 10
                      keywords
                    </p>

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
                        />
                        <div className="doc_left">
                          <p className="font_16 mb-1">
                            Drag and drop files here or{" "}
                            <span className="text_blue">browse</span> to upload
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Select Platforms */}
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
                        ].map((platform, i) => (
                          <div className="col-12 col-lg-6 col-xxl-4" key={i}>
                            <input
                              type="checkbox"
                              id={`platform_${i}`}
                              name={`platform_${i}`}
                              value={platform.toLowerCase()}
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
                          <div
                            className={`col-12 col-lg-6 col-xxl-${
                              i % 2 === 0 ? "4" : "8"
                            }`}
                            key={i}
                          >
                            <input
                              type="checkbox"
                              id={`objective_${i}`}
                              name={`objective_${i}`}
                              value={objective.toLowerCase().replace(/\s/g, "")}
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
                              name={`persona_${i}`}
                              value="persona"
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

                    <div className="form_input">
                      <h3 className="font_20 font_500 mb-3">Additional</h3>
                      <div className="row mb-2">
                        <div className="col-12 col-lg-6 col-xxl-4">
                          <input
                            type="checkbox"
                            id="hastag1"
                            name="hastag1"
                            value="hastag"
                          />
                          <label htmlFor="hastag1" className="font_16 ms-1">
                            Include Hashtags
                          </label>
                        </div>
                        <div className="col-12 col-lg-6 col-xxl-8">
                          <input
                            type="checkbox"
                            id="emojis1"
                            name="emojis1"
                            value="emojis"
                          />
                          <label htmlFor="emojis1" className="font_16 ms-1">
                            Use Emojis
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <button className="btn primary_btn">Generate</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="multi_post_wrapper">
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default GeneratePost;

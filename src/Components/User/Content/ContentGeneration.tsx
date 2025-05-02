import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const ContentGeneration = () => {
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="seo_content page_content box-shadow">
            <div className="form-part mb-4">
              <h2 className="font_30 font_600 mb-2">SEO Content generation</h2>
              <p className="font_16 mb-2">Select a Document from S3</p>

              <form>
                <div className="row">
                  {/* Buyer Persona */}
                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="contentBuyer" className="form-label">
                        Select a document from Buyer persona
                      </label>
                      <select className="form-select" id="contentBuyer">
                        <option defaultValue="">User/Buyer persona</option>
                        <option value="1">
                          User/Buyer persona/ 02 Buyer Persona_dhs.docx
                        </option>
                        <option value="2">
                          User/Buyer persona/Buyer_Persona_dhs.docx
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Tone of Voice */}
                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="contentTone" className="form-label">
                        Select a document from Tone of voice
                      </label>
                      <select className="form-select" id="contentTone">
                        <option defaultValue="">User/Tone of voice</option>
                        <option value="1">
                          User/Tone of voice/03 Tone of Voice_dhs.docx
                        </option>
                        <option value="2">
                          User/Tone of voice/Tone_of_voice.docx
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Brand Identity */}
                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="contentIdentity" className="form-label">
                        Select a document from Brand identity
                      </label>
                      <select className="form-select" id="contentIdentity">
                        <option defaultValue="">User/Brand identity</option>
                        <option value="1">
                          User/Brand identitye/06 Brand Positioning_dhs.docx
                        </option>
                        <option value="2">
                          User/Brand identity/Brand_identity.docx
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Offering */}
                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="contentOffering" className="form-label">
                        Select a documents from Offering
                      </label>
                      <select className="form-select" id="contentOffering">
                        <option defaultValue="">User/Offering/</option>
                        <option value="1">
                          User/Offering/04 Value Preposition.docx
                        </option>
                        <option value="2">User/Offering/Offering.docx</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkbox for uploading keyword file */}
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="contentKeywords"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="contentKeywords"
                      >
                        Upload keywords file
                      </label>
                    </div>
                  </div>

                  {/* CSV Document */}
                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="contentCSV" className="form-label">
                        Select a document from csv
                      </label>
                      <select className="form-select" id="contentCSV">
                        <option defaultValue="">
                          User/seo_content_generation/DHS Colon Cancer KWR -
                          25.02.2025.xlsx - Sheet1.csv
                        </option>
                        <option value="1">
                          User/seo_content_generation/clusters_data1.csv
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Blog Content Upload */}
            <div className="form-part mb-4">
              <h2 className="font_30 font_600 mb-2">Blog content generation</h2>

              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="contentDoc" className="form-label">
                        Upload a blog content
                      </label>
                      <div className="doc_file_wrapper">
                        <input
                          className="form-control upload_input"
                          type="file"
                          id="contentDoc"
                        />
                        <i className="bi bi-cloud-arrow-up"></i>
                        <div className="doc_left">
                          <p className="font_16 mb-1">
                            Drag and drop file here
                          </p>
                          <span className="font_14 gray_clr">
                            Limit 200MB per file .DOCX, DOC
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn primary_btn browse_btn"
                        >
                          Browse files
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContentGeneration;

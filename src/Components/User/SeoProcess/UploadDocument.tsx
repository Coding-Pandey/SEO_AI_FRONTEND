import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const UploadDocument = () => {
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="seo_content page_content box-shadow">
            <h2 className="font_30 font_600 mb-2">Upload & Edit Documents</h2>
            <div className="form-part">
              <form>
                <div className="row">
                  {/* Buyer Persona */}
                  <div className="col-12">
                    <h3 className="font_20 font_600 mb-1">Buyer persona</h3>
                    <div className="form_input">
                      <label htmlFor="uploadBuyer" className="form-label">
                        Upload a document for Buyer persona
                      </label>
                      <div className="doc_file_wrapper">
                        <input
                          className="form-control upload_input"
                          type="file"
                          id="uploadBuyer"
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

                  {/* Tone of Voice */}
                  <div className="col-12">
                    <h3 className="font_20 font_600 mb-1">Tone of voice</h3>
                    <div className="form_input">
                      <label htmlFor="uploadTone" className="form-label">
                        Upload a document for Tone of voice
                      </label>
                      <div className="doc_file_wrapper">
                        <input
                          className="form-control upload_input"
                          type="file"
                          id="uploadTone"
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

                  {/* Brand Identity */}
                  <div className="col-12">
                    <h3 className="font_20 font_600 mb-1">Brand identity</h3>
                    <div className="form_input">
                      <label htmlFor="uploadBrand" className="form-label">
                        Upload a document for Brand identity
                      </label>
                      <div className="doc_file_wrapper">
                        <input
                          className="form-control upload_input"
                          type="file"
                          id="uploadBrand"
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

                  {/* Offering */}
                  <div className="col-12">
                    <h3 className="font_20 font_600 mb-1">Offering</h3>
                    <div className="form_input">
                      <label htmlFor="uploadOffering" className="form-label">
                        Upload a document for Offering
                      </label>
                      <div className="doc_file_wrapper">
                        <input
                          className="form-control upload_input"
                          type="file"
                          id="uploadOffering"
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

export default UploadDocument;

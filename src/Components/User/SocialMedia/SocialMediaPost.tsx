import Header from "../Header/Header"
import SideBar from "../SideBar/SideBar"


const SocialMediaPost = () => {
  return (
    <>
    <Header/>
    <main className="main_wrapper">
     <SideBar/>
     <div className="inner_content ">
     <div className="seo_content page_content box-shadow">
     <div className="form-part mb-4">
      <h2 className="font_30 font_600 mb-2">Select a Document from S3</h2>

      <form>
        <div className="row">
          <div className="col-12">
            <div className="form_input">
              <label htmlFor="socialBuyer" className="form-label">
                Select a document from Buyer persona
              </label>
              <select className="form-select" id="socialBuyer" aria-label="Default select example">
                <option defaultValue="">User/Buyer persona</option>
                <option value="1">User/Buyer persona/ 02 Buyer Persona_dhs.docx</option>
                <option value="2">User/Buyer persona/Buyer_Persona_dhs.docx</option>
              </select>
            </div>
          </div>

          <div className="col-12">
            <div className="form_input">
              <label htmlFor="socialTone" className="form-label">
                Select a document from Tone of voice
              </label>
              <select className="form-select" id="socialTone" aria-label="Default select example">
                <option defaultValue="">User/Tone of voice</option>
                <option value="1">User/Tone of voice/03 Tone of Voice_dhs.docx</option>
                <option value="2">User/Tone of voice/Tone_of_voice.docx</option>
              </select>
            </div>
          </div>

          <div className="col-12">
            <div className="form_input">
              <label htmlFor="socialIdentity" className="form-label">
                Select a document from Brand identity
              </label>
              <select className="form-select" id="socialIdentity" aria-label="Default select example">
                <option defaultValue="">User/Brand identity</option>
                <option value="1">User/Brand identitye/06 Brand Positioning_dhs.docx</option>
                <option value="2">User/Brand identity/Brand_identity.docx</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <div className="form-part">
        <h3 className="font_25 font_600 mb-2">Social Media Post (campaign)</h3>
        <form>
          <div className="row">
            <div className="col-12">
              <div className="form_input">
                <label htmlFor="socialDoc" className="form-label">Upload a Word document</label>
                <div className="doc_file_wrapper">
                  <input className="form-control upload_input" type="file" id="socialDoc" />
                  <i className="bi bi-cloud-arrow-up"></i>
                  <div className="doc_left">
                    <p className="font_16 mb-1">Drag and drop file here</p>
                    <span className="font_14 gray_clr">Limit 200MB per file .DOCX, DOC</span>
                  </div>
                  <button type="button" className="btn primary_btn browse_btn">Browse files</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
      </div>
      </div>
    </main>
    </>
  )
}

export default SocialMediaPost

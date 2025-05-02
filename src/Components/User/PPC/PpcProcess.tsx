import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";


 
const PpcProcess = () => {
  return (
    <>
    <Header/>
    <main className="main_wrapper">
     <SideBar/>
     <div className="inner_content ">
     <div className="ppc_content page_content box-shadow">
     <div className="form-part mb-4">
          <h2 className="font_30 font_600 mb-2">PPC Keyword Generator</h2>
          <form>
            <div className="row">
              <div className="col-12">
                <div className="form_input">
                  <label htmlFor="ppcKeywords" className="form-label">
                    Enter PPC Keywords (comma-separated):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ppcKeywords"
                    placeholder="e.g. Google Ads, PPC Campaign, CPC"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form_input">
                  <label htmlFor="ppc_description" className="form-label">
                    Enter a Short Description (Optional):
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Describe your PPC campaign goals"
                    id="ppc_description"
                    style={{ height: '100px' }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="form-part mb-4">
          <h3 className="font_25 font_600 mb-2">Search Parameters</h3>
          <form>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form_input">
                  <label htmlFor="seoLocation" className="form-label">
                    Select Locations
                  </label>
                  <select className="form-select" id="seoLocation" aria-label="Default select example">
                    <option defaultValue="">United States</option>
                    <option value="1">France</option>
                    <option value="2">Canada</option>
                    <option value="3">Germany</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form_input">
                  <label htmlFor="seoLanguage" className="form-label">
                    Select Language
                  </label>
                  <select className="form-select" id="seoLanguage" aria-label="Default select example">
                    <option defaultValue="">Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="seoExclusion" />
                  <label className="form-check-label font_16" htmlFor="seoExclusion">
                    Enable Exclusion Filter
                  </label>
                </div>

                <div className="form-input d-none mt-2">
                  <label htmlFor="ppcRangeKey" className="form-label font_14 mb-0">
                    Exclude Keywords with Monthly Searches Below
                  </label>
                  <input type="range" className="form-range" id="ppcRangeKey" />
                  <span className="font_14">Will exclude keywords with monthly searches in: [0]</span>
                </div>
              </div>

              <div className="col-12">
                <div className="form_input mb-3">
                  <label htmlFor="seoBrandedKeywords" className="form-label">
                    Enter branded Keywords (comma-separated):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="seoBrandedKeywords"
                    placeholder="e.g. apple, samsung, automation"
                  />
                </div>
                <button type="button" className="btn primary_btn">
                  Add branded Keywords
                </button>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="seoKeywordShow" />
                  <label className="form-check-label" htmlFor="seoKeywordShow">
                    Show keywords
                  </label>
                </div>

                <div className="keywords_list">
                  <h3 className="font_20 font_600 mb-0">Current Word list:</h3>
                  <ol className="keyword_list_wrapper">
                    <li>
                      <div className="keywords">
                        <p className="font_16 mb-0">Apple</p>
                        <button type="button" className="btn remove_btn">
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </div>
                    </li>
                    <li>
                      <div className="keywords">
                        <p className="font_16 mb-0">Apple</p>
                        <button type="button" className="btn remove_btn">
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="generate_keywords mt-3">
                  <button type="button" className="btn primary_btn">
                    Generate PPC Keywords
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </main>
    </>
  )
}

export default PpcProcess;

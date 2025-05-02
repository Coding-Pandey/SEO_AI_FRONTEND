import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const KeywordsSuggestions = () => {
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="ppc_content page_content box-shadow">
            <div className="form-part mb-4">
              <h2 className="font_30 font_600 mb-2">Keywords Suggestion</h2>

              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="seoKeywords" className="form-label">
                        Enter SEO Keywords (comma-separated):
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="seoKeywords"
                        placeholder="e.g. SEO, Machine Learning, Automation"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form_input">
                      <label htmlFor="seo_description" className="form-label">
                        Enter a Short Description (Optional):
                      </label>
                      <textarea
                        className="form-control"
                        id="seo_description"
                        placeholder="Describe your business or service for SEO"
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="button" className="btn primary_btn">
                      Suggest More SEO Keywords
                    </button>
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

export default KeywordsSuggestions;

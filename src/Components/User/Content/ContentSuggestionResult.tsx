import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import TitleOrFileUpdateModal from "../../Page/TitleOrFileUpdateModal";
import Loading from "../../Page/Loading/Loading";
import { SaveGenerateSuggestion } from "./ContentServices";

const ContentSuggestionResult = () => {
  const location = useLocation();
  const [GenerateSuggestionDetails, setGenerateSuggestionDetails] =
    useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitleValue, setModalTitleValue] = useState<string>("");
  const [Message, setMessage] = useState<string>("");
  const [loadingData, setloadingData] = useState<boolean>(false);

  console.log(GenerateSuggestionDetails, "GenerateSuggestionDetails");

  useEffect(() => {
    if (location.state) {
      const storedData = localStorage.getItem("ClusterData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        localStorage.setItem("ClusterData", JSON.stringify(parsedData));
        setGenerateSuggestionDetails(parsedData);
      }
    }
  }, [location.state]);

  const handleOpenModal = async (data: string) => {
    setShowModal(true);
    setModalTitleValue(data);
    setMessage("Update FileName");
  };

  const handleOpenTitleModal = async (data: string) => {
    setShowModal(true);
    setModalTitleValue(data);
    setMessage("Update Title");
  };

  const handleTitleOrFilenameModalClose = () => {
    setShowModal(false);
    setModalTitleValue("");
    setMessage("");
  };

  const handleSaveTitle = async () => {
    let updatedData = {};
    if (Message == "Update FileName") {
      updatedData = {
        ...GenerateSuggestionDetails,
        filename: modalTitleValue,
      };
      toast.success("Filename updated successfully");
    } else {
      updatedData = {
        ...GenerateSuggestionDetails,
        data: {
          ...GenerateSuggestionDetails.data,
          Title: modalTitleValue,
        },
      };
      toast.success("Title updated successfully");
    }
    localStorage.setItem("ClusterData", JSON.stringify(updatedData));
    setGenerateSuggestionDetails(updatedData);
    setShowModal(false);
  };

  const handleSaveGenerateSuggestion = async () => {
    try {
      setloadingData(true);
      const uuid = GenerateSuggestionDetails?.id;
      const response = await SaveGenerateSuggestion(uuid,GenerateSuggestionDetails);
      if (response.status === 200 || response.status === 201) {
        console.log(response.data, "handleSaveGenerateSuggestion");
        toast.success("Saved file successfully");
        const newData={...GenerateSuggestionDetails,id:response.data.uuid}
        localStorage.setItem("ClusterData", JSON.stringify(newData));
        setGenerateSuggestionDetails(newData)
      }
    } catch (error) {
      console.log("Error during AddGenerate", error);
    } finally {
      setloadingData(false);
    }
  };

  return (
    <>
      {loadingData && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="content_header mb-5">
            <h2 className="font_25 font_600 mb-2">
              <img
                src="/assets/images/content_icon.png"
                alt="icon"
                className="img-fluid heading_icon"
                style={{ marginRight: "10px" }}
              />
              Content Generator{" "}
              <span className="text_blue">
                /
                {GenerateSuggestionDetails?.filename
                  ? GenerateSuggestionDetails.filename.charAt(0).toUpperCase() +
                    GenerateSuggestionDetails.filename.slice(1)
                  : ""}
              </span>
              <button
                className="btn font_16 pe-0"
                aria-label="edit_icon"
                onClick={() =>
                  handleOpenModal(GenerateSuggestionDetails?.filename)
                }
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
            </h2>
          </div>

          <div className="content_draft_list edit_draft">
            <div className="row">
              <div className="col-12 col-xl-7">
                <div className="d-flex justify-content-between mb-3">
                  <h3 className="font_25 font_600 mb-0">Draft</h3>
                  <div>
                    <button
                      className="btn primary_btn me-2"
                      onClick={handleSaveGenerateSuggestion}
                    >
                      Save
                    </button>
                    <button className="btn primary_btn">Download</button>
                  </div>
                </div>

                <div className="card draft_card box-shadow">
                  <div className="card-header mb-2">
                    <h4 className="font_20 font_600">
                      Title: {GenerateSuggestionDetails?.data?.Title}
                      <button
                        className="btn px-0 ms-1"
                        aria-label="edit_icon"
                        onClick={() =>
                          handleOpenTitleModal(
                            GenerateSuggestionDetails?.data?.Title
                          )
                        }
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    </h4>
                  </div>

                  <div className="card-body">
                    <div className="content_item_wrapper font_16">
                      <p>{GenerateSuggestionDetails?.data?.Introduction}</p>
                      {GenerateSuggestionDetails?.data?.Sections?.map(
                        (section: any) => (
                          <div className="ok" key={section.section_id}>
                            <h5>{section.Subheading}</h5>
                            <ReactMarkdown>{section.Content}</ReactMarkdown>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-5">
                <div className="previously_created_warpper meta_content">
                  <ul className="previous_post p-0">
                    <li className="previous_item row">
                      <div className="col-12">
                        <h3 className="font_16 font_600">Meta Description</h3>
                      </div>
                      <div className="col-12 meta_input">
                        {/* <p className="font_14 mb-0">
                          Equs porro Quicaus quis dolorem psum que dolor sit
                          amet...
                        </p> */}
                      </div>
                    </li>

                    <li className="previous_item row">
                      <div className="col-12">
                        <h3 className="font_16 font_600">Open Graph</h3>
                      </div>
                      <div className="col-12 meta_input">
                        {/* <p className="font_14 mb-0">
                          Equs porro Quicaus quis dolorem psum que dolor akat...
                        </p> */}
                      </div>
                    </li>

                    <li className="previous_item row">
                      <div className="col-12">
                        <h3 className="font_16 font_600">Twitter Cards</h3>
                      </div>
                      <div className="col-12 meta_input">
                        {/* <p className="font_14 mb-0">
                          Equs porro Quicaus quis dolorem psum que dolor sit
                          amet...
                        </p> */}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <TitleOrFileUpdateModal
            showModal={showModal}
            modalTitleValue={modalTitleValue}
            setModalTitleValue={setModalTitleValue}
            onSave={handleSaveTitle}
            onClose={handleTitleOrFilenameModalClose}
            message={Message}
          />
        </div>
      </main>
    </>
  );
};

export default ContentSuggestionResult;

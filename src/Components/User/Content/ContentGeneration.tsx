import { toast } from "react-toastify";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Loading from "../../Page/Loading/Loading";
import PreviouslyCreatedPosts from "../../Page/PreviouslyCreatedPosts";
import {
  AddGenerateContent,
  deleteContentPreviousList,
  GetContentPreviousList,
  GetFormDetails,
} from "./ContentServices";
import ContentForm from "./ContentForm";
import { GetUploadedSourcefiles } from "../SocialMedia/SocialMediaServices";
import { language_options, location_options } from "../../Page/store";

interface contentData {
  uuid: string;
  file_name: string;
  last_reset: string;
}
const ContentGeneration = () => {
  const navigate = useNavigate();
  const [ContentData, setContentData] = useState<contentData[]>([]);
  const [FormDynamictData, setFormDynamictData] = useState<any>({});
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [contentType, setContentType] = useState<number | "">("");
  const [FileName, setFileName] = useState<string>("");
  const [PostObjectives, setPostObjectives] = useState<string[]>([]);
  const [TargetAudience, setTargetAudience] = useState<string[]>([]);
  const [AddInstructions, setAddInstructions] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [FileUrl, setFileUrl] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [linkInput, setLinkInput] = useState<string>("");
  const [links, setLinks] = useState<string[]>([]);
  const [UploadedSourcefiles, setUploadedSourcefiles] = useState<any>({});
  const [country, setCountry] = useState<any>([]);
  const [language, setLanguage] = useState<string | null>(null);
  const [NewMessage,setNewMessage]=useState<string>("newContent")

  useEffect(() => {
    fetchGenerateData();
  }, []);

  const fetchGenerateData = async () => {
    try {
      setLoadingData(true);
      const response = await GetContentPreviousList();
      const responseForm = await GetFormDetails();
      const responseSourcefiles = await GetUploadedSourcefiles();
      // console.log(responseForm.data, "responseForm");
      if (response.status === 200 || response.status === 201) {
        const sortedData = response.data.sort(
          (a: contentData, b: contentData) =>
            new Date(b.last_reset).getTime() - new Date(a.last_reset).getTime()
        );
        setContentData(sortedData);
        setUploadedSourcefiles(responseSourcefiles.data);
        setFormDynamictData(responseForm.data);
      }
    } catch (error: any) {
      console.error("Error fetchPPCClusterData:", error);
    } finally {
      setLoadingData(false);
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
      const response = await deleteContentPreviousList(formData);
      if (response.status === 200) {
        setContentData((prevData) =>
          prevData.filter((item) => item.uuid !== uuid)
        );
        toast.success("File successfully deleted!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      toast.error("Failed to delete file.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleNavigate = (id: string) => {
    navigate(`/content/ContentPreviousList/${id}`);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContentType(Number(e.target.value));
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setPostObjectives((prev) => {
      let updatedObjectives;
      if (checked) {
        updatedObjectives = [...prev, value];
      } else {
        updatedObjectives = prev.filter((item) => item !== value);
      }
      return updatedObjectives;
    });
  };

  // const handleTargetAudience = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;
  //   setTargetAudience((prev) => {
  //     let updatedObjectives;
  //     if (checked) {
  //       updatedObjectives = [...prev, value];
  //     } else {
  //       updatedObjectives = prev.filter((item) => item !== value);
  //     }
  //     return updatedObjectives;
  //   });
  // };

  const handleTargetAudience = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setTargetAudience(() => {
      return checked ? [value] : [];
    });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files) return;

  //   // Filter accepted files: .doc, .docx only
  //   const allowedExtensions = /(\.doc|\.docx)$/i;
  //   const validFiles = Array.from(files).filter((file) =>
  //     allowedExtensions.test(file.name)
  //   );

  //   if (validFiles.length !== files.length) {
  //     toast.error("Only .doc and .docx files are allowed");
  //   }

  //   setUploadedFiles((prev) => [...prev, ...validFiles]);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedExtensions = /(\.doc|\.docx)$/i;

    if (!allowedExtensions.test(file.name)) {
      toast.error("Only .doc and .docx files are allowed");
      return;
    }

    setUploadedFiles([file]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number, message: string) => {
    if (message === "upload") {
      setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddLink = () => {
    const trimmedLink = linkInput.trim();
    if (trimmedLink && !links.includes(trimmedLink)) {
      setLinks([...links, trimmedLink]);
      setLinkInput("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLink();
    }
  };

  const handleAddButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddLink();
  };

  const handleGenerateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setNewMessage("newContent")
    e.preventDefault();

    try {
      if (!FileName) {
        toast.error("Please enter information page name");
        return;
      }

      if (PostObjectives.length > 10) {
        toast.error("Please select a maximum of 10 post keywords");
        return;
      }

      if (!AddInstructions.trim() && uploadedFiles.length === 0) {
        toast.error(
          "Please provide additional instructions or upload at least one file"
        );
        return;
      }

      if (country.length === 0) {
        toast.error("Please select at least one country");
        return;
      }

      if (!language || language === "") {
        toast.error("Please select a language");
        return;
      }

       const selectedCountries = location_options.filter((loc) =>
            country.some((c: any) => c.value === loc.id)
          );
      
          const selectedLanguage = language_options.find(
            (lang) => lang.ID === Number(language)
          );
 
      setFileUrl([]);
      setLoadingData(true);
      const formData = new FormData();
      formData.append("file_name", FileName);
      formData.append("content_type", String(contentType));
      formData.append("objectives", JSON.stringify(PostObjectives));
      formData.append("audience", JSON.stringify(TargetAudience));
      formData.append("text_data", AddInstructions);
      // formData.append("language_id", JSON.stringify(selectedLanguage));
      // formData.append("location_ids", JSON.stringify(selectedCountries));
      let newFileUpload;
      if (uploadedFiles.length > 0) {
        const file = uploadedFiles[0];
        formData.append("file", file);
        newFileUpload = file.name;
      }
      formData.append("links", JSON.stringify(links));
      const newFormData = {
        FileName,
        contentType,
        PostObjectives,
        TargetAudience,
        AddInstructions,
        uploadedFiles: newFileUpload,
        links,
        language: selectedLanguage?.ID,
        country: selectedCountries.map((c) => c.id),
      };
      const response = await AddGenerateContent(formData);
      if (response.status === 200 || response.status === 201) {
        console.log("response.data", response.data);
        const dataResult = response.data;
        const tempfile = {
          ...newFormData,
          temp_file_path: dataResult.temp_file_path,
        };
        localStorage.setItem("keywordToolResult", JSON.stringify(dataResult));
        localStorage.setItem("FormDataDetails", JSON.stringify(tempfile));
        navigate("/content/ContentGenerationResult", { state: dataResult });
      }
    } catch (error: any) {
      console.error("Error handle Generate Submit:", error);
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <>
      {loadingData && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
          <div className="keyword_tool_content generate_post create_content">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <img
                  src="/assets/images/content_icon.png"
                  alt="icon"
                  className="img-fluid heading_icon"
                  style={{ marginRight: "10px" }}
                />
                Content Generator{" "}
              </h2>
            </div>

            <div className="generate_post_form keyword_search_form">
              <div className="row gy-3">
                {/* Left Panel */}
                <PreviouslyCreatedPosts
                  posts={ContentData}
                  onDelete={handleDelete}
                  onNavigate={handleNavigate}
                />

                {/* Right Form Panel */}
                <div className="col-12 col-xl-7">
                  <ContentForm
                    contentType={String(contentType)}
                    FileName={FileName}
                    PostObjectives={PostObjectives}
                    TargetAudience={TargetAudience}
                    AddInstructions={AddInstructions}
                    uploadedFiles={uploadedFiles}
                    FileUrl={FileUrl}
                    linkInput={linkInput}
                    links={links}
                    FormDynamictData={FormDynamictData}
                    handleSelectChange={handleSelectChange}
                    handleObjectiveChange={handleObjectiveChange}
                    handleTargetAudience={handleTargetAudience}
                    setFileName={setFileName}
                    setAddInstructions={setAddInstructions}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    handleRemoveFile={handleRemoveFile}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                    handleAddButtonClick={handleAddButtonClick}
                    handleRemoveLink={handleRemoveLink}
                    handleGenerateSubmit={handleGenerateSubmit}
                    UploadedSourcefiles={UploadedSourcefiles}
                    language={language}
                    setLanguage={setLanguage}
                    country={country}
                    setCountry={setCountry}
                    NewMessage={NewMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContentGeneration;

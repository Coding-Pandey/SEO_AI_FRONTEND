import React from "react";
import { language_options, location_options } from "../../Page/store";
import Select from "react-select";
import { ContentObjective } from "./ContentGeneration";
interface ContentFormProps {
  contentType: string;
  FileName: string;
  // PostObjectives: string[];
  TargetAudience: string[];
  AddInstructions: string;
  uploadedFiles: File[];
  FileUrl: File[];
  linkInput: string;
  links: string[];
  FormDynamictData: any;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleObjectiveChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTargetAudience: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFileName: (val: string) => void;
  setAddInstructions: (val: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number, message: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveLink: (index: number) => void;
  handleGenerateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  UploadedSourcefiles: any;
  language: any;
  setLanguage: any;
  country: any;
  setCountry: any;
  NewMessage: any;
  contentObjectives: ContentObjective[];
  handleObjectiveIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contentObjectivesId: number[];
}

const ContentForm: React.FC<ContentFormProps> = ({
  contentType,
  FileName,
  // PostObjectives,
  TargetAudience,
  AddInstructions,
  uploadedFiles,
  FileUrl,
  linkInput,
  links,
  FormDynamictData,
  handleSelectChange,
  // handleObjectiveChange,
  handleTargetAudience,
  setFileName,
  setAddInstructions,
  fileInputRef,
  handleFileChange,
  handleRemoveFile,
  handleInputChange,
  handleKeyDown,
  handleAddButtonClick,
  handleRemoveLink,
  handleGenerateSubmit,
  UploadedSourcefiles,
  language,
  setLanguage,
  country,
  setCountry,
  NewMessage,
  contentObjectives,
  handleObjectiveIdChange,
  contentObjectivesId,
}) => {
  const locationOptions = location_options.map((location) => ({
    value: location.id,
    label: location.country,
  }));

  return (
    <form onSubmit={handleGenerateSubmit}>
      {!contentType ? (
        <div className="row content_select mb-3">
          <div className="col-12">
            <select
              className="form-select"
              aria-label="Default select example"
              value={contentType}
              onChange={handleSelectChange}
            >
              <option value="">Content Type</option>
              {FormDynamictData?.content_types?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.content_type}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <>
          {/* {PostObjectives?.length > 10 && (
            <p className="keyword_error font_16">
              Error: Limit Reached: Please enter no more than 10 keywords
            </p>
          )} */}

          <div className="row content_type">
            <div className="col-12">
              <label
                htmlFor="generate_post_name"
                className="font_20 font_500 mb-2"
              >
                Name your information page*
              </label>
              <input
                type="text"
                className="form-control"
                id="generate_post_name"
                placeholder="Enter Page Name"
                value={FileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>

            <div className="col-12">
              <select
                className="form-select"
                aria-label="Default select example"
                value={contentType}
                onChange={handleSelectChange}
              >
                {FormDynamictData?.content_types?.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.content_type}
                  </option>
                ))}
              </select>
            </div>

            {/* Post Objective */}
            <div className="col-12">
              <div className="multicheckbox">
                <div
                  // className={`form_input
                  //   ${contentObjectives?.length > 10 ? "error-border" : ""}
                  //   `}
                  className={`form_input`}
                >
                  <h3 className="font_20 font_500 mb-3">
                    Define Content Objective
                  </h3>
                  <div className="row mb-2">
                    {contentObjectives?.length > 0 ? (
                      contentObjectives.map((item, i) => (
                        <div
                          className="col-12 col-lg-6 col-xxl-6"
                          key={item.id}
                        >
                          <div className="objective_box">
                            <input
                              type="checkbox"
                              id={`persona_${i}`}
                              name={`objective${i}`}
                              checked={contentObjectivesId.includes(item.id)}
                              value={item.id}
                              onChange={handleObjectiveIdChange}
                            />
                            <label
                              htmlFor={`persona_${i}`}
                              className="font_16 ms-1"
                            >
                              {item.objective}
                            </label>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                        <p className="text-muted">
                          No Content Objective Found.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="form_input">
                  <h3 className="font_20 font_500 mb-3">Target Audience</h3>
                  <div className="row mb-2">
                    {/* Shows Target audience checkbox */}
                    {UploadedSourcefiles?.Target_audience?.length > 0 ? (
                      // Code Commented
                      // && UploadedSourcefiles?.define_objective?.length > 0
                      <>
                        {UploadedSourcefiles.Target_audience.map(
                          (item: any, i: any) => (
                            <div className="col-12" key={item.uuid_id}>
                              <input
                                type="checkbox"
                                name="audience"
                                id={`persona1_${i}`}
                                value={item.uuid_id}
                                checked={TargetAudience[0] === item.uuid_id}
                                onChange={handleTargetAudience}
                              />
                              <label
                                htmlFor={`persona1_${i}`}
                                className="font_16 ms-1"
                              >
                                {item.category} - {item.file_name}
                              </label>
                            </div>
                          )
                        )}
                        {/* Code Commented */}
                        {/* {UploadedSourcefiles.define_objective.map(
                          (item: any, i: any) => (
                            <div
                              className="col-12 col-lg-6 col-xxl-6"
                              key={item.uuid_id}
                            >
                              <div className="objective_box">
                                <input
                                  type="checkbox"
                                  id={`persona_${i}`}
                                  name={`objective${i}`}
                                  checked={PostObjectives.includes(
                                    item.uuid_id
                                  )}
                                  value={item.uuid_id}
                                  onChange={handleObjectiveChange}
                                />
                                <label
                                  htmlFor={`persona_${i}`}
                                  className="font_16 ms-1"
                                >
                                  {item.category} - {item.file_name}
                                </label>
                              </div>
                            </div>
                          )
                        )} */}
                      </>
                    ) : (
                      <div className="col-12">
                        <p className="text-muted">
                          No Target Audience uploaded.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div className="col-12">
              <label htmlFor="post_msg" className="font_20 font_500 mb-2">
                Add more context/ instructions
              </label>
              <textarea
                className="form-control"
                placeholder="Describe your message"
                id="post_msg"
                style={{ height: "120px" }}
                value={AddInstructions}
                onChange={(e) => setAddInstructions(e.target.value)}
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="col-12">
              <label htmlFor="post_upload" className="font_20 font_500 mb-1">
                Upload Campaign Files
              </label>
              <div className="doc_file_wrapper">
                <input
                  className="form-control upload_input"
                  type="file"
                  id="post_upload"
                  accept=".doc,.docx"
                  ref={fileInputRef}
                  // multiple
                  onChange={handleFileChange}
                />
                <div className="doc_left">
                  <p className="font_16 mb-1">
                    Drag and drop files here or{" "}
                    <span className="text_blue">browse</span> to upload
                  </p>
                </div>
              </div>

              <ul className="upload_content_item file_upload_list">
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    <span>
                      <i className="bi bi-file-earmark-doc-fill me-1"></i>{" "}
                      {file.name}
                    </span>
                    <button
                      className="btn text_orange font_20 pe-0"
                      aria-label="remove_icon"
                      onClick={() => handleRemoveFile(index, "upload")}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </li>
                ))}
                {FileUrl &&
                  Array.isArray(FileUrl) &&
                  FileUrl.length > 0 &&
                  FileUrl.map((file: any, index: number) => (
                    <li key={index}>
                      <span>
                        <i className="bi bi-file-earmark-doc-fill me-1"></i>{" "}
                        {file}
                      </span>
                      <button
                        type="button"
                        className="btn text_orange font_20 pe-0"
                        aria-label="remove_icon"
                        onClick={() => handleRemoveFile(index, "fileurl")}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="col-12">
              <label htmlFor="add_link" className="font_20 font_500 mb-2">
                Add Country
              </label>
              <div
                className="country_box"
                style={
                  NewMessage !== "newContent" ? { cursor: "not-allowed" } : {}
                }
              >
                <Select
                  options={locationOptions}
                  value={country}
                  onChange={setCountry}
                  isMulti
                  placeholder="Select Target Country"
                  classNamePrefix="react_select_new"
                  isDisabled={NewMessage !== "newContent"}
                />
              </div>
            </div>
            <div className="col-12 country_box">
              <label htmlFor="add_link" className="font_20 font_500 mb-2">
                Add Language
              </label>
              <select
                className="form-control"
                id="targetLanguage"
                aria-label="target_language"
                value={language || ""}
                onChange={(e) => setLanguage(e.target.value)}
                style={
                  NewMessage !== "newContent" ? { cursor: "not-allowed" } : {}
                }
                disabled={NewMessage !== "newContent"}
              >
                <option value="">Select Language</option>
                {language_options.map((language) => (
                  <option key={language.ID} value={language.ID}>
                    {language.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="add_link" className="font_20 font_500 mb-2">
                Add Links
              </label>
              <div className="add_link_wrapper">
                <input
                  className="form-control link_input"
                  type="text"
                  id="add_link"
                  value={linkInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter URL here"
                />
                <button
                  className="btn primary_btn_outline"
                  onClick={handleAddButtonClick}
                  type="button"
                >
                  Add
                </button>
              </div>

              <ul className="upload_content_item links_upload_list">
                {links.map((link, index) => (
                  <li key={index}>
                    <span>
                      <i className="bi bi-link me-1"></i> {link}
                    </span>
                    <button
                      className="btn text_orange font_20 pe-0"
                      aria-label="remove_icon"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12">
              <button className="btn primary_btn" type="submit">
                Generate
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default ContentForm;

import React from "react";

interface ContentFormProps {
  contentType: string;
  FileName: string;
  PostObjectives: string[];
  TargetAudience: string[];
  AddInstructions: string;
  uploadedFiles: File[];
  FileUrl: File[];
  linkInput: string;
  links: string[];
  FormDynamictData: any;

  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleObjectiveChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
}

const ContentForm: React.FC<ContentFormProps> = ({
  contentType,
  FileName,
  PostObjectives,
  TargetAudience,
  AddInstructions,
  uploadedFiles,
  FileUrl,
  linkInput,
  links,
  FormDynamictData,
  handleSelectChange,
  handleObjectiveChange,
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
}) => {
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
          {PostObjectives?.length > 10 && (
            <p className="keyword_error font_16">
              Error: Limit Reached: Please enter no more than 10 keywords
            </p>
          )}

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
                  className={`form_input ${
                    PostObjectives?.length > 10 ? "error-border" : ""
                  }`}
                >
                  <h3 className="font_20 font_500 mb-3">
                    Define Post Objective
                  </h3>
                  <div className="row mb-2">
                    {UploadedSourcefiles?.define_objective?.length > 0 ? (
                      UploadedSourcefiles?.define_objective.map(
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
                                checked={PostObjectives.includes(item.uuid_id)}
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
                      )
                    ) : (
                      <div className="col-12">
                        <p className="text-muted">
                          No Post Objective uploaded.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="form_input">
                  <h3 className="font_20 font_500 mb-3">Target Audience</h3>
                  <div className="row mb-2">
                    {UploadedSourcefiles?.Target_audience?.length > 0 ? (
                      UploadedSourcefiles?.Target_audience.map(
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
                      )
                    ) : (
                      <div className="col-12">
                        <p className="text-muted">No Audience uploaded.</p>
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
              <label htmlFor="post_upload" className="font_20 font_500 mb-2">
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

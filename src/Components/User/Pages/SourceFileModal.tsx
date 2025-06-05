import { useEffect, useState, useRef } from "react";
import { AddSourceFileData, UpdateSourceFileData } from "./ProfileServices";

interface IcpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  FileEditData: any;
  onAddSouceFile: () => void;
}

const SourceFileModal: React.FC<IcpModalProps> = ({
  isOpen,
  onClose,
  title,
  FileEditData,
  onAddSouceFile,
}) => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (FileEditData && Object.keys(FileEditData).length > 0) {
      setFileName(FileEditData.file_name || "");
      setSelectedFileName(FileEditData.uploaded_file_name || "");
    } else {
      setFileName("");
      setSelectedFile(null);
      setSelectedFileName("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [FileEditData]);

  const handleSave = async () => {
    if (!fileName || !selectedFile) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("file", selectedFile);
    formData.append("category", title);

    try {
      setIsLoading(true);
      const response = await AddSourceFileData(formData);
      if (response.status === 200 || response.status === 201) {
        setIsLoading(false);
        setFileName("");
        setSelectedFile(null);
        setSelectedFileName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onAddSouceFile();
      }
    } catch (error) {
      console.log("Upload error:", error);
      setIsLoading(false);
    }
  };

  const onHandleCloseData = () => {
    setFileName("");
    setSelectedFile(null);
    setSelectedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const handleUpdate = async () => {
    if (!fileName || (!selectedFile && !selectedFileName)) {
      alert("Please provide a file name and file.");
      return;
    }

    const formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("category", title);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      setIsLoading(true);
      const response = await UpdateSourceFileData(
        FileEditData.uuid_id,
        formData
      );
      if (response.status === 200 || response.status === 201) {
        setFileName("");
        setSelectedFile(null);
        setSelectedFileName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onAddSouceFile();
      }
    } catch (error) {
      console.log("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${
        isOpen ? "show d-block" : "d-none"
      } source_modal`}
      tabIndex={-1}
      aria-hidden="true"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body source_form_wrapper buyer_form">
            <h3 className="font_25 font_600 text-center mb-4">{title}</h3>
            <div className="row">
              <div className="col-12">
                <label htmlFor="buyerPersona" className="font_16 font_500 mb-2">
                  Name your file *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="buyerPersona"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              <div className="col-12" style={{ marginTop: "15px" }}>
                <label
                  htmlFor="uploadpersona"
                  className="font_16 font_500 mb-2"
                >
                  Upload {title} description *
                </label>
                <div className="doc_file_wrapper" id="uploadpersona">
                  <input
                    ref={fileInputRef}
                    className="form-control upload_input"
                    type="file"
                    accept=".doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const allowedTypes = [
                          "application/msword",
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ];
                        if (!allowedTypes.includes(file.type)) {
                          alert("Only .doc and .docx files are allowed");
                          return;
                        }
                        setSelectedFile(file);
                      }
                    }}
                  />

                  <div className="doc_left">
                    <p className="font_14 mb-0">
                      Drag and drop files here or{" "}
                      <span className="text_blue font_500">browse</span> to
                      Upload
                    </p>
                  </div>
                </div>
                {selectedFile && (
                  <p className="font_14 mb-0 uploaded-file-name">
                    {selectedFile.name}
                  </p>
                )}
                {selectedFileName && !selectedFile && (
                  <p className="font_14 mb-0 uploaded-file-name">
                    {selectedFileName}
                  </p>
                )}
              </div>
              <div className="col-12 text-center mt-3">
                <button
                  type="button"
                  className="btn primary_btn modal_btn"
                  onClick={FileEditData?.uuid_id ? handleUpdate : handleSave}
                >
                  {isLoading
                    ? "Wait..."
                    : FileEditData?.uuid_id
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn modal_close"
              onClick={onHandleCloseData}
              aria-label="Close"
            >
              <i className="bi-x-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceFileModal;

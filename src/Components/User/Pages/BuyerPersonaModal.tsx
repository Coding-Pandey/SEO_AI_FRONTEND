 import React from 'react';

interface BuyerPersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  errorMessage?: string;
  fileList?: string[]; // array of file URLs or names
}

const BuyerPersonaModal: React.FC<BuyerPersonaModalProps> = ({
  isOpen,
  onClose,
  title = 'Create your Buyer Persona',
  errorMessage = 'Please update the mission information',
  fileList = [],
}) => {
  if (!isOpen) return null;

  return (
  
      <div
        className="modal fade show d-block source_modal"
        tabIndex={-1}
        aria-hidden="true"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body source_form_wrapper ideal_form">
              <h3 className="font_25 font_600 text-center mb-4">{title}</h3>
              <p className="font_16 keyword_error">{errorMessage}</p>

              <div className="row">
                <div className="col-12">
                  <label htmlFor="buyerPersona" className="font_16 font_500 mb-2">
                    Name your buyer persona *
                  </label>
                  <input type="text" className="form-control" id="buyerPersona" />
                </div>

                <div className="col-12">
                  <label htmlFor="uploadpersona" className="font_16 font_500 mb-2">
                    Upload persona description *
                  </label>
                  <div className="doc_file_wrapper" id="uploadpersona">
                    <input className="form-control upload_input" type="file" />
                    <div className="doc_left">
                      <p className="font_14 mb-0">
                        Drag and drop files here or{' '}
                        <span className="text_blue font_500">browse</span> to Upload
                      </p>
                    </div>
                  </div>

                  {/* File list display */}
                  {fileList.length > 0 && (
                    <ul className="upload_content_item file_upload_list">
                      {fileList.map((file, index) => (
                        <li className="font_14" key={index}>
                          <span>
                            <i className="bi bi-file-earmark-pdf-fill me-1"></i> {file}
                          </span>
                          <button
                            type="button"
                            className="btn text_orange font_16 pe-0"
                            aria-label="remove_icon"
                            onClick={() => console.log('Remove', file)}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="uploadpersona2" className="font_16 font_500 mb-2">
                    Upload persona specific pain points *
                  </label>
                  <div className="doc_file_wrapper" id="uploadpersona2">
                    <input className="form-control upload_input" type="file" />
                    <div className="doc_left">
                      <p className="font_14 mb-0">
                        Drag and drop files here or{' '}
                        <span className="text_blue font_500">browse</span> to Upload
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 text-center">
                  <button type="button" className="btn primary_btn modal_btn">
                    Save
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn modal_close"
                onClick={onClose}
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

export default BuyerPersonaModal;

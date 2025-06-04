 interface IcpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const SourceFileModal: React.FC<IcpModalProps> = ({ isOpen, onClose, title }) => {
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
            <div className="modal-body source_form_wrapper buyer_form">
              <h3 className="font_25 font_600 text-center mb-4">{title}</h3>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="buyerPersona" className="font_16 font_500 mb-2">
                    Name your file *
                  </label>
                  <input type="text" className="form-control" id="buyerPersona" />
                </div>
                <div className="col-12" style={{ marginTop: '15px' }}>
                  <label htmlFor="uploadpersona" className="font_16 font_500 mb-2">
                    Upload {title} description *
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

export default SourceFileModal

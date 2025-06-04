 
const ConnectModal = ({ onConnect }: { onConnect: () => void }) => {
  return (
    <div
      className="modal fade integrated_modal"
      id="integratedCard"
      tabIndex={-1}
      aria-labelledby="integrationTabLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body schedule_box">
            <p className="font_16 mb-1">
              We require authorisation to connect to the data
            </p>
            <button
              type="button"
              className="btn primary_btn ok_btn"
              onClick={onConnect}
            >
              Connect
            </button>
          </div>
          <button
            className="btn modal_close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;

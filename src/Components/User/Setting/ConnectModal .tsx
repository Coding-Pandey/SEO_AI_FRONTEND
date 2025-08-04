const ConnectModal = ({
  onConnect,
  isConnected,
  onClose,
}: {
  onConnect: () => void;
  isConnected: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
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
              {isConnected ? "Re-Connect" : "Connect"}
            </button>
          </div>
          <button
            className="btn modal_close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;

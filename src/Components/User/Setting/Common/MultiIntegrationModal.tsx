interface Variant {
  name: string;
  img: string;
  category: string;
}

interface Props {
  title: string;
  options: Variant[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
  getIsConnected: (category: string) => boolean;
}

const MultiIntegrationModal = ({
  title,
  options,
  isOpen,
  onClose,
  onSelect,
  getIsConnected,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <ul className="list-unstyled integration_card_wrapper row row-cols-1 row-cols-sm-2 row-cols-lg-2 row-cols-xxl-2 g-3">
              {options.map((item, index) => {
                const isConnected = getIsConnected(item.category);
                return (
                  <li className="col" key={index}>
                    <div
                      className="intergration_card card_box"
                      onClick={() => {
                        onSelect(item.category);
                        onClose();
                      }}
                    >
                      <div className="left_part">
                        <img
                          src={`/assets/images/${item.img}`}
                          className="img-fluid integrated_icon"
                          alt="integrated icon"
                        />
                      </div>
                      <div className="right_part">
                        <h4 className="font_16 font_700 text_blue">
                          {item.name}
                        </h4>
                        <p className="font_14 mb-0">
                          Connect to access performance report data
                        </p>
                      </div>
                      <button type="button" className="integrate_btn">
                        <span>
                          <i
                            className={`bi bi-${
                              isConnected ? "check" : "x"
                            }-circle-fill ${
                              isConnected ? "text-success" : "text-danger"
                            }`}
                          ></i>
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
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

export default MultiIntegrationModal;

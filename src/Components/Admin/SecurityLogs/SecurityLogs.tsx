import { useEffect, useState } from "react";
import Loading from "../../Page/Loading/Loading";
import AdminHeader from "../AdminComponent/AdminHeader/AdminHeader";
import AdminSideBar from "../AdminComponent/AdminSideBar/AdminSideBar";
import { GetSecurityLogs } from "../Service";
import { toast } from "react-toastify";

const SecurityLogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("");
  // For modal
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await GetSecurityLogs({
        is_expired: statusFilter || "",
        page: currentPage,
        per_page: perPage,
      });
      if (response.status === 200 || response.status === 201) {
        setLogs(response.data?.items);
        setTotalPages(response.data.meta?.total_pages);
        setTotalRows(response.data.meta?.total_items);
      }
    } catch (error: any) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to fetch sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [currentPage,statusFilter]);

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Show details handler
  const handleShowDetails = (log: any) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  return (
    <>
      {isLoading && <Loading />}
      <AdminHeader />
      <main className="main_wrapper">
        <AdminSideBar />

        <div className="inner_content">
          <div className="keyword_tool_content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 font_20 font_600">Manage Security Logs</h5>
                <div className="d-flex flex-wrap align-items-center gap-2">
                <select
                  className="form-select"
                  style={{ width: "150px" }}
                  value={statusFilter}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setStatusFilter(e.target.value);
                  }}
                >
                  <option value="">All Risk Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                 </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>No.</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>IP Address</th>
                    <th>Device Info</th>
                    <th>Created At</th>
                    <th>Risk Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logs?.length > 0 ? (
                    logs.map((log, index) => (
                      <tr key={log.id}>
                        <td>{index + 1 + (currentPage - 1) * perPage}</td>
                        <td>{log.user_username}</td>
                        <td>{log.user_email || "-"}</td>
                        <td>{log.ip_address}</td>

                        <td>{log.user_agent}</td>
                        <td>{formatDateTime(log.occurred_at)}</td>
                        <td>
                          <span
                            className={`badge ${
                              log.risk_level === "high"
                                ? "bg-danger"
                                : log.risk_level === "medium"
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                          >
                            {log.risk_level}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn primary_btn"
                            onClick={() => handleShowDetails(log)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No Security Logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
              <p className="mb-2 mb-md-0">
                Showing {Math.min(currentPage * perPage, totalRows)} of{" "}
                {totalRows} entries
              </p>

              <nav>
                <ul className="pagination mb-0 flex-wrap">
                  {/* Previous button */}
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      <i className="bi bi-arrow-left"></i>
                    </button>
                  </li>

                  {/* First page */}
                  {currentPage > 3 && (
                    <>
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(1)}
                        >
                          1
                        </button>
                      </li>
                      {currentPage > 4 && (
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      )}
                    </>
                  )}

                  {/* Middle pages */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (num) => num >= currentPage - 2 && num <= currentPage + 2
                    )
                    .map((num) => (
                      <li
                        key={num}
                        className={`page-item ${
                          currentPage === num ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(num)}
                        >
                          {num}
                        </button>
                      </li>
                    ))}

                  {/* Last page */}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      )}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </li>
                    </>
                  )}

                  {/* Next button */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for Details */}
      {showModal && selectedLog && (
        <div
          className="modal fade show d-block security_modal"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">
                  Log Details (ID: {selectedLog.id})
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div
                className="modal-body"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                <p>
                  <strong>User:</strong> {selectedLog.user_username} (
                  {selectedLog.user_email})
                </p>
                <p>
                  <strong>Event Type:</strong> {selectedLog.event_type}
                </p>
                <p>
                  <strong>Description:</strong> {selectedLog.event_description}
                </p>
                <p>
                  <strong>IP Address:</strong> {selectedLog.ip_address}
                </p>
                <p>
                  <strong>User Agent:</strong> {selectedLog.user_agent}
                </p>
                <p>
                  <strong>Risk Level:</strong> {selectedLog.risk_level}
                </p>
                <p>
                  <strong>Occurred At:</strong>{" "}
                  {formatDateTime(selectedLog.occurred_at)}
                </p>

                {selectedLog.metadata?.security_info && (
                  <>
                    <h6 className="mt-4 mb-2">🔐 Security Info</h6>
                    <table className="table table-bordered table-sm">
                      <tbody>
                        <tr>
                          <th>Session Age (hours)</th>
                          <td>
                            {
                              selectedLog.metadata.security_info
                                .session_age_hours
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>Last Activity (hours)</th>
                          <td>
                            {
                              selectedLog.metadata.security_info
                                .last_activity_hours
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>Expired</th>
                          <td>
                            {selectedLog.metadata.security_info.is_expired ? (
                              <span className="badge bg-danger">Yes</span>
                            ) : (
                              <span className="badge bg-success">No</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>IP</th>
                          <td>
                            {selectedLog.metadata.security_info.ip_address}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecurityLogs;

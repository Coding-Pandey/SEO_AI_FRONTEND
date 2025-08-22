import { useEffect, useState } from "react";
import Loading from "../../Page/Loading/Loading";
import AdminHeader from "../AdminComponent/AdminHeader/AdminHeader";
import AdminSideBar from "../AdminComponent/AdminSideBar/AdminSideBar";
import {
  DeleteActiveSession,
  DeleteAllActiveSessions,
  GetActiveSession,
} from "../Service";
import { toast } from "react-toastify";
import ConformModal from "../../Page/ConfirmModal";

interface SessionData {
  id: number;
  session_id: string;
  device_info: string;
  ip_address: string;
  created_at: string;
  last_activity: string;
  expires_at: string;
  is_expired: boolean;
  is_active: boolean;
  user_id: number | null;
}

const ActiveSession = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);
  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await GetActiveSession({
        is_expired: statusFilter || "null",
        page: currentPage,
        per_page: perPage,
      });
      if (response.status === 200 || response.status === 201) {
        setSessions(response.data.sessions);
        setTotalPages(response.data.pagination.total_pages);
        setTotalRows(response.data.pagination.total_rows);
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
  }, [currentPage, statusFilter]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "-"; // fallback if date is null or empty
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

  const handleDeleteClick = (sessionId: string) => {
    setDeleteSessionId(sessionId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteSessionId) {
      try {
        const response = await DeleteActiveSession(deleteSessionId); // send session_id
        if (response.status === 200 || response.status === 201) {
          setSessions(
            sessions.filter((session) => session.session_id !== deleteSessionId)
          );
          toast.success("Session deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting session:", error);
        toast.error("Failed to delete session");
      }
    }
    setIsModalOpen(false);
    setDeleteSessionId(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDeleteSessionId(null);
  };

  const handleConfirmDeleteAll = async () => {
    try {
      const response = await DeleteAllActiveSessions();
      if (response.status === 200 || response.status === 201) {
        // response.data me agar updated sessions list mil rahi hai
        const activeSessions = sessions.filter(
          (s: SessionData) => s.is_expired === false
        );
        console.log(activeSessions, "activeSessions");
        setSessions(activeSessions);

        toast.success("All active sessions deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting all sessions:", error);
      toast.error("Failed to delete all sessions");
    }
    setIsDeleteAllModalOpen(false);
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
              {/* Left side: title */}
              <h5 className="mb-0 font_20 font_600">Manage Active Sessions</h5>

              {/* Right side: dropdown + button */}
              <div className="d-flex align-items-center gap-2">
                <select
                  className="form-select"
                  style={{ width: "150px" }}
                  value={statusFilter}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setStatusFilter(e.target.value);
                  }}
                >
                  <option value="">All Status</option>
                  <option value="false">Active</option>
                  <option value="true">Expired</option>
                </select>

                <button
                  className="btn  secondary_btn bg-danger" style={{color:"white"}}
                  onClick={() => setIsDeleteAllModalOpen(true)}
                >
                  Delete All Expired Sessions
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>No.</th>
                    {/* <th>Session ID</th> */}
                    <th>Device Info</th>
                    <th>IP Address</th>
                    <th>Created At</th>
                    <th>Last Activity</th>
                    <th>Expires At</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.length > 0 ? (
                    sessions.map((session, index) => (
                      <tr key={session.id}>
                        <td>{index + 1 + (currentPage - 1) * perPage}</td>
                        {/* <td>{session.session_id}</td> */}
                        <td>{session.device_info}</td>
                        <td>{session.ip_address}</td>
                        <td>{formatDateTime(session.created_at)}</td>
                        <td>{formatDateTime(session.last_activity)}</td>
                        <td>{formatDateTime(session.expires_at)}</td>

                        <td>{!session.is_expired ? "Active" : "Expired"} </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeleteClick(session.session_id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No sessions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination & total entries */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="mb-0">
                Showing {Math.min(currentPage * perPage, totalRows)} of{" "}
                {totalRows} entries
              </p>

              <nav>
                <ul className="pagination mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      <i className="bi bi-arrow-left"></i> Previous
                    </button>
                  </li>

                  {pageNumbers.map((num) => (
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

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next <i className="bi bi-arrow-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>
      <ConformModal
        isOpen={isModalOpen}
        title="Delete Confirmation"
        message="Are you sure you want to delete this sessions?"
        onClose={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ConformModal
        isOpen={isDeleteAllModalOpen}
        title="Delete All Confirmation"
        message="Are you sure you want to delete ALL Expired sessions?"
        onClose={handleConfirmDeleteAll}
        onCancel={() => setIsDeleteAllModalOpen(false)}
      />
    </>
  );
};

export default ActiveSession;

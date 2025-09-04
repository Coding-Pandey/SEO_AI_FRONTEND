import React, { useEffect, useState, useCallback } from "react";
import Loading from "../../Page/Loading/Loading";
import AdminHeader from "../AdminComponent/AdminHeader/AdminHeader";
import AdminSideBar from "../AdminComponent/AdminSideBar/AdminSideBar";
import {
  DeleteUserAndOrganizationUser,
  GetOrganizationAndItsUser,
} from "../Service";
import { capitalizeFirstLetter } from "../../User/SeoProcess/SEOReport/Reports";
import { toast } from "react-toastify";
import ConformModal from "../../Page/ConfirmModal";
import debounce from "lodash/debounce";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  image_url?: string | null;
  is_active?: boolean;
  is_verified?: boolean;
  created_at?: string;
  last_login?: string | null;
  organization_id?: string;
}

interface ModeratorData {
  moderator: UserData;
  users: UserData[];
  user_count: number;
}

const Organizations = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moderators, setModerators] = useState<ModeratorData[]>([]);
  const [expandedModeratorId, setExpandedModeratorId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<"moderator" | "user">("user");

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [searchUsername, setSearchUsername] = useState("");

  // Fetch moderators & users
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetOrganizationAndItsUser({
        username: searchUsername || "",
        page: currentPage,
        per_page: perPage,
      });

      if (response.status === 200 || response.status === 201) {
        setModerators(response.data.data);
        setTotalPages(response.data.pagination.total_pages);
        setTotalRows(response.data.pagination.total_items);
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced username search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setCurrentPage(1);
      setSearchUsername(value);
    }, 500),
    []
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [currentPage, searchUsername]);

  // Delete user or moderator
  const handleDeleteClick = (id: number, type: "moderator" | "user") => {
    setDeleteId(id);
    setDeleteType(type);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        const response = await DeleteUserAndOrganizationUser(deleteId);
        if (response.status === 200 || response.status === 204) {
          if (deleteType === "user") {
            setModerators((prev) =>
              prev.map((mod) => ({
                ...mod,
                users: mod.users.filter((user) => user.id !== deleteId),
                user_count: mod.users.filter((user) => user.id !== deleteId)
                  .length,
              }))
            );
          } else {
            // Delete moderator
            setModerators((prev) =>
              prev.filter((mod) => mod.moderator.id !== deleteId)
            );
          }
          toast.success(
            deleteType === "user"
              ? "User deleted successfully"
              : "Moderator deleted successfully"
          );
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  // Toggle expand/collapse of moderator users
  const toggleExpand = (id: number) => {
    setExpandedModeratorId(expandedModeratorId === id ? null : id);
  };

  return (
    <>
      {isLoading && <Loading />}
      <AdminHeader />
      <main className="main_wrapper">
        <AdminSideBar />

        <div className="inner_content">
          <div className="keyword_tool_content">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
              <h5>Manage Organizations & Their Invited Users</h5>
            </div>

            {/* Search */}
            <div className="d-flex flex-wrap justify-content-end mb-3 gap-3 organization_btn">
              <div className="w-20">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Username"
                  onChange={handleUsernameChange}
                />
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
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {moderators.length > 0 ? (
                    moderators.map((mod, index) => (
                      <React.Fragment key={mod.moderator.id}>
                        {/* Moderator Row */}
                        <tr>
                          <td>{index + 1 + (currentPage - 1) * perPage}</td>
                          <td>
                            {capitalizeFirstLetter(mod.moderator.username)}
                          </td>
                          <td>{mod.moderator.email}</td>
                          <td>{mod.moderator.role}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => toggleExpand(mod.moderator.id)}
                            >
                              {expandedModeratorId === mod.moderator.id
                                ? `Hide Users (${mod.user_count})`
                                : `Show Users (${mod.user_count})`}
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDeleteClick(mod.moderator.id, "moderator")
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>

                        {/* Users */}
                        {expandedModeratorId === mod.moderator.id && (
                          <>
                            {mod.users.length > 0 ? (
                              mod.users.map((user) => (
                                <tr key={user.id} className="table-secondary">
                                  <td></td>
                                  <td style={{ paddingLeft: "2rem" }}>
                                    {user.username}
                                  </td>
                                  <td>{user.email}</td>
                                  <td>{user.role}</td>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        handleDeleteClick(user.id, "user")
                                      }
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="table-secondary">
                                <td
                                  colSpan={5}
                                  style={{
                                    paddingLeft: "2rem",
                                    textAlign: "center",
                                  }}
                                >
                                  No user invited by the organization
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No organization found
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

        <ConformModal
          isOpen={isModalOpen}
          title="Delete Confirmation"
          message="Are you sure you want to delete?"
          onClose={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </main>
    </>
  );
};

export default Organizations;

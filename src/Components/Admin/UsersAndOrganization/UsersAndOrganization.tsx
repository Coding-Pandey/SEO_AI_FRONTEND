import { useEffect, useState, useCallback } from "react";
import Loading from "../../Page/Loading/Loading";
import AdminHeader from "../AdminComponent/AdminHeader/AdminHeader";
import AdminSideBar from "../AdminComponent/AdminSideBar/AdminSideBar";
import {
  DeleteUserAndOrganizationUser,
  GetUserAndOrganization,
} from "../Service";
import { capitalizeFirstLetter } from "../../User/SeoProcess/SEOReport/Reports";
import { toast } from "react-toastify";
import ConformModal from "../../Page/ConfirmModal";
import { useAuth } from "../../../ContextApi/AuthContext/AuthContext";
import CreateAdminUsersForm from "./CreateAdminUsersForm";
import debounce from "lodash/debounce";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

const UsersAndOrganization = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [AllUsers, SetAllUsers] = useState<UserData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { users } = useAuth();

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchRole, setSearchRole] = useState<
    "user" | "moderator" | "admin" | ""
  >("");

  // Fetch users
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetUserAndOrganization({
        username: searchUsername || "",
        role: searchRole || "",
        page: currentPage,
        per_page: perPage,
      });
      if (response.status === 200 || response.status === 201) {
        SetAllUsers(response.data.users);
        setTotalPages(response.data.pagination.total_pages);
        setTotalRows(response.data.pagination.total_rows);
        setIsCreateModalOpen(false);
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

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setSearchRole(e.target.value as any);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [currentPage, searchRole, searchUsername]);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        const response = await DeleteUserAndOrganizationUser(deleteId);
        if (response.status === 200 || response.status === 204) {
          SetAllUsers(AllUsers.filter((user) => user.id !== deleteId));
          toast.success("User deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      {isLoading && <Loading />}
      <AdminHeader />
      <main className="main_wrapper">
        <AdminSideBar />
        {!isCreateModalOpen ? (
          <div className="inner_content">
            <div className="keyword_tool_content">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <h5>Manage Admin and Users and Organizations</h5>
                <button
                  className="btn primary_btn"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Add User / Admin
                </button>
              </div>

              {/* Search & Role */}
              <div className="d-flex flex-wrap justify-content-between mb-3 gap-3 organization_btn">
                {/* Role filter on the left */}
                <div className="w-20">
                  <select
                    className="form-select"
                    value={searchRole}
                    onChange={handleRoleChange}
                  >
                    <option value="">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Organization</option>
                  </select>
                </div>

                {/* Search input on the right */}
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
                    {AllUsers?.length > 0 ? (
                      AllUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1 + (currentPage - 1) * perPage}</td>
                          <td>{capitalizeFirstLetter(user.username)}</td>
                          <td>{capitalizeFirstLetter(user.email)}</td>
                          <td>
                            {" "}
                            {user.role === "moderator"
                              ? "Organization"
                              : capitalizeFirstLetter(user.role)}
                          </td>
                          <td>
                            {!(
                              users?.user?.role === "admin" &&
                              users?.user?.email === user.email
                            ) && (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteClick(user.id)}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
                        (num) =>
                          num >= currentPage - 2 && num <= currentPage + 2
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
        ) : (
          <CreateAdminUsersForm
            onClose={() => setIsCreateModalOpen(false)}
            onHandleSubmit={fetchUserDetails}
          />
        )}

        <ConformModal
          isOpen={isModalOpen}
          title="Delete Confirmation"
          message="Are you sure you want to delete this user?"
          onClose={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </main>
    </>
  );
};

export default UsersAndOrganization;

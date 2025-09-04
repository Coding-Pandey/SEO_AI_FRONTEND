import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../Page/Loading/Loading";
import { useAuth } from "../../../../ContextApi/AuthContext/AuthContext";
import {
  DeleteUserByModerator,
  GetModeratorUserList,
} from "../ModeratorService";
import ConformModal from "../../../Page/ConfirmModal";
 
import { capitalizeFirstLetter } from "../../SeoProcess/SEOReport/Reports";
import ModeratorCreateUsersForms from "./ModeratorCreateUsersForms";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

const ManageModerator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [AllUsers, SetAllUsers] = useState<UserData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { users } = useAuth();

  // Fetch users
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetModeratorUserList();
      if (response.status === 200 || response.status === 201) {
        console.log(response.data, "response");
        SetAllUsers(response.data.users.reverse());
        setIsCreateModalOpen(false);
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        const response = await DeleteUserByModerator(deleteId);
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
    
      <main className="profile_content Integrations_settings">
  
        {!isCreateModalOpen ? (
          <div className="row">
            <div className="keyword_tool_content">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <h5 className="font_25 font_600"> </h5>
                <button
                  className="btn primary_btn"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Invite User
                </button>
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
                          <td>{index + 1}</td>
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
              <div className="d-flex flex-wrap justify-content-between align-items-center mt-3"></div>
            </div>
          </div>
        ) : (
          <ModeratorCreateUsersForms
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

export default ManageModerator;

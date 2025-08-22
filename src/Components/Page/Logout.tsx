import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextApi/AuthContext/AuthContext";
import { LogoutUserAndAdmin } from "../../auth/Services";
import Loading from "./Loading/Loading";

const Logout: React.FC = () => {
  const { users, setUsers } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      if (!users) {
        navigate("/", { replace: true });
        return;
      }
      try {
        const res = await LogoutUserAndAdmin();
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          localStorage.clear();
          setUsers(null);
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Logout failed:", error);
        localStorage.clear();
        setUsers(null);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    handleLogout();
  }, [navigate, setUsers]);

  if (loading) {
    return <Loading />;
  }

  return null;
};

export default Logout;

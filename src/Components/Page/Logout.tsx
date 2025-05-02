 import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextApi/AuthContext/AuthContext";

 
const Logout: React.FC = () => {
  const {setUsers}=useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.removeItem("user_Data");
    localStorage.clear();
    setUsers(null);
    navigate("/");
  }, [navigate, setUsers]);

  return null;
};

export default Logout;

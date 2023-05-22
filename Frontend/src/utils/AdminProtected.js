/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const AdminProtected = ({ isLoggedIn, children, role }) => {
    const navigate = useNavigate()
  if (!isLoggedIn && role === "ROLE_ADMIN") {
    navigate("/")
    return
  }
  return children;
};
export default AdminProtected;

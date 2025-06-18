import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Components/AuthContext";

function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/" />;
}

export default PrivateRoute;

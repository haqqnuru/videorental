
import { Navigate, useLocation } from "react-router-dom";
import auth from "../services/authService";

export default function ProtectedRoute({ children }) {
  const user = auth.getCurrentUser();
  const location = useLocation();

  if (!user)
    return (
      <Navigate 
        to="/login"
        replace
        state={{ from: location }}   //remember where user was trying to go
      />
    );

  return children;
}

import { Navigate } from "react-router-dom";
import auth from "../services/authService";

export default function PublicRoute({ children }) {
  const user = auth.getCurrentUser();

  // If logged in → go home
  if (user) return <Navigate to="/" replace />;

  return children;
}


// for pages that should NOT be visible to logged-in users
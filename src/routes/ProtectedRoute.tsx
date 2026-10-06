import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  console.log("isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

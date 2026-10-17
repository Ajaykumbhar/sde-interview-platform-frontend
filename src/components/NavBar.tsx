import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return (
    <nav>
      <h2>Interview Prep Platform</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/problems">Problems</Link>
        <Link to="/mock-interviews">Mock Interviews</Link>
        <Link to="/system-design">System Design</Link>
      </div>
      <div>
        {isAuthenticated ? (
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

function Navbar() {
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
        <Link to="login">Login</Link>
        <Link to="signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;

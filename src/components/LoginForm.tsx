import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorUtils";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");

      return;
    }

    try {
      const response = await loginUser({
        userEmail: email,
        userPassword: password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      navigate("/problems");
    } catch (err: unknown) {
      console.error("Login failed:", err);

      setError(getErrorMessage(err) || "Login failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setEmailError("");
          }}
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <div>
        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(value) => {
            setPassword(value);
            setError("");
          }}
        />
        {error && <p>{error}</p>}
        <Button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </Button>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginForm;

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorUtils";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setApiError("");
    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        userName: username,
        userEmail: email,
        userPassword: password,
      });
      console.log("User registered successfully:", response.data);
      navigate("/login", {
        state: {
          message: "Registration successful. Please login.",
        },
      });
    } catch (err: unknown) {
      console.error("Error registering user:", err);
      setApiError(
        getErrorMessage(err) || "Error registering user. Please try again.",
      );
    } finally {
      setLoading(false);
    }

    // Handle form submission logic here
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={(value) => {
            setUsername(value);
            setUsernameError("");
            setApiError("");
          }}
        />
        {usernameError && <p>{usernameError}</p>}
      </div>
      <div>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setEmailError("");
            setApiError("");
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
            setPasswordError("");
            setApiError("");
          }}
        />
        {passwordError && <p>{passwordError}</p>}

        <Button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"} Password
        </Button>
        {apiError && <p>{apiError}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

export default RegisterForm;

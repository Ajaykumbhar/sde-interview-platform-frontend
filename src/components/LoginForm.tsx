import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setEmailError("");
    alert("Login Successful");
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
          onChange={setPassword}
        />
        <Button
          text={showPassword ? "Hide" : "Show"}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <Button text="Login" type="submit" />
    </form>
  );
}

export default LoginForm;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";

function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    alert("Registration successful! Please login to continue.");
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="auth-container auth-card">
        <h2>Register</h2>

        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button className="btn-register" onClick={handleRegister}>
          Register
        </button>

        <p className="link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;

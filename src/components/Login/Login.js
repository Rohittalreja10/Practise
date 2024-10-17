import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailId,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setSuccessMessage("Login successful.");
        localStorage.setItem("token", data.token); 

        setTimeout(() => {
          navigate("/home"); 
        }, 2000); 
      } else {
        setErrorMessage(data.error || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="driver-login-page">
      <div className="container-fluid d-flex justify-content-center bg-grey align-items-center my-4">
        <form
          className="border border-3 border-black bg-body-secondary text-black p-3 w-25"
          id="formcontainer"
          onSubmit={handleLogin}
        >
          <h3 className="text-center text-black">Login</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <div
            className="scrollable-section"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <div className="mb-3">
              <label htmlFor="emailId" className="form-label">
                Email ID:
              </label>
              <input
                type="email"
                className="form-control w-100 border border-1 border-warning"
                id="emailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control border border-1 border-warning"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn btn-success w-100" type="submit">
            Login
          </button>
          <div className="mt-2 mb-4">
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
          <div className="mt-2 mb-4">
            <Link to="/forgot">Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

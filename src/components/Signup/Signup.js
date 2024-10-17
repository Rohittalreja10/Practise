import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: emailId,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        setSuccessMessage("User registered successfully.");
      } else {
        setErrorMessage(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="driver-login-page">
      <div className="container-fluid d-flex justify-content-center bg-grey align-items-center my-4">
        <form
          className="border border-3 border-black bg-body-secondary text-black p-3 w-25"
          id="formcontainer"
          onSubmit={handleSignup}
        >
          <h3 className="text-center text-black">Signup</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <div
            className="scrollable-section"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control w-100 border border-1 border-warning"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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

          <button className="btn btn-success w-100" type="submit">Signup</button>
          <div className="mt-2 mb-4">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

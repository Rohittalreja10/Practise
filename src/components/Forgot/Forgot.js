import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [isOtpSent, setIsOtpSent] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/recover-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setSuccessMessage("OTP sent successfully to your email.");
        setIsOtpSent(true); 
      } else {
        setErrorMessage(data.error || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error during password recovery:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setSuccessMessage("Password updated successfully.");

        setTimeout(() => {
          navigate("/login"); 
        }, 2000);
      } else {
        setErrorMessage(data.error || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="container-fluid d-flex justify-content-center bg-grey align-items-center my-4">
        <form
          className="border border-3 border-black bg-body-secondary text-black p-3 w-25"
          id="formcontainer"
        >
          <h3 className="text-center text-black">Forgot Password</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter your Email:
            </label>
            <input
              type="email"
              className="form-control w-100 border border-1 border-warning"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isOtpSent} 
            />
          </div>

          {!isOtpSent && (
            <button
              className="btn btn-success w-100"
              type="submit"
              onClick={handleForgotPassword}
            >
              Send OTP
            </button>
          )}

          {isOtpSent && (
            <>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  Enter OTP:
                </label>
                <input
                  type="text"
                  className="form-control w-100 border border-1 border-warning"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password:
                </label>
                <input
                  type="password"
                  className="form-control w-100 border border-1 border-warning"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="btn btn-primary w-100"
                type="submit"
                onClick={handleUpdatePassword}
              >
                Update Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/otp_login_page.css";

export function OTPVerificationPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Retrieve email_or_phone from localStorage
  const emailOrPhone = localStorage.getItem("emailOrPhone");

  const handleOTPVerification = async (e) => {
    e.preventDefault();

    if (!emailOrPhone) {
      alert("Email or phone number is missing. Please log in again.");
      navigate("/login_page");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email_or_phone: emailOrPhone }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP verified successfully!");
        setOtp(""); // Clear OTP field
        navigate("/application_form"); // Navigate to the loan application form
      } else {
        alert(data.message || "Invalid OTP. Please try again.");
        setOtp(""); // Clear OTP field
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred while verifying OTP. Please try again.");
      setOtp(""); // Clear OTP field
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_or_phone: emailOrPhone }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP resent successfully. Please check your email and phone.");
      } else {
        alert(data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error while resending OTP:", error);
      alert("An error occurred while resending OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="company-name">LTI Mindtree Portal</h1>
        <p className="welcome-message">
          Please enter the OTP sent to your email or phone number.
        </p>
        <form onSubmit={handleOTPVerification}>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter your OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-login">
              Verify OTP
            </button>
          </div>
        </form>
        <div className="register-section">
          <p className="register-message">Didn't receive the OTP?</p>
          <button onClick={handleResendOTP} className="btn-register">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}


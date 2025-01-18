import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/otp_login_page.css';
// routing done make a "resend_otp" page as well

export function OTPVerificationPage() {
    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="company-name">LTI Mindtree Portal</h1>
                <p className="welcome-message">Please enter the OTP sent to your email or phone number.</p>
                <form action="/application_form" method="GET">
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input 
                            type="text" 
                            id="otp" 
                            name="otp" 
                            placeholder="Enter your OTP" 
                            required 
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-login">Verify OTP</button>
                    </div>
                </form>
                <div className="register-section">
                    <p className="register-message">Didn't receive the OTP?</p>
                    <Link to="/resend_otp" className="btn-register">Resend OTP</Link>
                </div>
            </div>
        </div>
    );
}

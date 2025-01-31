import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login_page.css';

export function LoginPage() {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email_or_phone: emailOrPhone,
                password: password,
            });

            if (response.data.success) {
                alert('Login successful! OTP sent to your email and phone.');
                // Save email_or_phone to localStorage for use in OTP verification
                localStorage.setItem('emailOrPhone', emailOrPhone);
                navigate('/otp_login_page');
            } else {
                alert(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="company-name">LTI Mindtree Portal</h1>
                <p className="welcome-message">Welcome back! Please log in to access your account.</p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email-phone">Email or Phone Number</label>
                        <input 
                            type="text" 
                            id="email-phone" 
                            name="email_or_phone" 
                            placeholder="Enter your email or phone number" 
                            required 
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-login">Log In</button>
                        <Link to="/forgot_password" className="forgot-password">Forgot password?</Link>
                    </div>
                </form>
                <div className="register-section">
                    <p className="register-message">Don't have an account?</p>
                    <Link to="/registration_page" className="btn-register">Register</Link>
                </div>
                <div className="employee-login-section">
                    <p className="employee-message">Are you a bank employee?</p>
                    <Link to="/login_employees" className="btn-employee-login">Employee Login</Link>
                </div>
            </div>
        </div>
    );
}

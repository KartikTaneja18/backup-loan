import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/Registration_page.css';
// routing done

function UserRegistration() {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // You can add form validation or API calls here

        // After successful registration, navigate to login page
        navigate('/login_page'); // Navigate to login page
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="company-name">LTI Mindtree Portal</h1>
                <p className="welcome-message">Create your account by filling the form below.</p>
                <form onSubmit={handleFormSubmit}> {/* Use onSubmit to handle form submission */}
                    <div className="form-group">
                        <label htmlFor="full-name">Full Name <span className="mandatory">*</span></label>
                        <input
                            type="text"
                            id="full-name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email <span className="mandatory">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone-number">Phone Number <span className="mandatory">*</span></label>
                        <input
                            type="tel"
                            id="phone-number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password <span className="mandatory">*</span></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password <span className="mandatory">*</span></label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-login">Register</button>
                    </div>
                </form>
                <div className="register-section">
                    <p className="register-message">Already have an account?</p>
                    <button onClick={() => navigate('/login_page')} className="btn-register">Log In</button> {/* Use navigate to go to login page */}
                </div>
            </div>
        </div>
    );
}

export { UserRegistration };

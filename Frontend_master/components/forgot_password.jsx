import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../styles/forgot_password.css';
//routing done

function ForgotPassword ()  {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Handle the password reset logic here
        console.log('Password reset successfully.');

        // Redirect to login page after password reset
        navigate('/login_page');
    };

    return (
        <div className="container">
            <h1>Forgot Password</h1>
            <p>Please enter your email and new password to reset your password.</p>

            <form id="reset-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input 
                        type="password" 
                        id="new-password" 
                        name="new-password" 
                        placeholder="Enter your new password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        name="confirm-password" 
                        placeholder="Confirm your new password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </div>

                <button type="submit">Reset Password</button>
            </form>

            <div className="link">
                <p>Remember your password? 
                    <span onClick={() => navigate('/login_page')} style={{cursor: 'pointer', color: 'blue'}}>
                        Go back to login
                    </span>
                </p>
            </div>
        </div>
    );
};

export { ForgotPassword };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login_employees.css';

function EmployeeLogin() {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (employeeId && password) {
            navigate('/employee_dashboard'); // Redirect to Employee Dashboard
        } else {
            alert('Please enter both Employee ID and Password.');
        }
    };

    const handleUserLoginRedirect = () => {
        navigate('/'); // Redirects to the root path (LoginPage)
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="company-name">LTI Mindtree Employee Portal</h1>
                <p className="welcome-message">
                    Welcome back! Please log in with your employee credentials.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="employee-id">Employee ID</label>
                        <input
                            type="text"
                            id="employee-id"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            placeholder="Enter your employee ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-login">Log In</button>
                    </div>
                </form>
                <div className="back-to-user-login">
                    <p className="user-login-message">Are you a user instead?</p>
                    <button onClick={handleUserLoginRedirect} className="btn-user-login">
                        User Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export { EmployeeLogin };

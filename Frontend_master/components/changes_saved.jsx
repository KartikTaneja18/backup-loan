import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/changes_saved.css';
// routing done
export function ChangesSaved() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/loan_dashboard'); // Routing to LoanDashboard (JSX file)
  };

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Your Changes Have Been Saved!</h1>
      <p className="confirmation-message">Your profile has been successfully updated. You can now go back to your dashboard.</p>
      <div className="form-actions">
        <button className="btn-dashboard" onClick={goToDashboard}>Go to Dashboard</button>
      </div>
    </div>
  );
}

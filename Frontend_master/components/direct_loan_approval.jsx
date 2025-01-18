import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/direct_loan_approval.css'
//routing done

export function LoanApproval() {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/employee_dashboard'); // Routing to LoanManagement (JSX file)
  };

  return (
    <div className="container">
      <div className="icon-success">✔️</div>
      <h1>Congratulations!</h1>
      <p>Your Loan Has Been Approved</p>
      <div className="details">
        <p>Loan Amount: <strong>₹15,000</strong></p>
        <p>Interest Rate: <strong>5.5% per annum</strong></p>
        <p>Repayment Duration: <strong>5 Years</strong></p>
      </div>
      
      <button className="btn" onClick={navigateToDashboard}>
        Back to Dashboard
      </button>
    </div>
  );
}

import React from 'react';
import '../styles/Automatic_loan_approval.css';

const LoanApprovalStatus = () => {
  return (
    <div className="container">
      <div className="icon-success">✔️</div>
      <h1>All Eligible Loans Have Been Approved!</h1>
      <p>All loan applications that met the criteria have been successfully approved.</p>
      <a href="employee_dashboard.html" className="btn">Back to Dashboard</a>
    </div>
  );
};

export {LoanApprovalStatus};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/employee_dashboard.css';
// routing done

export function LoanManagement() {
  const navigate = useNavigate();

  return (
    <div className="loan-management-container">
      <header className="header">
        <h1>LTI Mindtree Employee Loan Management System</h1>
      </header>

      <main className="content">
        <section className="automated-approval">
          <h2>Automated Loan Approval</h2>
          <p>Click the button below to automatically approve eligible loan applications based on system analysis.</p>
          <button className="btn-automate" onClick={() => navigate('/automatic_loan_approval')}>
            Automate Loan Approvals
          </button>
        </section>

        <section className="manual-review">
          <h2>Manual Loan Review</h2>
          <form onSubmit={(e) => { e.preventDefault(); navigate('/manual_loan_review'); }}>
            <div className="form-group">
              <label htmlFor="loan-id">Loan ID <span className="mandatory">*</span></label>
              <input type="text" id="loan-id" name="loan_id" placeholder="Enter Loan ID for manual review" required />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Review Comments <span className="mandatory">*</span></label>
              <textarea id="comments" name="comments" placeholder="Add review comments" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn-review">Submit Review</button>
          </form>
        </section>

        <section className="direct-approval">
          <h2>Direct Loan Approval</h2>
          <form onSubmit={(e) => { e.preventDefault(); navigate('/direct_loan_approval'); }}>
            <div className="form-group">
              <label htmlFor="loan-id">Loan ID <span className="mandatory">*</span></label>
              <input type="text" id="loan-id" name="loan_id" placeholder="Enter Loan ID" required />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Loan Amount <span className="mandatory">*</span></label>
              <input type="number" id="amount" name="amount" placeholder="Enter Loan Amount" required />
            </div>
            <button type="submit" className="btn-approve">Approve Loan</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 LTI Mindtree. All rights reserved.</p>
      </footer>
    </div>
  );
}

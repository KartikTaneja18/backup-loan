import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loan_dashboard.css';
// Routing done

export function LoanDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Loan Application Dashboard</h1>
        <p>Welcome, Mr. Ramesh Sharma. Below is the status of your loan applications.</p>

        <button
          className="edit-profile-button"
          onClick={() => navigate('/profile_update')}
        >
          Edit Profile
        </button>
      </div>

      <div className="info-card">
        <div className="card">
          <h2>Total Loan Amount</h2>
          <p>₹10,00,000</p>
        </div>
        <div className="card">
          <h2>Loan Approved</h2>
          <p>₹8,00,000</p>
        </div>
        <div className="card">
          <h2>Pending Amount</h2>
          <p>₹2,00,000</p>
        </div>
      </div>

      <div className="credit-score-card">
        <h2>Credit Score</h2>
        <p>Your current credit score is <strong>750</strong> out of 900.</p>
      </div>

      <div className="button-container">
        <button
          onClick={() => navigate('/improve_credit_score')}
        >
          Tips to Improve Credit Score
        </button>
        <button
          onClick={() => navigate('/factors_effecting_credit_score')}
        >
          Factors Affecting Credit Score
        </button>

        <button
          onClick={() => navigate('/support_ticket')}
        >
          Raise Support Ticket
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Application Date</th>
              <th>Loan Amount (₹)</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Due Date</th>
              <th>Schedule Automatic Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1001</td>
              <td>01-Jan-2024</td>
              <td>₹5,00,000</td>
              <td style={{ color: 'green' }}>Approved</td>
              <td>Amount disbursed successfully.</td>
              <td>01-Feb-2024</td>
              <td>
                <button
                  onClick={() => navigate('/schedule_payment')}
                >
                  Schedule Payment
                </button>
              </td>
            </tr>
            <tr>
              <td>#1002</td>
              <td>15-Jan-2024</td>
              <td>₹3,00,000</td>
              <td style={{ color: 'green' }}>Approved</td>
              <td>Amount disbursed successfully.</td>
              <td>15-Feb-2024</td>
              <td>
                <button
                  onClick={() => navigate('/schedule_payment')}
                >
                  Schedule Payment
                </button>
              </td>
            </tr>
            <tr>
              <td>#1003</td>
              <td>28-Jan-2024</td>
              <td>₹2,00,000</td>
              <td style={{ color: 'orange' }}>Pending</td>
              <td>Under verification process.</td>
              <td>N/A</td>
              <td>
                <button disabled>Schedule Payment</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

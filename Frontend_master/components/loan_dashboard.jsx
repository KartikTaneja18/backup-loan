import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../styles/loan_dashboard.css';

export function LoanDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loans, setLoans] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [approvedLoanAmount, setApprovedLoanAmount] = useState(0);
  const [pendingLoanAmount, setPendingLoanAmount] = useState(0);

  // Function to generate due date based on tenure
  const generateDueDate = (tenureValue, tenureUnit) => {
    const today = new Date();
    let dueDate = new Date(today);

    if (tenureUnit === "months") {
      dueDate.setMonth(today.getMonth() + tenureValue);
    } else if (tenureUnit === "years") {
      dueDate.setFullYear(today.getFullYear() + tenureValue);
    }

    return dueDate.toLocaleDateString();
  };

  useEffect(() => {
    if (location.state?.loanAmount && location.state?.loanTenure) {
      const newLoanAmount = location.state.loanAmount;
      const tenureValue = location.state.loanTenure;
      const tenureUnit = location.state.loanType === 'minimum' ? 'months' : 'years';

      const newLoan = {
        loanId: String(loans.length + 1).padStart(3, '0'), // Loan ID starting from 001
        amount: newLoanAmount,
        status: "Pending",
        date: new Date().toLocaleDateString(),
        remarks: 'Under verification process.',
        dueDate: generateDueDate(tenureValue, tenureUnit),
      };

      setLoans((prevLoans) => [...prevLoans, newLoan]);
    }
  }, [location.state]); // Only runs when location.state changes

  useEffect(() => {
    // Update total, approved, and pending amounts whenever loans list changes
    const total = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const approved = loans.filter(loan => loan.status === 'Approved')
                          .reduce((sum, loan) => sum + loan.amount, 0);
    const pending = total - approved; // Pending amount = total - approved

    setTotalLoanAmount(total);
    setApprovedLoanAmount(approved);
    setPendingLoanAmount(pending);
  }, [loans]);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Loan Application Dashboard</h1>
        <p>Welcome, Mr. Kartik Taneja. Below is the status of your loan applications.</p>

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
          <p>₹{totalLoanAmount}</p>
        </div>
        <div className="card">
          <h2>Loan Approved</h2>
          <p>₹{approvedLoanAmount}</p>
        </div>
        <div className="card">
          <h2>Pending Amount</h2>
          <p>₹{pendingLoanAmount}</p>
        </div>
      </div>

      <div className="credit-score-card">
        <h2>Credit Score</h2>
        <p>Your current credit score is <strong>--</strong> out of -- .</p>
      </div>

      <div className="button-container">
        <button onClick={() => navigate('/improve_credit_score')}>
          Tips to Improve Credit Score
        </button>
        <button onClick={() => navigate('/factors_effecting_credit_score')}>
          Factors Affecting Credit Score
        </button>
        <button onClick={() => navigate('/support_ticket')}>
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
            {loans.map(loan => (
              <tr key={loan.loanId}>
                <td>{loan.loanId}</td>
                <td>{loan.date}</td>
                <td>₹{loan.amount}</td>
                <td style={{ color: loan.status === 'Approved' ? 'green' : 'orange' }}>
                  {loan.status}
                </td>
                <td>{loan.remarks}</td>
                <td>{loan.dueDate}</td>
                <td>
                  <button
                    onClick={() => navigate('/schedule_payment')}
                    disabled={loan.status === 'Pending'}
                  >
                    Schedule Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

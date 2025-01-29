import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/schedule_payment.css';
//routing done

export function LoanRepaymentSchedule() {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const validateLoanDetails = (e) => {
    e.preventDefault(); // Prevent default form submission

    const repaymentFrequency = document.getElementById("repayment-frequency").value;
    const startDate = document.getElementById("start-date").value;
    
    if (!repaymentFrequency || !startDate) {
      alert("Please fill in all required fields before proceeding with the payment.");
      return false;
    }
    // Add other form processing logic here if needed.
    // After successful validation, navigate to the confirmation page or handle the form submission as needed
    navigate('/payment_has_processed'); // Navigate to payment confirmation page
  };

  return (
    <div className="repayment-container">
      <div className="header">
        <h1>Loan Repayment Schedule</h1>
        <p>Choose a payment method and schedule your loan repayment.</p>
      </div>

      {/* Loan Repayment Details Section */}
      <div className="payment-method">
        <h2>Loan Repayment Details</h2>
        <form id="loan-form">
          <div className="form-group">
            <label htmlFor="repayment-frequency" className="required-field">Repayment Frequency</label>
            <select id="repayment-frequency" name="repayment-frequency" required>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="start-date" className="required-field">Start Date</label>
            <input type="date" id="start-date" name="start-date" required />
          </div>

          <div className="form-group">
            <label htmlFor="additional-comments">Additional Comments</label>
            <textarea id="additional-comments" name="additional-comments" rows="4" placeholder="Any additional comments"></textarea>
          </div>
        </form>
      </div>

      {/* Credit/Debit Card Payment */}
      <div className="payment-method">
        <h2>Credit/Debit Card Payment</h2>
        <form id="card-payment-form" onSubmit={validateLoanDetails}>
          <label htmlFor="card-number" className="required-field">Card Number</label>
          <input type="text" id="card-number" name="card-number" placeholder="Enter your card number" required />
          
          <label htmlFor="expiry-date" className="required-field">Expiry Date</label>
          <input type="month" id="expiry-date" name="expiry-date" required />
          
          <label htmlFor="cvv" className="required-field">CVV</label>
          <input type="text" id="cvv" name="cvv" placeholder="Enter your CVV" required />
          
          <button type="submit">Process Payment</button>
        </form>
      </div>

      {/* UPI Payment */}
      <div className="payment-method">
        <h2>UPI Payment</h2>
        <form id="upi-payment-form" onSubmit={validateLoanDetails}>
          <label htmlFor="upi-id" className="required-field">UPI ID</label>
          <input type="text" id="upi-id" name="upi-id" placeholder="Enter your UPI ID" required />
          
          <label htmlFor="upi-password" className="required-field">UPI Password</label>
          <input type="password" id="upi-password" name="upi-password" placeholder="Enter your UPI password" required />
          
          <button type="submit">Process Payment</button>
        </form>
      </div>

      {/* Net Banking Payment */}
      <div className="payment-method">
        <h2>Net Banking Payment</h2>
        <form id="net-banking-form" onSubmit={validateLoanDetails}>
          <label htmlFor="bank-name" className="required-field">Bank Name</label>
          <input type="text" id="bank-name" name="bank-name" placeholder="Enter your bank name" required />
          
          <label htmlFor="account-number" className="required-field">Account Number</label>
          <input type="text" id="account-number" name="account-number" placeholder="Enter your account number" required />
          
          <label htmlFor="ifsc-code" className="required-field">IFSC Code</label>
          <input type="text" id="ifsc-code" name="ifsc-code" placeholder="Enter your IFSC code" required />
          
          <button type="submit">Process Payment</button>
        </form>
      </div>

      {/* Other Payment Methods */}
      <div className="payment-method">
        <h2>Other Payment Methods</h2>
        <form id="other-payment-form" onSubmit={validateLoanDetails}>
          <label htmlFor="payment-method" className="required-field">Select Payment Method</label>
          <select id="payment-method" name="payment-method" required>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="wallet">Digital Wallet</option>
            <option value="cash">Cash Payment</option>
          </select>
          
          <label htmlFor="payment-details" className="required-field">Payment Details</label>
          <input type="text" id="payment-details" name="payment-details" placeholder="Enter your payment details" required />
          
          <button type="submit">Process Payment</button>
        </form>
      </div>

      <div className="form-actions">
        <button type="button" style={{ backgroundColor: '#f44336', color: 'white' }} onClick={() => navigate('/loan_dashboard')}>
          Cancel
        </button>
      </div>
    </div>
  );
}
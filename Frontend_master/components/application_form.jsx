import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/application_form.css';
// routing done


function LoanApplicationForm() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        navigate('/loan_dashboard'); // Redirects to LoanDashboard component
    };

    return (
        <div className="form-container" id='form_contain'>
            <h1>Loan Application Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="full-name" className="required-label">Full Name</label>
                    <input type="text" id="full-name" name="full_name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="required-label">Email Address</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="phone-number" className="required-label">Phone Number</label>
                    <input type="tel" id="phone-number" name="phone_number" required />
                </div>

                <div className="form-group">
                    <label htmlFor="loan-amount" className="required-label">Loan Amount</label>
                    <input type="number" id="loan-amount" name="loan_amount" required />
                </div>

                <div className="form-group">
                    <label htmlFor="tenure" className="required-label">Loan Tenure (in years)</label>
                    <input type="number" id="tenure" name="loan_tenure" required />
                </div>

                <div className="form-group">
                    <label htmlFor="purpose" className="required-label">Purpose of Loan</label>
                    <textarea id="purpose" name="loan_purpose" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="location" className="required-label">Location</label>
                    <input type="text" id="location" name="location" placeholder="City/Town/Village" required />
                </div>

                <div className="form-group">
                    <label htmlFor="state" className="required-label">State</label>
                    <input type="text" id="state" name="state" required />
                </div>

                <div className="form-group">
                    <label htmlFor="pincode" className="required-label">Pincode</label>
                    <input type="text" id="pincode" name="pincode" pattern="\d{6}" title="Please enter a valid 6-digit pincode" required />
                </div>

                <div className="form-group">
                    <label htmlFor="income-proof" className="required-label">Upload Income Proof</label>
                    <input type="file" id="income-proof" name="income_proof" accept=".pdf,.jpg,.jpeg,.png" required />
                    <small>Accepted documents: Salary Slip, Bank Statement, Income Tax Return (ITR), or Form 16.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="address-proof" className="required-label">Upload Address Proof</label>
                    <input type="file" id="address-proof" name="address_proof" accept=".pdf,.jpg,.jpeg,.png" required />
                    <small>Accepted documents: Aadhaar Card, Utility Bill, Rent Agreement, or Passport.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="id-proof" className="required-label">Upload ID Proof</label>
                    <input type="file" id="id-proof" name="id_proof" accept=".pdf,.jpg,.jpeg,.png" required />
                    <small>Accepted documents: Aadhaar Card, PAN Card, Driving License, or Passport.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="additional-docs">Upload Additional Documents (if any)</label>
                    <input type="file" id="additional-docs" name="additional_documents" accept=".pdf,.jpg,.jpeg,.png" />
                </div>

                <div className="form-group">
                    <button type="submit">Submit Application</button>
                </div>
            </form>
        </div>
    );
}

export { LoanApplicationForm };
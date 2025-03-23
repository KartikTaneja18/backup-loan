import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/application_form.css';

function LoanApplicationForm() {
    const navigate = useNavigate();
    const [loanType, setLoanType] = useState("minimum");
    const [loanAmount, setLoanAmount] = useState("");
    const [tenureType, setTenureType] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [mobileValid, setMobileValid] = useState(false);
    const [purposeOptions, setPurposeOptions] = useState([
        "Medical Emergency", "Home Repair", "Personal Loan"
    ]);
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [formErrors, setFormErrors] = useState({
        loanAmountError: "",
        emailError: "",
        mobileError: ""
    });
    
    const [submitted, setSubmitted] = useState(false); // Track if form is submitted

    //doc upload part
    const [documentVerificationErrors, setDocumentVerificationErrors] = useState({
        incomeProofError: "",
        addressProofError: "",
        idProofError: ""
    });

    const handleLoanTypeChange = (e) => {
        const selectedType = e.target.value;
        setLoanType(selectedType);
        setLoanAmount(""); // Reset input on type change

        if (selectedType === "maximum") {
            setTenureType("years"); // Lock tenure to years
            setPurposeOptions([
                "Business Expansion", "Home Purchase", "Education Loan", "Vehicle Loan", "Personal Loan"
            ]);
        } else {
            setTenureType(""); // Reset for min loan
            setPurposeOptions([
                "Medical Emergency", "Home Repair", "Personal Loan"
            ]);
        }
    };

    const handleLoanAmountChange = (e) => {
        const value = e.target.value;
        setLoanAmount(value);
    };

    const validateEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    const validateMobile = (e) => {
        const mobile = e.target.value;
        setMobile(mobile);
        const mobileRegex = /^[0-9]{10}$/;
        setMobileValid(mobileRegex.test(mobile));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Validation on submit
        let errors = {
            loanAmountError: "",
            emailError: "",
            mobileError: ""
        };

        if (loanType === "minimum" && (loanAmount < 10000 || loanAmount > 100000)) {
            errors.loanAmountError = "For Minimum Loan Amount, enter between ₹10,000 and ₹1,00,000.";
        } else if (loanType === "maximum" && loanAmount <= 100000) {
            errors.loanAmountError = "For Maximum Loan Amount, enter more than ₹1,00,000.";
        }

        if (!emailValid) {
            errors.emailError = "Please enter a valid email address.";
        }

        if (!mobileValid) {
            errors.mobileError = "Please enter a valid 10-digit mobile number.";
        }

        setFormErrors(errors);

        
        //doc upload part
        if (!validateDocuments()) {
            return; // Stop form submission if any document is not government verified
        }

        // If no errors, navigate to the next page
        if (!errors.loanAmountError && !errors.emailError && !errors.mobileError) {
            const tenureNumber = parseInt(document.querySelector('select[name="loan_tenure_number"]').value);  // Get the selected tenure number
            const loanTenureInMonths = tenureType === "months" ? tenureNumber : tenureNumber * 12;  
            const dueDate = calculateDueDate(loanTenureInMonths);  // Get the due date based on the tenure
            navigate('/loan_dashboard', {
                state: {
                    loanAmount: parseInt(loanAmount),
                    loanType: loanType,
                    tenureType,
                    dueDate
                }
            });
        }
    };

    const calculateDueDate = (tenureInMonths) => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + tenureInMonths);
        return currentDate.toISOString().split('T')[0]; // Return the date in YYYY-MM-DD format
    };

    const validateDocuments = () => {
        let documentErrors = { incomeProofError: "", addressProofError: "", idProofError: "" };

        // Call the document verification function for each document
        const isIncomeProofValid = verifyDocument("income-proof", "incomeProofError", documentErrors);
        const isAddressProofValid = verifyDocument("address-proof", "addressProofError", documentErrors);
        const isIdProofValid = verifyDocument("id-proof", "idProofError", documentErrors);

        setDocumentVerificationErrors(documentErrors);

        return isIncomeProofValid && isAddressProofValid && isIdProofValid;
    };

    //doc upload part
    const verifyDocument = (inputId, errorField, errors) => {
        const fileInput = document.getElementById(inputId);
        const file = fileInput.files[0];

        if (!file) {
            errors[errorField] = "This document is required.";
            return false;
        }

        // Call OCR.space API to verify if the document is government-issued
        const formData = new FormData();
        formData.append("apikey", "K81948291788957");
        formData.append("file", file);

        const apiURL = "https://api.ocr.space/parse/image";
        fetch(apiURL, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const parsedText = data.ParsedResults[0]?.ParsedText;
            if (!parsedText || !parsedText.includes("Government")) {
                errors[errorField] = "This document is not government verified.";
            } else {
                errors[errorField] = "";
            }
            setDocumentVerificationErrors({ ...errors });
        })
        .catch(err => {
            console.error("OCR verification failed", err);
            errors[errorField] = "OCR verification failed. Please try again.";
            setDocumentVerificationErrors({ ...errors });
        });

        return !errors[errorField]; // return true if no error is found
    };

    const handleSkip = () => {
        // Directly navigate to the loan dashboard without submitting the form
        navigate('/loan_dashboard');
    };

    return (
        <div className="form-container" id='form_contain'>
            <h1>Loan Application Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="full-name" className="required-label">Full Name</label>
                    <input type="text" id="full-name" name="full_name" placeholder="Full Name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="required-label">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={validateEmail} 
                        required 
                        placeholder="Enter your email address"
                    />
                    {emailValid && <span className="valid-check">✔</span>}
                    {formErrors.emailError && <span className="error-text">{formErrors.emailError}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone-number" className="required-label">Phone Number</label>
                    <input 
                        type="tel" 
                        id="phone-number" 
                        name="phone_number" 
                        value={mobile}
                        onChange={validateMobile} 
                        required 
                        pattern="[0-9]{10}"
                        placeholder="Enter your 10-digit phone number"
                    />
                    {mobileValid && <span className="valid-check">✔</span>}
                    {formErrors.mobileError && <span className="error-text">{formErrors.mobileError}</span>}
                </div>

                {/* Loan Amount Selection */}
                <div className="form-group">
                    <label htmlFor="loan-type" className="required-label">Loan Amount</label>
                    <select id="loan-type" name="loan_type" onChange={handleLoanTypeChange} required>
                        <option value="minimum">Minimum Loan Amount (₹10,000 - ₹1,00,000)</option>
                        <option value="maximum">Maximum Loan Amount (Above ₹1,00,000)</option>
                    </select>
                    <input 
                        type="number" 
                        id="loan-amount" 
                        name="loan_amount" 
                        required 
                        placeholder="Enter loan amount"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                    />
                    {formErrors.loanAmountError && <span className="error-text">{formErrors.loanAmountError}</span>}
                </div>

                {/* Loan Tenure Selection */}
                <div className="form-group">
                    <label htmlFor="tenure-number" className="required-label">Loan Tenure</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <select id="tenure-number" name="loan_tenure_number" required>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        {loanType === "minimum" && (
                            <select 
                                id="tenure-type" 
                                name="loan_tenure_type" 
                                required 
                                onChange={(e) => setTenureType(e.target.value)}
                            >
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                            </select>
                        )}
                        {loanType === "maximum" && (
                            <select id="tenure-type" name="loan_tenure_type" disabled>
                                <option value="years">Years</option>
                            </select>
                        )}
                    </div>
                </div>

                {/* Purpose of Loan Dropdown */}
                <div className="form-group">
                    <label htmlFor="purpose" className="required-label">Purpose of Loan</label>
                    <select id="purpose" name="loan_purpose" required>
                        {purposeOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="location" className="required-label">Location</label>
                    <input type="text" id="location" name="location" placeholder="City/Town/Village" required />
                </div>

                <div className="form-group">
                    <label htmlFor="state" className="required-label">State</label>
                    <input type="text" id="state" name="state" placeholder="State" required />
                </div>

                <div className="form-group">
                    <label htmlFor="pincode" className="required-label">Pincode</label>
                    <input type="text" id="pincode" name="pincode" placeholder="Pincode" pattern="\d{6}" title="Please enter a valid 6-digit pincode" required />
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
                
                <div className="form-group">
                    <button type="button" onClick={handleSkip}>Skip to Dashboard</button>
                </div>
            </form>
        </div>
    );
}

export { LoanApplicationForm };
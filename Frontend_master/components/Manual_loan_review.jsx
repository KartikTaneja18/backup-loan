import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Manual_loan_review.css';
//routing done

function ReviewSubmitted() {
    return (
        <div className="container">
            <div className="icon-success">✔️</div>
            <h1>Your Review Was Successfully Added!</h1>
            <p>Thank you for providing your feedback on the loan.</p>
            <Link to="/employee_dashboard" className="btn">Back to Dashboard</Link>
        </div>
    );
}

export { ReviewSubmitted };

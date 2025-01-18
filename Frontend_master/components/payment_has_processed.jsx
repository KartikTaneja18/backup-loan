import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/payment_has_processed.css';
//routing done

function PaymentScheduled() {
    return (
        <div className="message-container">
            <div className="tick-icon">&#10004;</div> 
            <h1>Payment Scheduled</h1>
            <p>Your payment has been successfully scheduled. Thank you for using our service. You will be notified of further updates.</p>
            <Link to="/loan_dashboard" className="button">Go to Dashboard</Link>
        </div>
    );
}

export { PaymentScheduled };

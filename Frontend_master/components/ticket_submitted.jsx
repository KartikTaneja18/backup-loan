import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/ticket_submitted.css';
//routing done

export function TicketSubmitted() {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    return (
        <div className="confirmation-container">
            <h1 className="confirmation-title">Ticket Submitted Successfully!</h1>
            <p className="confirmation-message">
                Your support ticket has been successfully submitted. Our team will get back to you shortly.
            </p>
            <button
                className="btn-dashboard"
                onClick={() => navigate('/loan_dashboard')} // Navigate to the loan dashboard
            >
                Go to Dashboard
            </button>
        </div>
    );
}

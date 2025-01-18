import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/support_ticket.css';
//routing done

export function SupportTicket() {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        const ticketSubject = document.getElementById("ticket-subject").value;
        const ticketDescription = document.getElementById("ticket-description").value;
        const contactEmail = document.getElementById("contact-email").value;
        
        // Validation could be added here if necessary.
        if (!ticketSubject || !ticketDescription || !contactEmail) {
            alert("Please fill in all required fields before submitting.");
            return;
        }

        // After form validation, navigate to the ticket submission confirmation page
        navigate('/ticket_submitted'); // Navigate to the ticket submission confirmation page
    };

    return (
        <div className="ticket-container">
            <h1 className="page-title">Raise Support Ticket</h1>
            <p className="page-description">Fill in the details below to raise a support ticket</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ticket-subject" className="required-label">Ticket Subject</label>
                    <input type="text" id="ticket-subject" name="ticket-subject" placeholder="Enter the subject of your issue" required />
                </div>

                <div className="form-group">
                    <label htmlFor="ticket-description" className="required-label">Ticket Description</label>
                    <textarea id="ticket-description" name="ticket-description" rows="6" placeholder="Describe your issue in detail" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="contact-email" className="required-label">Email Address</label>
                    <input type="email" id="contact-email" name="contact-email" placeholder="Enter your email address" required />
                </div>

                <div className="form-group">
                    <label htmlFor="ticket-attachment">Attach Files (Optional)</label>
                    <input type="file" id="ticket-attachment" name="ticket-attachment" accept="image/*, .pdf, .doc, .docx, .txt" />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit">Submit Ticket</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate('/loan_dashboard')}>Cancel</button>
                    <button type="button" className="btn-live-chat" onClick={() => navigate('/live_chat')}>Live Chat</button>
                </div>
            </form>
        </div>
    );
}

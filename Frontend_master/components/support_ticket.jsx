import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../styles/support_ticket.css";

export function SupportTicket() {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const validateEmail = (email) => {
        // Regular expression for validating an email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const ticketSubject = document.getElementById("ticket-subject").value;
        const ticketDescription = document.getElementById("ticket-description").value;
        const contactEmail = document.getElementById("contact-email").value;

        if (!ticketSubject || !ticketDescription || !contactEmail) {
            alert("Please fill in all required fields before submitting.");
            return;
        }

        if (!validateEmail(contactEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        const ticketData = {
            subject: ticketSubject,
            description: ticketDescription,
            userEmail: contactEmail,
        };

        try {
            const response = await fetch("http://localhost:5000/api/submit-ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ticketData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Ticket submitted successfully! Admin has been notified.");
                navigate('/ticket_submitted');
            } else {
                alert("Failed to submit ticket. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting ticket:", error);
            alert("An error occurred. Please try again later.");
        }
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

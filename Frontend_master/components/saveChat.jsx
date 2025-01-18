import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/saveChat.css';
//routing done

export function ChatSaved() {
    return (
        <div className="confirmation-container">
            <h1 className="confirmation-title">Live Chat Saved</h1>
            <p className="confirmation-message">Your live chat has been saved successfully. You can now return to the dashboard.</p>
            <Link to="/loan_dashboard" className="btn-dashboard">Go to Dashboard</Link> {/* Use Link to route to the dashboard */}
        </div>
    );
}

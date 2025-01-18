import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router DOM
import '../styles/live_chat.css';
//routing done

function LiveChat () {
    const [chatMessages, setChatMessages] = useState([
        { sender: 'Support Agent', message: 'Hello! How can I assist you today with your loan application?' },
    ]);
    const [userMessage, setUserMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    
    const navigate = useNavigate(); // Initialize navigate hook

    const handleSendMessage = () => {
        if (userMessage.trim()) {
            setChatMessages([
                ...chatMessages,
                { sender: 'You', message: userMessage },
            ]);
            setUserMessage('');
            setStatusMessage('Sending message...');

            setTimeout(() => {
                setChatMessages([
                    ...chatMessages,
                    { sender: 'You', message: userMessage },
                    { sender: 'Support Agent', message: 'Thank you for reaching out! How can I help you further?' },
                ]);
                setStatusMessage('Support Agent is typing...');
            }, 1500);
        }
    };

    const handleEndChat = () => {
        const confirmEnd = window.confirm('Are you sure you want to end the chat and return to the dashboard?');
        if (confirmEnd) {
            navigate('/loan_dashboard'); // Use navigate for routing to the Loan Dashboard page
        }
    };

    const handleSaveChat = () => {
        let chatContent = '';
        chatMessages.forEach((message) => {
            chatContent += `${message.sender}: ${message.message}\n`;
        });

        sessionStorage.setItem('savedChat', chatContent);
        navigate('/saveChat'); // Use navigate for routing to the Save Chat page
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Live Chat - Customer Support</h1>
            </div>

            <div className="chat-box" id="chat-box">
                {chatMessages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <span>{message.sender}:</span> {message.message}
                    </div>
                ))}
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    id="chat-input"
                    className="chat-input"
                    placeholder="Type your message..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                <button id="send-button" className="send-button" onClick={handleSendMessage}>
                    Send
                </button>
            </div>

            <div className="status-message" id="status-message">
                {statusMessage}
            </div>

            <div className="action-buttons">
                <button className="close-chat-button" onClick={handleEndChat}>
                    Close Chat
                </button>
                <button className="save-chat-button" onClick={handleSaveChat}>
                    Save Chat
                </button>
            </div>
        </div>
    );
};

export { LiveChat };

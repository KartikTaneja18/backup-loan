import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import '../styles/live_chat.css';

// Initialize socket outside component to avoid multiple connections
const socket = io("http://localhost:3000");

function LiveChat() {
    const [chatMessages, setChatMessages] = useState([
        { sender: 'Support Agent', message: 'Hey! How can I assist you with your loan application?' },
    ]);
    const [userMessage, setUserMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for messages from backend
        socket.on("receive_message", (data) => {
            setChatMessages((prevMessages) => [...prevMessages, { sender: data.sender, message: data.message }]);
            setStatusMessage(''); // Clear typing status
        });

        // Listen for "Support Agent is typing..."
        socket.on("agent_typing", () => {
            setStatusMessage("Support Agent is typing...");
        });

        // Cleanup on unmount
        return () => {
            socket.off("receive_message");
            socket.off("agent_typing");
        };
    }, []);

    const handleSendMessage = () => {
        if (userMessage.trim()) {
            // Add user message to chat
            setChatMessages((prevMessages) => [...prevMessages, { sender: 'You', message: userMessage }]);

            // Emit message to backend
            socket.emit("send_message", { message: userMessage });

            // Clear input field after sending
            setUserMessage('');
        }
    };

    const handleEndChat = () => {
        if (window.confirm('Are you sure you want to end the chat and return to the dashboard?')) {
            navigate('/loan_dashboard');
        }
    };

    const handleSaveChat = () => {
        const chatContent = chatMessages.map(msg => `${msg.sender}: ${msg.message}`).join("\n");
        sessionStorage.setItem('savedChat', chatContent);
        navigate('/saveChat');
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
                    onChange={(e) => {
                        setUserMessage(e.target.value);
                        socket.emit("user_typing"); // Notify backend when user types
                    }}
                    onFocus={() => setUserMessage('')} 
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
}

export { LiveChat };

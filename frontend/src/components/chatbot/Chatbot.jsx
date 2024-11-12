import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm here to assist you with any job-related inquiries on SkillSetGo." }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Use the environment variable for the port
    const apiPort = import.meta.env.PORT || 8000; // Use VITE_PORT from the environment or default to 8000
    const apiUrl = `http://localhost:${apiPort}/api/v1/chatbot/ask`;

    const sendMessage = async () => {
        if (!userInput) return;
        setMessages([...messages, { role: 'user', text: userInput }]);
        setUserInput('');

        try {
            const response = await axios.post(apiUrl, {
                message: userInput,
            });

            // Add bot response to messages
            setMessages([
                ...messages,
                { role: 'user', text: userInput },
                { role: 'bot', text: response.data.response }, // This is where the HTML content is received
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div
                className="chat-icon"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#00796b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    zIndex: 1000,
                }}
            >
                💬
            </div>
            {isOpen && (
                <div
                    className="chat-window"
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '20px',
                        width: '300px',
                        maxHeight: '400px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                    }}
                >
                    <div style={{ overflowY: 'auto', flex: 1, marginBottom: '10px' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', marginBottom: '5px' }}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        padding: '8px',
                                        borderRadius: '10px',
                                        backgroundColor: msg.role === 'user' ? '#e0e0e0' : '#f9f9f9',
                                        color: msg.role === 'user' ? '#333' : '#555',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: msg.text }} // Safely render HTML from bot response
                                />
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your question..."
                        style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            marginBottom: '5px',
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={sendMessage} style={{
                            padding: '8px',
                            backgroundColor: '#00796b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}>
                            Send
                        </button>
                        <button onClick={() => setIsOpen(false)} style={{
                            padding: '8px',
                            backgroundColor: '#ccc',
                            color: '#333',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

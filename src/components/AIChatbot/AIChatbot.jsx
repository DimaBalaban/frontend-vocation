import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/chat/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversation_id: Date.now().toString()
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, { 
                    text: 'Sorry, I encountered an error. Please try again.', 
                    sender: 'bot' 
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { 
                text: 'Sorry, I encountered an error. Please try again.', 
                sender: 'bot' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h3>Vacation Assistant</h3>
            </div>
            <div className="chatbot-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="message bot">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about vacations..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default AIChatbot; 
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
        console.log('User message:', userMessage);
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setIsLoading(true);

        const message = userMessage.toLowerCase();
        console.log('Lowercase message:', message);

        try {
            if (message.includes('погод') || message.includes('weather')) {
                console.log('Weather condition triggered');
                // Просто берем текст после "в"
                const parts = userMessage.split('в');
                if (parts.length > 1) {
                    const location = parts[1].trim();
                    
                    const response = await fetch('http://127.0.0.1:8000/api/weather', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            country: location,
                            month: 'current'
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    console.log('Weather API Response:', data);
                    
                    if (data.source) {
                        setMessages(prev => [...prev, { 
                            text: <a href={data.source} target="_blank" rel="noopener noreferrer">Погода в {location}</a>, 
                            sender: 'bot' 
                        }]);
                    } else {
                        setMessages(prev => [...prev, { text: 'Извините, не удалось получить информацию о погоде.', sender: 'bot' }]);
                    }
                } else {
                    setMessages(prev => [...prev, { 
                        text: 'Пожалуйста, укажите страну. Например: "Какая погода в Париже?"', 
                        sender: 'bot' 
                    }]);
                }
            }
            else if (message.includes('отел') || message.includes('hotel')) {
                console.log('Hotel condition triggered');
                // Просто берем текст после "в"
                const parts = userMessage.split('в');
                console.log('Split parts:', parts);
                if (parts.length > 1) {
                    const location = parts[1].trim();
                    console.log('Location extracted:', location);
                    
                    const response = await fetch('http://127.0.0.1:8000/api/hotels', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            country: 'Франция', // Устанавливаем страну по умолчанию для Парижа
                            city: location,
                            check_in: '2024-03-20',
                            check_out: '2024-03-27',
                            guests: 2
                        })
                    });
                    
                    console.log('API Response status:', response.status);
                    
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('API Error details:', errorData);
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    console.log('Hotels API Response:', data);
                    
                    if (data.search_url) {
                        setMessages(prev => [...prev, { 
                            text: <div>
                                <p>{data.message}</p>
                                <a href={data.search_url} target="_blank" rel="noopener noreferrer">
                                    Перейти к поиску отелей
                                </a>
                            </div>, 
                            sender: 'bot' 
                        }]);
                    } else {
                        setMessages(prev => [...prev, { text: 'Извините, не удалось найти отели.', sender: 'bot' }]);
                    }
                } else {
                    console.log('No location found in message');
                    setMessages(prev => [...prev, { 
                        text: 'Пожалуйста, укажите город. Например: "Найди отели в Париже"', 
                        sender: 'bot' 
                    }]);
                }
            }
            else if (message.includes('достопримечательн') || message.includes('attraction')) {
                console.log('Attractions condition triggered');
                // Просто берем текст после "в"
                const parts = userMessage.split('в');
                console.log('Split parts:', parts);
                if (parts.length > 1) {
                    const location = parts[1].trim();
                    console.log('Location extracted:', location);
                    
                    const response = await fetch('http://127.0.0.1:8000/api/attractions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            country: location
                        })
                    });
                    
                    console.log('API Response status:', response.status);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    console.log('Attractions API Response:', data);
                    
                    if (data.source) {
                        setMessages(prev => [...prev, { 
                            text: <a href={data.source} target="_blank" rel="noopener noreferrer">Достопримечательности в {location}</a>, 
                            sender: 'bot' 
                        }]);
                    } else {
                        setMessages(prev => [...prev, { text: 'Извините, не удалось найти достопримечательности.', sender: 'bot' }]);
                    }
                } else {
                    console.log('No location found in message');
                    setMessages(prev => [...prev, { 
                        text: 'Пожалуйста, укажите страну. Например: "Какие достопримечательности во Франции?"', 
                        sender: 'bot' 
                    }]);
                }
            }
            else {
                console.log('No matching condition found');
                setMessages(prev => [...prev, { 
                    text: 'Я могу помочь вам с информацией о:\n1. Погоде (например: "Какая погода в Париже?")\n2. Отелях (например: "Найди отели в Париже")\n3. Достопримечательностях (например: "Какие достопримечательности во Франции?")', 
                    sender: 'bot' 
                }]);
            }
        } catch (error) {
            console.error('API Error:', error);
            setMessages(prev => [...prev, { 
                text: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.', 
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
                    placeholder="Спросите о погоде, отелях или достопримечательностях..."
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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VacationRules.css';

const VacationRules = () => {
    const navigate = useNavigate();

    const rules = [
        {
            title: "Booking and Payment",
            items: [
                "All bookings must be made at least 14 days in advance",
                "Full payment is required at the time of booking",
                "Cancellations made within 7 days of departure are non-refundable"
            ]
        },
        {
            title: "Travel Documents",
            items: [
                "Valid passport required (minimum 6 months validity)",
                "Visa requirements vary by destination",
                "Travel insurance is mandatory"
            ]
        },
        {
            title: "Health and Safety",
            items: [
                "Follow all local health guidelines and regulations",
                "Carry necessary medications and prescriptions",
                "Emergency contact information must be provided"
            ]
        },
        {
            title: "Accommodation",
            items: [
                "Check-in time is 3:00 PM",
                "Check-out time is 11:00 AM",
                "Early check-in/late check-out subject to availability"
            ]
        },
        {
            title: "General Rules",
            items: [
                "Respect local customs and traditions",
                "Follow environmental protection guidelines",
                "No smoking in non-designated areas"
            ]
        }
    ];

    return (
        <div className="rules-container">
            <h1>Vacation Rules and Guidelines</h1>
            <div className="rules-content">
                {rules.map((section, index) => (
                    <div key={index} className="rules-section">
                        <h2>{section.title}</h2>
                        <ul>
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back to Previous Page
            </button>
        </div>
    );
};

export default VacationRules; 
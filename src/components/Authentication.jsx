import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Auth.css";

const Authentication = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}),
            });

            const text = await response.text();
            console.log("Server response:", text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert("Error registration. Server returned invalid response.");
                return;
            }

            if (response.ok) {
                alert("Registration successful!");

                if (data.user && data.user.id) {
                    localStorage.setItem("user_id", data.user.id);
                }

                navigate("/HomePage");
            } else {
                alert(data.errors ? JSON.stringify(data.errors) : "Error registration");
            }
        } catch (error) {
            console.error("Error registration:", error);
            alert("Error registration. Check connection to server.");
        }
    };

    return (
        <div className="auth_container">
            <h2 className="auth_regi">Registration</h2>
            <form onSubmit={handleSubmit} className="auth_form">
                <div className="auth_auth_input">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="ayth_auth_input_view"
                    />
                </div>
                <div className="auth_auth_input">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="ayth_auth_input_view"
                    />
                </div>
                <div className="auth_auth_input">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="ayth_auth_input_view"
                    />
                </div>
                <button type="submit" className="auth_button">Registration</button>
            </form>
        </div>
    );
};

export default Authentication;




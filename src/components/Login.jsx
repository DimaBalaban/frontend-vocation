import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';
import {toast} from "react-toastify";
import {TableContainer} from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                if (data.user.role === "admin") {
                    navigate("/AdminPage");
                } else {
                    navigate("/HomePage");
                }
            } else {
                // alert(data.message || "Login failed");
                toast.warning(data.message || "Login failed", {
                    style: {
                        width: '400px',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        height: 'auto',
                        fontSize: '18px',
                    },
                    progressStyle: {
                        height: '4px',
                        borderRadius: '0 0 8px 8px',
                    },
                    position: "top-left",
                    autoClose: 6000,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            // alert("Something went wrong. Please try again.");
            toast.error("Something went wrong. Please try again.", {
                style: {
                    width: '400px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    height: 'auto',
                    fontSize: '18px',
                },
                progressStyle: {
                    height: '4px',
                    borderRadius: '0 0 8px 8px',
                },
                position: "top-right",
                autoClose: 6000,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="login_container">
            <h2 className="login_login">LOGIN</h2>
            <form onSubmit={handleSubmit} className="login_form">
                <div className="login_login_input">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login_login_input_view"
                    />
                </div>
                <div className="login_login_input">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login_login_input_view"
                    />
                </div>
                <button type="submit" className="login_button">LOGIN</button>
            </form>
            <p className="login_auth">Don't have registration?
                <Link to="/Authentication">Register here</Link>
            </p>
            <TableContainer/>
        </div>
    );
};

export default Login;





import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import Authentication from "../components/Authentication";
import "../index.css";
import AdminPage from "./AdminPage";
import VacationRules from "./VacationRules";
import AIChatbot from "./AIChatbot/AIChatbot";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
    return (
        <Router>
            <div>
                <h1>Sale Website</h1>
                <div className="page_content">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/HomePage" element={<HomePage/>}/>
                        <Route path="/AdminPage" element={<AdminPage/>}/>
                        <Route path="/Authentication" element={<Authentication/>}/>
                        <Route path="/vacation-rules" element={<VacationRules/>}/>
                    </Routes>
                    <ToastContainer/>
                </div>
                <AIChatbot />
            </div>
        </Router>
    )
}

export default App;
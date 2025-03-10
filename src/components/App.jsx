import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import Authentication from "../components/Authentication";
import "../index.css";
import AdminPage from "./AdminPage";


const App = () => {
    return (
        <Router>
            <div>
                <h1>Sale Website</h1>
                {/*<nav>*/}
                {/*    <Link to="/HomePage">Home</Link>*/}
                {/*    <Link to="/">Login</Link>*/}
                {/*    <Link to="/authentication">Register</Link>*/}
                {/*</nav>*/}

                <div className="page_content">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/HomePage" element={<HomePage/>}/>
                        <Route path="/AdminPage" element={<AdminPage/>}/>
                        <Route path="/Authentication" element={<Authentication/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App;
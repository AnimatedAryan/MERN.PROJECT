// src/components/Login.js
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assuming login function updates authentication state
            const response = await login(username, password);
    
            if (response?.token) {  // Ensure response contains a token
                // Update auth state to reflect logged-in status
                setAuth({ loggedIn: true, token: response.token, role: response.role });

            }
        } catch (err) {
            console.error("Login Error:", err); // Log the error for debugging
        }
    };
    
    useEffect(() => {
        if (auth?.loggedIn) {
            navigate("/Dashboard");
        }
    }, [auth?.loggedIn, navigate]);

    return (
        <div className="login">
        <div>
                <Navbar />
        </div>
        <div className="login-container">
             
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
     </div>
    );
};

export default Login;

// src/components/Register.js
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Navbar from "./Navbar";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role,setrole]=useState("user")
    const { register, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username,email,password,role);
            alert("User registered");
        } catch (err){
            alert(err);
            
        }
    };
    useEffect(() => {
        if (auth?.loggedIn) {
            navigate("/Dashboard");
        }
    }, [auth?.loggedIn, navigate]);

    return (
        <div className="Register">
            <div>
                <Navbar />
            </div>
        <div className="register-container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    </div>
    );
};

export default Register;

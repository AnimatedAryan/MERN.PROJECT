// src/components/LogoutButton.js
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./LogoutButton.css"; // Import CSS file for styling

const LogoutButton = () => {
    const { setAuth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setAuth(null);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;

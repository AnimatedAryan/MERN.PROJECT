// src/components/Admin.js
import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css"; // Import CSS file for styling

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://backend.algouni.online/api/users", { withCredentials: true });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="admin-container">
            <h1>All Users</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Post Count</th>
                        <th>Account Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.postCount}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;

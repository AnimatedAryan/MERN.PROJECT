// src/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const BASE_URL = "http://localhost:5000";
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        return token ? { loggedIn: true, token, role } : null;
    });

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/post/all", { withCredentials: true });
                setPosts(response.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, []);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/profile", { withCredentials: true });
                setAuth({ loggedIn: true, token: response.data.token, role: response.data.role });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
            } catch (err) {
                setAuth(null);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
            }
        };

        checkAuth();
    }, []);
    const createPost = async (title, content) => {
        try {
            const response = await axios.post("http://localhost:5000/api/post/create", { title, content }, { withCredentials: true });
            setPosts([...posts, response.data]);
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { username, password }, { withCredentials: true });
            setAuth({ loggedIn: true, token: response.data.token, role: response.data.role });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    const register = async (username,email,password,role) => {
        await axios.post(`${BASE_URL}/api/auth/register`, { username,email, password,role });
    };

    const logout = async () => {
        await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
        setAuth(false);
    };

    return <AuthContext.Provider value={{ auth, setAuth, login, register, logout, createPost, posts }}>{children}</AuthContext.Provider>;
};

// src/components/CreatePost.js
import { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./CreatePost.css"; // Import CSS file for styling
import LogoutButton from "./LogoutButton";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { auth, createPost } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost(title, content);
        setTitle("");
        setContent("");
    };

    if (!auth || auth.role !== "user") {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <div className="create-post-container">
                <h1>Create a New Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <br />
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <br />
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
                    </div>
                    <button type="submit">Create Post</button>
                </form>
            </div>
            <div className="back-link">
                <Link to="/">Back to All Posts</Link>
            </div>
            <LogoutButton />
        </div>
    );
};

export default CreatePost;

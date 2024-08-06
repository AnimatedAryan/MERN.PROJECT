import React, { useState } from 'react';
import './Loginform.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';

const Loginform = () => {
  const [action, setAction] = useState('');
  const registerLink = () => setAction('active');
  const loginLink = () => setAction('');
  const [passwordVis, setPasswordVis] = useState(true);
  const togglePassword = () => setPasswordVis(!passwordVis);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {

      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("login Payload:",{email,password});
      const response = await axios.post("http://localhost:5000/api/auth/register", { username, email, password });
      console.log(response.data);
    
    } catch (error) {
      console.error(error);
  
    }
  };

  return (
    <div className={`wrapper ${action}`}>
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input type={passwordVis ? "password" : "text"} placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" id='login-remember-me' />Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
          </div>
        </form>
      </div>
      <div className="form-box register">
        <form onSubmit={handleSignup}>
          <h1>SignUp</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' required onChange={(e) => setUsername(e.target.value)} />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
            <MdEmail className='icon' />
          </div>
          <div className="input-box">
            <input type={passwordVis ? "password" : "text"} placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" onChange={togglePassword} />Show Password
            </label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" id='signup-agree' />I agree to the terms & conditions
            </label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;

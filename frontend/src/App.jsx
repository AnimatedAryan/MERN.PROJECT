// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Problempage from "./components/Problempage";
import 'highlight.js/styles/default.css';
import Compilerpage from "./components/Compilerpage";
import PrivateRoute from "./components/Privateroute";
import './App.css';
import "./index.css";
import Submissionspage from "./components/Submissionspage";
const App = () => (
  <AuthProvider>
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={
                  <PrivateRoute>
                      <Dashboard />
                  </PrivateRoute>
              } />
              <Route path="/problems" element={
                  <PrivateRoute>
                      <Problempage />
                  </PrivateRoute>
              } />
              <Route path="/compiler/:problemId" element={
                  <PrivateRoute>
                      <Compilerpage />
                  </PrivateRoute>
              } />
              <Route path="/submissions" element={
                  <PrivateRoute>
                      <Submissionspage />
                  </PrivateRoute>
              } />
          </Routes>
      </Router>
  </AuthProvider>
);

export default App;
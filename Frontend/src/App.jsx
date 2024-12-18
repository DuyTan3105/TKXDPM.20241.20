import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import './App.css';
import Home from "./pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
            <Route path="/" element = {<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route path="/" element = {<Homepage />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

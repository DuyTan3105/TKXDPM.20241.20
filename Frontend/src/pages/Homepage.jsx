import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Homepage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user?.name || "User"}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Homepage;

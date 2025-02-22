import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateLayout = ({ children }) => {
  // const { user } = React.useContext(AuthContext);
  // return user ? children : <Navigate to="/login" />;
  <div>
    <Header />
    <div >
      <Outlet />
    </div>
  </div>;
};

export default PrivateLayout;

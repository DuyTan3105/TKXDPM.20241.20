import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { removeItemFromLocalStorage } from "../utils";
import AIMSLogo from '../assets/AIMSLogo.png';
import trollyIcon from '../assets/trolley.png'
const HeaderContainer = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2.5rem;
  }

  .menu {
    display: flex;
    align-items: center;
  }

  .cart {
    display: flex;
    align-items: center;
    background-color: #e5e7eb; /* Tailwind bg-gray-200 */
    border-radius: 1rem; /* Tailwind rounded-2xl */
    padding: 0.5rem 1rem; /* Tailwind px-4 py-2 */
    column-gap: 0.5rem; /* Tailwind gap-x-2 */
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem; /* Tailwind mb-4 */
    padding: 0 2.5rem; /* Tailwind px-10 */

    button {
      border: 2px solid;
      border-radius: 1rem; /* Tailwind rounded-2xl */
      padding: 0.5rem 1rem; /* Tailwind px-4 py-2 */
      margin-right: 0.5rem; /* Tailwind mr-2 */
    }
  }
`;

const HeaderButton = styled.button`
  margin-right: 1rem; /* Tailwind mr-4 */
  border: 1px solid;
  padding: 0.5rem 1rem; /* Tailwind p-2 */
  border-radius: 0.75rem; /* Tailwind rounded-xl */
  display: flex;
  align-items: center;
  font-weight: bold;

  span {
    margin-left: 0.5rem; /* Tailwind ml-2 */
  }
`;

const CartCount = styled.div`
  color: #dc2626; /* Tailwind text-red-600 */
  margin-left: 0.5rem; /* Tailwind ml-2 */
`;

const Header = () => {
  const { item } = useContext(CartContext);
  const { isAuthen, setIsAuthen } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthen(false);
    removeItemFromLocalStorage("userId");
    removeItemFromLocalStorage("isAuthen");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <HeaderContainer>
      <header>
        <Link to="/">
          <HeaderButton>
            {/* <span role="img" aria-label="home">
              🏠
            </span> */}
             <img width={50} src={AIMSLogo} alt="logo" style={{ border: 'none', outline: 'none' }}/>
            <span>AIMS</span>
          </HeaderButton>
        </Link>

        <div className="menu">
          <HeaderButton>About</HeaderButton>
          <HeaderButton>Shop</HeaderButton>
          <HeaderButton>Help</HeaderButton>

          {isAuthen === "admin" ? (
            <Link to="/admin">
              <HeaderButton>Dashboard</HeaderButton>
            </Link>
          ) : isAuthen === "product_manager" ? (
            <>
              <Link to="/product">
                <HeaderButton>Product</HeaderButton>
              </Link>
              <Link to="/order">
                <HeaderButton>Order History</HeaderButton>
              </Link>
            </>
          ) : (
            <Link to="login">
              <HeaderButton>Login</HeaderButton>
            </Link>
          )}

          <Link to="/cart">
            <div className="cart">
              <button style={{border: 'none', outline: 'none'}}>
                {/* <span role="img" aria-label="cart">
                  🛒
                </span> */}
                <img width={20} src={trollyIcon} alt="logo" style={{ border: 'none', outline: 'none' }}/>
              </button>
              <>
                <div>Your cart</div>
                <CartCount>({item?.length ? item.length : 0})</CartCount>
              </>
            </div>
          </Link>
        </div>
      </header>

      {isAuthen && (
        <div className="actions">
          <Link to="change-password">
            <button>Change password</button>
          </Link>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </HeaderContainer>
  );
};

export default Header;

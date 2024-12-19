import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import styled from "styled-components";
import { setItemsInLocalStorage } from "../utils";
import { loginApi } from "../services/userApi";
import { Roles } from "../utils/enums";


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi({ username: userName, password: password, role: Roles.PRODUCT_MANAGER });
      if(res.code == 200) {
        toast.success("Logged in successfully");
        navigate("/product");
        setItemsInLocalStorage("user", res.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign in to your account</Title>
        <StyledForm onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="text"
              type="text"
              autoComplete="text"
              required
              placeholder="Email address"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <AdminLink to="/admin/login">Login as admin</AdminLink>
          <SubmitButton type="submit">Sign in</SubmitButton>
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 3rem 1rem;
`;

const FormWrapper = styled.div`
  max-width: 24rem;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: #1f2937;
`;

const StyledForm = styled.form`
  margin-top: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;

  input {
    appearance: none;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #111827;
    margin-bottom: 0.5rem;
    &:focus {
      outline: none;
      ring: none;
      border-color: #4f46e5;
    }
  }
`;

const AdminLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  font-size: 0.875rem;
  color: #4f46e5;
  &:hover {
    color: #4338ca;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin-top: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4f46e5;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #4338ca;
  }
`;


export default Login;

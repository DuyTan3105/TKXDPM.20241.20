import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 1rem 0; /* Tailwind py-4 */
  flex: 1; /* Ensures content takes remaining space */
  margin: 0 2rem; /* Tailwind mx-auto */
`;

export default function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
}

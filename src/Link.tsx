import React from "react"; // Import React
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavUnlisted = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

const linkStyle: React.CSSProperties = {
  margin: "1rem",
  textDecoration: "none",
  color: "blue",
};

const Nav = () => {
  return (
    <NavUnlisted>
      <li>
        <Link to="/dossiers" style={linkStyle}>
          Dossiers
        </Link>
      </li>
      <li>
        <Link to="/clients" style={linkStyle}>
          Clients
        </Link>
      </li>
      <li>
        <Link to="/inspecteurs" style={linkStyle}>
          Inspecteurs
        </Link>
      </li>
      <li>
        <Link to="/systeme" style={linkStyle}>
          Système
        </Link>
      </li>
      <li>
        <Link to="/itempage" style={linkStyle}>
          Item
        </Link>
      </li>
    </NavUnlisted>
  );
};

export default Nav;

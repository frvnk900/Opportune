import React from "react";
import { Link } from "react-router-dom";
import logo from "./Icons/logo/opport-logo-small.png";
import "./style.css";

const Welcome = () => {
  return (
    <div className="blurred-background">
      <div className="content">
        <img src={logo} id="img-logo" alt="Logo" />
        <p id="slogan-welcome">where skills meet opportunity.</p>
        <div className="links">
          <ul className="sign-client-card">
            <li>
              <Link to="/client/signup" style={{ textDecoration: 'none' }}>
                <p> Client Sign Up </p>
              </Link>
            </li>
            <li><span>Login back into your client account</span></li>
          </ul>
          <ul className="sign-organisation">
            <li>
              <Link to="/organisation/signup" style={{ textDecoration: 'none' }}>
                <p>Organisation Sign Up</p>
              </Link>
            </li>
            <li><span>Login back into your organisation account</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

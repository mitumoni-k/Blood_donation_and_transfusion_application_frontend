import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MainPage.css";
import logo from "../assets/LoginSignupImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    console.log("Token Cookie : ", tokenCookie);
    setIsLoggedIn(!!tokenCookie);
    console.log("isLoggedIn : ", isLoggedIn);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    window.location.href = "/Login";
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="website-logo-tagline">
          <a href="/"><img src={logo} className="logo" alt="Website Logo" /></a>
          <div className="tagline">
            <div className="leftmost-tagline">Serve a Drop</div>
            <div className="left-tagline">Save a Life</div>
          </div>
        </div>
        <div className="navbar">
          {!isLoggedIn && (
            <>
              <Link to="/Login" className="login">
                Login
              </Link>
              <Link to="/Signup" className="signup">
                Register
                <FontAwesomeIcon icon={faUser} className="register-icon" />
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/Myprofile" className="signup">
                My Profile
                <FontAwesomeIcon icon={faUser} className="register-icon" />
              </Link>
              <button className="signup" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      <hr className="separator" />
    </>
  );
};
export default Navbar;

import React, { useState, useEffect } from "react";
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
      console.log(tokenCookie)
    setIsLoggedIn(!!tokenCookie);
    console.log(isLoggedIn)
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setIsLoggedIn(false)
    window.location.href = '/Login'
  }

  return (
    <>
      <nav className="navbar-container">
        <img src={logo} className="logo" alt="Website Logo" />
        <div className="tagline">

          <div className="leftmost-tagline">Serve a Drop</div>
          <div className="left-tagline">Save a Life</div>
        </div>
        <div className="navbar">
          {!isLoggedIn && (
            <>
              <a href="/Login" className="login">
                Login
              </a>
              <a href="/Signup" className="signup">
                Register
                <FontAwesomeIcon icon={faUser} className="register-icon" />
              </a>
            </>
          )}

          {isLoggedIn && (
            <>
              <a href="/MyProfile" className="signup">
                My Profile
                <FontAwesomeIcon icon={faUser} className="register-icon" />
              </a>
              <button className="signup" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>
      <hr className="separator" />
    </>
  );
};
export default Navbar;

import React, { useState } from "react";
import axios from "axios";
import "../styles/SignupLogin.css";
import imageSrc from "../assets/LoginSignupImg.png";
import { toast , Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = ({fcmToken}) => {
  let navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getTime() + 24 * 60 * 60 * 1000
    );
    const expires = `expires=${expirationDate.toUTCString()}`;
    e.preventDefault();

    console.log({ role, email, registrationId, password });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          role,
          password,
          registrationId,
          fcmToken
        },
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      console.log("Login successful:", response.data);
      // STORE THE TOKEN IN COOKIE
      document.cookie = `token = ${response.data.token}; ${expires}; path=/`;
      successfulLoginPopUp()
    } 
    catch (error) {
      toast.error("Log In Unsuccessful !!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const successfulLoginPopUp = () => {
    toast.success(" Log In Successful!! ", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    })
      setTimeout(() => {
        navigate('/');
      }, 1000);
    
  }

  return (
    <div>
      <div className="background-image"></div>
      <div className="signup-login-container">
        <img src={imageSrc} alt="Error Loading" />
        <h2>Login to your account</h2>
        <h6>
          Don't have an account yet? <a href="/Signup">Signup</a>
        </h6>
        <form onSubmit={handleSubmit} className="signup-login-form">
          <label>
            Role:
            <select value={role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="hospital">Hospital</option>
              <option value="organisation">Organisation</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          {role !== "admin" && (
            <>
              <label>
                {role === "user" ? "Email" : "Unique Registration ID"}:
                <input
                  type="text"
                  value={role === "user" ? email : registrationId}
                  onChange={(e) =>
                    role === "user"
                      ? setEmail(e.target.value)
                      : setRegistrationId(e.target.value)
                  }
                />
              </label>
            </>
          )}
          {role === "admin" && (
            <>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </>
          )}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="signup-login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

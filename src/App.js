import React, { useState, useEffect } from "react";
import MainPage from "./components/MainPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import DonateForm from "./pages/DonateForm";
import RequestForm from "./pages/RequestForm";
import MapSection from "./pages/MapSectionPage";
import MyProfilepage from "./pages/MyProfile";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, Bounce } from "react-toastify";
import { generateToken } from "./notifications/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
import TeamPage from "./pages/TeamPage";
import axios from "axios";
import RequestCivilianPage from "./pages/RequestCivilianPage";

function App() {
  const [token, setToken] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  function getCookieValue(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  //checking if token exists
  useEffect(() => {
    // const tokenCookie = document.cookie
    //   .split(";")
    //   .find((cookie) => cookie.trim().startsWith("token="));
    const token = getCookieValue('token')
    if (token) {
      setIsLoggedIn(true); // Set isLoggedIn to true if token exists
      // const token = tokenCookie.split("=")[1];
      setToken(token); // Extract token value from cookie
      try {
        const decodedToken = jwtDecode(token);
        setDecodedToken(decodedToken)
        const { role } = decodedToken;
        setUserRole(role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // FCM Token generation
  useEffect(() => {
    generateToken().then((FCMtoken) => {
      setFcmToken(FCMtoken);
      // Update FCM token
      if (isLoggedIn) {
        const decodedToken = jwtDecode(token);
        updateFcmToken(decodedToken, fcmToken);
      }
    }, []);

    // store the token in variable
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    });
  }, []);


  const updateFcmToken = async (decodedToken, fcmToken) => {
    const userId = decodedToken.userId || decodedToken.registrationId;
    const role = decodedToken.role;
    try {
      const response = await axios.put("/update-fcm-token", {
        userId,
        fcmToken,
        role,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error updating FCM token:", error.message);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage authorized={isLoggedIn} userRole={userRole} />}
          />

          <Route
            path="/map"
            element={<MapSection authorized={isLoggedIn} userRole={userRole} />}
          />

          <Route path="/myprofile" element={<MyProfilepage />} />

          <Route path="/team" element={<TeamPage />} />
          <Route path="/request" element={<RequestCivilianPage token={token} decodedToken={decodedToken}/>}  />

          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login fcmToken={fcmToken} />
            }
          />

          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate to="/" /> : <SignUp fcmToken={fcmToken} />
            }
          />

          <Route path="/donateform" element={<DonateForm token={token} decodedToken={decodedToken}/>} />

          <Route path="/requestform" element={<RequestForm token={token} decodedToken={decodedToken}/>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;

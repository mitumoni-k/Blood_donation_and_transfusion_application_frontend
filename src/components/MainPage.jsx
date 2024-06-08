
import React from "react";
import Navbar from "./Navbar"
import DonateRequestIcons from "./DonateRequestIcons";
import Information from "./Information";
import Footer from "./Footer";
import "../styles/Parallax.css"
import "../styles/MainPage.css"
import SliderSection from "./SliderSection";
import { ToastContainer , Bounce } from "react-toastify";
import ParallaxBg from "./ParallaxBg";

const MainPage = ({isLoggedIn , userRole}) => {
  return (
 
        <React.Fragment>
            <div className="wrapper">
              <Navbar />
              <ParallaxBg />
            </div>
    
          <ToastContainer
                position="bottom-right"
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
        </React.Fragment>
  );
};

export default MainPage;

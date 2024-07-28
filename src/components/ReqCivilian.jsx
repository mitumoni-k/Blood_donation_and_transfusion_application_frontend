import React, { useState, useEffect } from "react";

import "../styles/DonateRequestForm.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import imageSrc from "../assets/LoginSignupImg.png";
import { toast, Bounce } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const RequestForm = ({token,decodedToken}) => {
  let navigate = useNavigate();
  let stateLocation = useLocation(); // to collect and use the data send from other page , here map page
  // State variables for form inputs
  const [requestedBody, setRequestedBody] = useState("A Civilian");
  const [role, setRole] = useState(" ");
  const [userId, setuserId] = useState(" ");
  const [registrationId, setRegistrationId] = useState("");
  const [location, setLocation] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [bloodUnits, setBloodUnits] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [requestDate, setRequestDate] = useState("");

  useEffect(() => {
      const decodedRole = decodedToken.role;
      const decodedUserId = decodedToken.userId;
      setuserId(decodedUserId);
      setRole(decodedRole)
    // console.log("Location in request : " ,stateLocation.state)
    // if (stateLocation.state && stateLocation.state.hospitalData) {
    //   setBloodType(stateLocation.state.hospitalData.Blood_Type);
    //   setRequestedBody(stateLocation.state.hospitalData.Name)
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      // Add zeros if month or day is less than 10
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      return `${year}-${month}-${day}`;
    };
    try {
      const response = await axios.post(
        "https://blood-donation-transfusion-backend.onrender.com/api/v1/auth/requestcivilian",
        {
          requestedBody,
          role,
          userId,
          registrationId,
          requestDate: formatDate(requestDate),
          location,
          bloodUnits,
          urgencyLevel,
          bloodType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      successfulSubmission();
    } catch (error) {
      console.log(error);
      toast.error("Request failed", {
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
      console.error(
        "Request failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const successfulSubmission = () => {
    navigate("/map", {
      state: { message: `Request sent to all the registered users` },
    });
    setTimeout(() => {
      toast.success(" Data submitted Successful!! ", {
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
    }, 1000);
  };

  return (
    <div className="request-donate-container">
      <div className="request-donate-form-container">
        <img src={imageSrc} alt="Image" className="request-donate-form-img" />
        <h2 className="request-donate-form-title">Blood Request Form</h2>
        <form onSubmit={handleSubmit} className="request-donate-form">
          <div className="field">
            <label className="request-donate-form-label">Blood Type:</label>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
              className="request-donate-form-select"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          {role === "user" && (
            <>
              <div className="field">
                <label className="request-donate-form-label">
                  Blood Units:
                </label>
                <input
                  type="number"
                  value={bloodUnits}
                  onChange={(e) => setBloodUnits(e.target.value)}
                  required
                  className="request-donate-form-input"
                />
              </div>
              <div className="field">
                <label className="request-donate-form-label">
                  Urgency Level:
                </label>
                <select
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(e.target.value)}
                  required
                  className="request-donate-form-select"
                >
                  <option value="">Select Urgency Level</option>
                  <option value="urgent">urgent</option>
                  <option value="not urgent">not urgent</option>
                </select>
              </div>
              <div className="field">
                <label className="request-donate-form-label">Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="request-donate-form-input"
                />
              </div>
              <div className="field">
                <label className="request-donate-form-label">
                  Request Date:
                </label>
                <input
                  type="date"
                  value={requestDate}
                  onChange={(e) => setRequestDate(e.target.value)}
                  required
                  className="request-donate-form-input"
                />
              </div>
            </>
          )}
          {(role === "hospital" || role === "organisation") && (
            <>
              <div className="field">
                <label className="request-donate-form-label">
                  Unique Reg ID:
                </label>
                <input
                  type="text"
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  required
                  className="request-donate-form-input"
                />
              </div>

              <div className="field">
                <label className="request-donate-form-label">Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="request-donate-form-input"
                />
              </div>
              <div className="field">
                <label className="request-donate-form-label">
                  Blood Units:
                </label>
                <input
                  type="number"
                  value={bloodUnits}
                  onChange={(e) => setBloodUnits(e.target.value)}
                  required
                  className="request-donate-form-input"
                />
              </div>
              <div className="field">
                <label className="request-donate-form-label">
                  Urgency Level:
                </label>
                <select
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(e.target.value)}
                  required
                  className="request-donate-form-select"
                >
                  <option value="">Select Urgency Level</option>
                  <option value="urgent">urgent</option>
                  <option value="not urgent">not urgent</option>
                </select>
              </div>
              <div className="field">
                <label className="request-donate-form-label">
                  Request Date:
                </label>
                <input
                  type="date"
                  value={requestDate}
                  onChange={(e) => setRequestDate(e.target.value)}
                  required
                  className="request-donate-form-input"
                />
              </div>
            </>
          )}
          <button type="submit" className="request-donate-form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;

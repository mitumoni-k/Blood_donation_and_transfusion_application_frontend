

import React, { useState, useEffect } from 'react';
import '../styles/DonateRequestForm.css';
import imageSrc from '../assets/LoginSignupImg.png'; 
import { jwtDecode} from 'jwt-decode'; 
import axios from 'axios';
import { toast , Bounce } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';

const DonateForm = ({decodedToken}) => {
  let navigate = useNavigate();
  let stateLocation = useLocation();

  // State variables for form inputs
  const [requestedBody, setRequestedBody] = useState(" ") 
  const [userId, setUserId] = useState('');

  const [role, setRole] = useState('');
  const [Age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [otherHealthIssue, setOtherHealthIssue] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Function to decode token and extract userId
      const decodedRole = decodedToken.role;
      const decodedUserId = decodedToken.userId;
      setUserId(decodedUserId);
      setRole(decodedRole);       
    console.log("Location for donate : " ,stateLocation.state)
    if (stateLocation.state && stateLocation.state.hospitalData) {
      setBloodType(stateLocation.state.hospitalData.Blood_Type);
      setRequestedBody(stateLocation.state.hospitalData.Name)
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
     e.preventDefault(); // Prevent the default form submission

    if (parseInt(Age) >= 60) {
      alert("Age must be less than 60");
      return;
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      
      // Add leading zeros if month or day is less than 10
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      
      return `${year}-${month}-${day}`;
    };
    
    console.log({
      role,
      userId,
      Age,
      weight,
      bloodType,
      lastDonationDate: formatDate(lastDonationDate),
      healthIssues: healthIssues === 'Other' ? otherHealthIssue : healthIssues,
      location
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/donate",
        {
          requestedBody,
          role,
          userId,
          Age,
          weight,
          bloodType,
          lastDonationDate: formatDate(lastDonationDate),
          healthIssues: healthIssues === 'Other' ? otherHealthIssue : healthIssues,
          location
        },
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      successfulSubmission();
    } catch (error) {
      console.log(error);
      console.error(
        "Donate Request failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const successfulSubmission = () => {
    navigate('/map', {state: { message : `Donation details sent to ${stateLocation.state.hospitalData.Name}`} });
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
          })
        }, 1000);
  }

  return (
    <div className='request-donate-container'>
      <div className="request-donate-form-container">
        <img src={imageSrc} alt="Image" className="request-donate-form-img" />
        <h2 className="request-donate-form-title">Blood Donation Form</h2>
        <form onSubmit={handleSubmit} className="request-donate-form">
          <div className="field">
            <label className="request-donate-form-label">
              Donate to :
            </label>
            <div className="hospital-name-on-request-form">{stateLocation.state.hospitalData.Name}</div>
          </div>  
          <div className="field">
            <label className="request-donate-form-label">Blood Type:</label>
            <div className="hospital-name-on-request-form">{stateLocation.state.hospitalData.Blood_Type}</div>
          </div>  
          <div className="field">
            <label className="request-donate-form-label">Age:</label>
            <input type="number" value={Age} onChange={(e) => setAge(e.target.value)} required className="request-donate-form-input" />
          </div>
          <div className="field">
            <label className="request-donate-form-label">Weight (kg):</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required className="request-donate-form-input" />
          </div>
          <div className="field">
            <label className="request-donate-form-label">Last Donation Date:</label>
            <input type="date" value={lastDonationDate} onChange={(e) => setLastDonationDate(e.target.value)} required className="request-donate-form-input" />
          </div>
          <div className="field">
            <label className="request-donate-form-label">Health Issues:</label>
            <select value={healthIssues} onChange={(e) => setHealthIssues(e.target.value)}className="request-donate-form-input">
              <option value="">Select Health Issue (if any)</option>
              <option value="Heart Disease">Heart Disease</option>
              <option value="Diabetes">Diabetes</option>
              <option value="High Blood Pressure">High Blood Pressure</option>
              <option value="Anemia">Anemia</option>
              <option value="HIV/AIDS">HIV/AIDS</option>
              <option value="Hepatitis">Hepatitis</option>
              <option value="Other">Other</option>
            </select>
            {healthIssues === 'Other' && (
              <input type="text" value={otherHealthIssue} onChange={(e) => setOtherHealthIssue(e.target.value)} placeholder="Specify Other Health Issue" className="request-donate-form-input" />
            )}
          </div>
          <div className="field">
            <label className="request-donate-form-label">Preferred Location:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="request-donate-form-input" />
          </div>
          <button type="submit" className="request-donate-form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
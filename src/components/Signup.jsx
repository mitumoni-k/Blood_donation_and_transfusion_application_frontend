import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast , Bounce} from 'react-toastify'
import "../styles/SignupLogin.css"
import imageSrc from '../assets/LoginSignupImg.png'
import { useNavigate } from 'react-router-dom';

const SignUp = ({fcmToken}) => {
  let navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // fetch the current location
  useEffect(() => {
    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          console.log(position.coords.latitude)
          setLongitude(position.coords.longitude);
          console.log(position.coords.longitude)
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    };

    fetchUserLocation();
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
        const currentDate = new Date()
        const expirationDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        const expires = `expires=${expirationDate.toUTCString()}`;
        e.preventDefault();
        
        console.log({Name, email , role, phoneno, password , address , registrationId });
        // Implement API call .and send data
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
              role,
              Name,
              email,
              phoneno,
              registrationId,
              address,
              latitude,
              longitude,
              fcmToken,
              password
            });
            console.log('Signup successful:', response.data);
            // STORE THE TOKEN IN COOKIE
            document.cookie = `token = ${response.data.token}; ${expires}; path=/`;
            // ON SUCCESSFUL REGISTER, NAVIGATE TO HOME PAGE
            successfulRegister()
    
          } catch (error) {
            toast.error('Signup unsuccessful, Try Again!!')
            console.error('Signup failed:', error.response ? error.response.data : error.message);
           
          }
        };
        const successfulRegister = () => {
          toast.success(" Registration Successful!! ", {
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
              navigate('/login');
            }, 1000);
          
        }

  return (
    <div>
      <div className="background-image"></div>
      <div className="signup-login-container">
        <img src={imageSrc} alt="Error Loading" />
        <h2>Signup to create an account</h2>
        <h6>Already have an account? <a href="/Login">Login</a></h6>
        <form onSubmit={handleSubmit} className='signup-login-form'>
          <label>
            Role:
            <select value={role} onChange={handleRoleChange} required>
              <option value="user">User</option>
              <option value="hospital">Hospital</option>
              <option value="organisation">Organisation</option>
            </select>
          </label>
          <label>
            Name:
            <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Phone Number:
            <input type="text" placeholder="Phone number" value={phoneno} onChange={(e) => setPhoneNo(e.target.value)} required />
          </label>
          {(role === 'hospital' || role === 'organisation') && (
            <>
              <label>
                Unique Reg ID:
                <input type="text" value={registrationId} onChange={(e) => setRegistrationId(e.target.value)} required />
              </label>
              <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </label>
            </>
          )}
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button className='signup-login-button' type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
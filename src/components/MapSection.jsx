// In React, the "useRef" hook creates a mutable object that persists throughout the component's lifecycle. When you use useRef with an element in JSX, such as <MapContainer ref={mapRef} />, mapRef.current refers to the actual DOM element of the MapContainer component.

import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker , Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Parallax.css"
import "../styles/MapPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { faMagnifyingGlass , faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import  { toast , Bounce } from 'react-toastify'


const MapSection = ({authorized , userRole}) => {
  let navigate = useNavigate()
  let location = useLocation()
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [bloodType, setBloodType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(15);
  
  const hasShownToast = useRef(false)

  const userMarkerIcon = new L.Icon({
    iconUrl: require("../assets/user_marker.png"),
    iconSize: [60, 60],
  });

  const hospOrgMarkerIcon = new L.Icon({
    iconUrl: require("../assets/Hospital_marker (2).png"),
    iconSize: [60, 55],
  });

  const mapRef = useRef(null);

  // for keeping track of the data sent from request/donate page
  useEffect(() => {
    console.log("Location state in mapPage:", location.state);
    if (!hasShownToast.current && location.state && location.state.message) {
      console.log("Location State in mapPage: ", location.state);
      hasShownToast.current = true;
      setTimeout(() => {
        toast.success(location.state.message, {
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
      }, 1500);
    }
  }, [location.state]);

  useEffect(() => {
    fetchGeolocation();
  },[]);

  const fetchGeolocation = () => {
    const success = (position) => {
      setIsLoadingLocation(false);
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);
    };

    const error = () => {
      setIsLoadingLocation(false);
      console.log("Geolocation failed");
    };

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(success, error);
  };
  useEffect(() => {
    // useLocation[0] gives latitude and userLocation[1] gives longitude
    console.log("My location = ",userLocation);
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, zoomLevel);
      if (bloodType) {
        fetchHospitals(userLocation[0], userLocation[1], bloodType);
      }
    }
  }, [userLocation, bloodType, mapRef,zoomLevel]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchTerm) {
      return;
    }
    try {
      console.log("INTO FETCH FUNCTION");
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&limit=1`
      );
      const data = await response.data;
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setUserLocation([lat, lon]);
        setZoomLevel(16)
        console.log("user location", userLocation);

        if (bloodType) {
          fetchHospitals(lat, lon, bloodType);
        }
      } else {
        toast.error("Location could not be detected", {
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
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleBloodTypeChange = (event) => {
    event.preventDefault()
    setBloodType(event.target.value);
    setSearchResults([]);
  };

  const handleRequest = (hospital) => {
    console.log("Hospital : ",hospital)
    if(!authorized)
    {
      toast.warning("You aren't authenticated to make a request" , {
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
        navigate('/signup');
      }, 1000);
    }
    else
    {  
      navigate('/requestform' , {state : { hospitalData : hospital }}) 
    }
    console.log("Request sent to:", hospital);
  };
  const handleDonate = (hospital , e) => {
    e.preventDefault()
    if(!authorized)
    {
      toast.warning("You aren't authenticated to make a request" , {
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
        navigate('/signup');
      }, 1000);
    }
    else
    {   
      navigate('/donateform' , {state : { hospitalData : hospital }}) 
    }

    console.log("Donation details sent to:", hospital);
  };

  const handleRequestCivilian = () => {
    if(!authorized)
    {
      toast.warning("You aren't authenticated to make a request" , {
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
        navigate('/signup');
      }, 1000);
      
    }
    else 
    {   
      navigate("/request") 
      toast.success(`Request sent to Registered Users`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    })}
    console.log("Request sent to civilian");
  };

  // Function to fetch hospitals
  const fetchHospitals = async (latitude, longitude, bloodType) => {
    try {
      console.log("INTO FETCH HOSPITAL FUNCTION");
      const response = await axios.get(
        `http://localhost:8080/api/v1/auth/mapLocate/${latitude}/${longitude}/${bloodType}`
      );
      const data = await response.data.results;
      console.log(data)
      setSearchResults(data);
      if(data.length > 0)
      {
        setZoomLevel(12);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const sendRequestToHospital = async(hospital) => {
    try 
    {
      toast.success(`Request sent to ${hospital.Name}`,{
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
    }
    catch(error)
    {
      toast.error(`Error sending request to ${hospital.Name}`,{
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
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  // mapRef.current gives you direct access to the Leaflet map instance, allowing you to call Leaflet methods on it directly. For example, you can call Leaflet's flyTo method to programmatically move the map to a specific location and zoom level
  const zoomToALocationOnMap = (marketType, location) => {
    if (mapRef.current) {
      if (marketType === 'user' || marketType === 'hospital') {
        mapRef.current.flyTo(location, 16);
      }
    }
  }

  return (
    <div className="map-page">
      <div className="map-section">
        {isLoadingLocation && <p>Loading Location...</p>}
        {!isLoadingLocation && (
          <MapContainer
            className="map-container"
            center={userLocation || [28.6139, 77.2088]}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            style={{ height: "40rem", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker position={userLocation} icon={userMarkerIcon} 
              eventHandlers
              = {{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
                click: () => zoomToALocationOnMap('user',userLocation)}}>
                <Popup className="marker-popup">I'm here!</Popup>
              </Marker>
            )}
            {searchResults.map((hospital,index) => (
              <Marker position={[hospital.latitude,hospital.longitude]} icon={hospOrgMarkerIcon} eventHandlers
              = {{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
                click: () => zoomToALocationOnMap('hospital',[hospital.latitude,hospital.longitude])
                }}>
                <Popup className="marker-popup">{hospital.Name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
      {/* LOCATION SEARCH , BLOOD TYPE SELECTION - MENU  */}
      <div className="map-search-section">
        <form className="map-search-form">
        <div className="map-search-bar">
          <input type="text"
            placeholder="Search for a location..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" onClick={handleSearchSubmit} className="location-search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
          <select value={bloodType} onChange={handleBloodTypeChange}>
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

        </form>
        {/* FETCHED HOSPITALS DISPLAYED  */}
        <div className="map-search-results">
          {searchResults.length === 0  ? (
            <h1>No nearby Blood Match...</h1>
          ) : (
            searchResults.map((hospital, index) => (
              <div key={index} className="map-search-result bold">
                <p><span>Name :</span> {hospital.Name}</p>
                <p><span>Email :</span> {hospital.email}</p>
                <p><span>Phone no. :</span> {hospital.phoneno}</p>
                <p><span>Address :</span> {hospital.address}</p>
                <p><span>Blood Type :</span> {hospital.Blood_Type}</p>
                <p><span>Blood Id :</span> {hospital.BloodUnitId}</p>
                <p><span>Expiration Date :</span> {formatDate(hospital.Expiration_Date)}</p>
                <button
                  className="map-request-button"
                  onClick={() => handleRequest(hospital)}
                >
                  Request
                </button>
                {userRole === "user" && (
                  <button
                  className="map-donate-button"
                  onClick={(e) => handleDonate(hospital,e)}
                >
                  Donate
                  </button>
                )}
              </div>
            ))
          )}
          {searchResults.length >= 0 && (
            <button
              className="map-request-civilian-button"
              onClick={handleRequestCivilian}
            >
              Request a Civilian?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSection;

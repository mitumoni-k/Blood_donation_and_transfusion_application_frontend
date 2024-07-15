// selectedInventory will basically store the inventory details of that particular row from inventory details table which is being selected for update , by cclicking on the update button

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/MyProfile.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import nodpImage from "../assets/no-dp.jpeg";
import { Bounce, toast } from "react-toastify";

const MyProfile = () => {
  const [image, setImage] = useState(null);
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [joined_Date, setJoinedDate] = useState("");
  const [registrationId, setRegistrationId] = useState(" ");
  const [address, setAddress] = useState("");
  const [phoneno, setPhoneNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [bloodUnitId, setBloodUnitId] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [bloodQuantity, setBloodQuantity] = useState("");
  const [expDate, setExpDate] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedBloodUnitId, setUpdatedBloodUnitId] = useState("");
  const [updatedBloodType, setUpdatedBloodType] = useState("");
  const [updatedBloodQuantity, setUpdatedBloodQuantity] = useState("");
  const [updatedExpDate, setUpdatedExpDate] = useState("");
  const [requestHistoryData, setRequestHistoryData] = useState([]);
  const [donateHistoryData, setDonateHistoryData] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    // fetching role profile from Backend
    const fetchProfile = async () => {
      try {
        // const token = document.cookie.split("=")[1]
        const token = getCookieValue('token')
        console.log("TOKEN = ",token)
        const decodedToken = jwtDecode(token);
        console.log("TOKEN from MYProfile Component = ", token);
        const { role } = decodedToken;
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/myprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Profile Response : ", response.data);
        const { Name, email, joined_Date, phoneno, registrationId, address } =
          response.data.userProfile;
        setName(Name);
        setEmail(email);
        setRole(role);
        setJoinedDate(joined_Date);
        setPhoneNumber(phoneno);
        setRegistrationId(registrationId);
        setAddress(address);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  // conversion of joined date in dd-mm-yyyy format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const handleSaveProfile = async () => {
    try {
      const token = document.cookie.split("=")[1];
      const decodedToken = jwtDecode(token);
      const { role, userId } = decodedToken;

      const updatedProfile = {
        Name,
        email,
        phoneno,
        address,
        role,
        userId,
        registrationId,
      };

      await axios.put(
        "http://localhost:8080/api/v1/auth/updateprofile",
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      // Exit edit mode
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile, please try again!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // ADD IMAGE HANDLER
  const handleAddImage = () => {
    document.getElementById("add-image-button").click();
  };

  // ADD INVENTORY HANDLER
  const handleAddInventory = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/auth/inventory",
        {
          bloodUnitId,
          bloodType,
          bloodQuantity,
          expDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Inventories added Successfully!");
      toast.success("Details added Successfuly!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setShowAddInventory(false);
    } catch (error) {
      toast.error("Error adding details , Try Again !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Error adding inventory:", error);
    }
  };

  // FOR FETCHING AND  DISPLAYING THE DATA IN SHOW INVENTORY BUTTON
  const handleShowInventory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/showinventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const results = response.data.data;
      const formattedData = results.map((item) => ({
        registrationId: item.registrationId,
        bloodUnitId: item.BloodUnitId,
        bloodType: item.Blood_Type,
        bloodQuantity: item.Blood_Quantity,
        expDate: formatDate(item.Expiration_Date),
      }));
      setInventoryData(formattedData);
      setShowInventoryModal(true);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  // UPDATE INVENTORY HANDLER

  const updateInventoryModal = async (inventory) => {
    setSelectedInventory(inventory);
    // by default, already stored data will appear on the update modal, if any of the field is not changed
    setUpdatedBloodUnitId(inventory.bloodUnitId);
    setUpdatedBloodType(inventory.bloodType);
    setUpdatedBloodQuantity(inventory.bloodQuantity);
    setUpdatedExpDate(inventory.expDate);
    setShowUpdateModal(true);
  };

  const handleUpdateInventory = async (bloodUnitId) => {
    try {
      const updatedData = {
        bloodUnitId: updatedBloodUnitId,
        bloodType: updatedBloodType,
        bloodQuantity: updatedBloodQuantity,
        expDate: updatedExpDate,
      };
      console.log(updatedData);
      await axios.put(
        `http://localhost:8080/api/v1/auth/inventory/${registrationId}/${bloodUnitId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // fetchInventoryData();
      handleShowInventory();
      setShowUpdateModal(false);
      // setShowInventoryModal(false);
      toast.success("Inventory updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Error updating inventory, Try again!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // DELETE AN INVENTORY HANDLER
  const handleDeleteInventory = async (bloodUnitId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/auth/inventory/${registrationId}/${bloodUnitId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // fetchInventoryData()
      handleShowInventory();
      toast.success("Inventory deleted successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error deleting inventory:", error);
      toast.error("Error deleting inventory, please try again!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // FETCH HISTORY DATA FROM BACKEND
  const fetchHistoryData = async () => {
    try {
      const requestResponse = await axios.get(
        "http://localhost:8080/api/v1/auth/requesthistory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestHistoryData(requestResponse.data.data);
      if (role === "user") {
        const donateResponse = await axios.get(
          "http://localhost:8080/api/v1/auth/donatehistory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDonateHistoryData(donateResponse.data.data);
      }
      console.log("Request History : ", requestHistoryData);
      console.log("Donation History : ", donateHistoryData);
      setShowHistoryModal(true);
    } catch (error) {
      toast.error("History could not be fetched", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>
      <div className="profile-card">
        <div className="profile-image">
          {image ? (
            <img src={image} alt="Profile" />
          ) : (
            <div className="profile-add-image-placeholder">
              <img src={nodpImage} alt="Profile" />
            </div>
          )}
          {!editMode && (
            <button className="edit-profile-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
          )}
        </div>
        <div className="profile-details">
          <div className="profile-detail">
            {editMode ? (
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <h4>
                <span>Name : </span> {Name}
              </h4>
            )}
          </div>
          <div className="profile-detail">
            {editMode ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <h4>
                <span>Email : </span> {email}
              </h4>
            )}
          </div>
          <div className="profile-detail">
            {editMode ? (
              <input
                type="tel"
                value={phoneno}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <h4>
                <span>Phone Number : </span> {phoneno}
              </h4>
            )}
          </div>
          <div className="profile-detail">
            <h4>
              <span>Joined on : </span> {formatDate(joined_Date)}
            </h4>
          </div>
          <div className="profile-button-container">
            {editMode && (
              <button className="profile-button" onClick={handleAddImage}>
                Add Image
              </button>
            )}
            {role === "hospital" || role === "organisation" ? (
              <>
                <div className="profile-detail">
                  <h4>
                    <span>Address : </span> {address}
                  </h4>
                </div>
                <button
                  className="profile-button"
                  onClick={() => setShowAddInventory(true)}
                >
                  Add Inventory
                </button>
                <button
                  className="profile-button"
                  onClick={handleShowInventory}
                >
                  Show Inventory
                </button>
              </>
            ) : null}
            {editMode && (
              <button className="profile-button" onClick={handleSaveProfile}>
                Save
              </button>
            )}
            {!editMode && (
              <Link className="profile-button" onClick={fetchHistoryData}>
                History
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* SHOW HISTORY MODAL  */}
      {showHistoryModal && (
        <div className="inventory-modal">
          <div className="inventory-modal-content">
            <span
              className="show-inventory-cross-close"
              onClick={() => setShowHistoryModal(false)}
            >
              &times;
            </span>
            <h2>Requests Made</h2>
            {requestHistoryData.length === 0 ? (
              <h1>No data available</h1>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Request Date</th>
                    <th>Blood Type</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Urgency</th>
                  </tr>
                </thead>
                <tbody>
                  {requestHistoryData.map((item, index) => (
                    <tr key={index}>
                      <td>{formatDate(item.Blood_request_Date)}</td>
                      <td>{item.Blood_Type}</td>
                      <td>{item.Blood_Quantity_Requested} unit</td>
                      <td>{item.Location}</td>
                      <td>{item.Urgency_Level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {role === "user" && (
              <>
                <h2>Donations Made</h2>
                {donateHistoryData.length === 0 ? (
                  <h1>No data available</h1>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Last Donation Date</th>
                        <th>Age</th>
                        <th>Health Issues</th>
                        <th>Weight</th>
                        <th>Blood Type</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donateHistoryData.map((item, index) => (
                        <tr key={index}>
                          <td>{formatDate(item.Last_Donation_Date)}</td>
                          <td>{item.Age}</td>
                          <td>{item.Any_medical_Condition}</td>
                          <td>{item.weight}</td>
                          <td>{item.Blood_Type}</td>
                          <td>{item.Location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ADD INVENTORY  */}
      {showAddInventory && (
        <div className="add-inventory-modal">
          <div className="add-inventory-content">
            <span
              className="cross-close"
              onClick={() => setShowAddInventory(false)}
            >
              &times;
            </span>
            <h3>Add Inventory</h3>
            <div>
              <label>Blood Unit ID:</label>
              <input
                type="text"
                value={bloodUnitId}
                onChange={(e) => setBloodUnitId(e.target.value)}
              />
            </div>
            <div>
              <label>Blood Type:</label>
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
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label>Blood Quantity:</label>
              <input
                type="number"
                value={bloodQuantity}
                onChange={(e) => setBloodQuantity(e.target.value)}
              />
            </div>
            <div>
              <label>Expiration Date:</label>
              <input
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </div>
            <button onClick={handleAddInventory}>Save</button>
          </div>
        </div>
      )}

      {/* SHOW INVENTORY  */}
      {showInventoryModal && (
        <div className="inventory-modal">
          <div className="inventory-modal-content">
            <span
              className="show-inventory-cross-close"
              onClick={() => setShowInventoryModal(false)}
            >
              &times;
            </span>
            <h2>Inventory Details</h2>
            {inventoryData.length === 0 ? (
              <h1>No data available</h1>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Blood Unit ID</th>
                    <th>Blood Type</th>
                    <th>Blood Quantity</th>
                    <th>Expiration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((inventory, index) => (
                    <tr key={index}>
                      <td>{inventory.bloodUnitId}</td>
                      <td>{inventory.bloodType}</td>
                      <td>{inventory.bloodQuantity}</td>
                      <td>{inventory.expDate}</td>
                      <td>
                        {/* UPDATE AND DELETE IMPLEMENTATION OF  INVENTORIES */}
                        <button onClick={() => updateInventoryModal(inventory)}>
                          Update
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteInventory(inventory.bloodUnitId)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* UPDATE INVENTORY MODAL  */}
      {showUpdateModal && selectedInventory && (
        <div className="update-inventory-modal">
          <div className="update-inventory-content">
            <span
              className="cross-close"
              onClick={() => setSelectedInventory(null)}
            >
              &times;
            </span>
            <h3>Update Inventory</h3>
            <div>
              <label>Blood Unit ID:</label>
              <input
                type="text"
                value={updatedBloodUnitId}
                onChange={(e) => setUpdatedBloodUnitId(e.target.value)}
              />
            </div>
            <div>
              <label>Blood Type:</label>
              <select
                value={updatedBloodType}
                onChange={(e) => setUpdatedBloodType(e.target.value)}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label>Blood Quantity:</label>
              <input
                type="number"
                value={updatedBloodQuantity}
                onChange={(e) => setUpdatedBloodQuantity(e.target.value)}
              />
            </div>
            <div>
              <label>Expiration Date:</label>
              <input
                type="date"
                value={updatedExpDate}
                onChange={(e) => setUpdatedExpDate(e.target.value)}
                required
              />
            </div>
            <button
              className="save-button"
              onClick={() =>
                handleUpdateInventory(selectedInventory.bloodUnitId)
              }
            >
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowUpdateModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <input
        id="add-image-button"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default MyProfile;

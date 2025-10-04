import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

function Profile() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for view switching
  const [currentView, setCurrentView] = useState('profile'); // 'profile' or 'edit'
  
  // Form state
  const [inputChanged, setInputChanged] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setFirstname(json.firstname || "");
          setLastname(json.lastname || "");
          setUsername(json.username || "");
          setEmail(json.email || "");
          setPhoneNumber(json.phoneNumber || "");
          setBirthDate(json.birthDate || "");
          setGender(json.gender || "");
          setBio(json.bio || "");
          setProfileImage(json.profileImage || "");
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [token]);

  const handleChange = () => {
    setInputChanged(true);
  };

  const handleFirstnameChange = (e) => {
    handleChange();
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    handleChange();
    setLastname(e.target.value);
  };

  const handleUsernameChange = (e) => {
    handleChange();
    setUsername(e.target.value);
  };

  const handleGenderChange = (e) => {
    handleChange();
    setGender(e.target.value);
  };

  const handleBioChange = (e) => {
    handleChange();
    setBio(e.target.value);
  };

  const handleEmailChange = (e) => {
    handleChange();
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    handleChange();
    setPhoneNumber(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    handleChange();
    setBirthDate(e.target.value);
  };

  const saveProfile = () => {
    fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        phoneNumber,
        birthDate,
        gender,
        bio,
        profileImage,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Profile Updated JSON", json);
        alert("Profile Updated Successfully!");
        setInputChanged(false);
        setCurrentView('profile');
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const uploadProfileImage = (file) => {
    const formData = new FormData();
    formData.append('profileImage', file);

    fetch("http://localhost:5000/api/auth/profile/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        alert("Profile Image Uploaded");
        setProfileImage(json.user.profileImage);
        setInputChanged(false);
      })
      .catch((err) => console.error("Error uploading profile image:", err));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange();
      uploadProfileImage(file);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/');
    }
  };

  const handleChangePassword = () => {
    // Navigate to change password page or show modal
    alert("Change Password functionality will be implemented");
  };

  // My Profile View
  const renderProfileView = () => (
    <div style={{ backgroundColor: '#ffb3ba', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', fontSize: '18px' }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>My Profile</h2>
        <button style={{ background: 'none', border: 'none', fontSize: '18px' }}>⚙️</button>
      </div>

      {/* Profile Card */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '15px', 
        padding: '30px', 
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Profile Picture */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={profileImage ? `http://localhost:5000${profileImage}` : "/assets/avatar.png"}
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <button 
              onClick={() => document.getElementById('profileImageInput').click()}
              style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '12px'
              }}
            >
              📷
            </button>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <h3 style={{ margin: '10px 0 5px 0', fontSize: '20px' }}>{firstname} {lastname}</h3>
          <p style={{ margin: 0, color: '#666' }}>{email}</p>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => setCurrentView('edit')}
          style={{
            width: '100%',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '20px'
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Menu Options */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '15px', 
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>❤️</span>
            <span>Favourites</span>
          </div>
          <span>›</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>⬇️</span>
            <span>Downloads</span>
          </div>
          <span>›</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>🌐</span>
            <span>Languages</span>
          </div>
          <span>›</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>📍</span>
            <span>Location</span>
          </div>
          <span>›</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>▶️</span>
            <span>Subscription</span>
          </div>
          <span>›</span>
        </div>

        <ThemeToggle />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>🖥️</span>
            <span>Display</span>
          </div>
          <span>›</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>🗑️</span>
            <span>Clear Cache</span>
          </div>
          <span>›</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>🕐</span>
            <span>Clear History</span>
          </div>
          <span>›</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', fontSize: '20px' }}>↩️</span>
            <span onClick={handleLogout} style={{ cursor: 'pointer', color: '#dc3545' }}>Log Out</span>
          </div>
          <span>›</span>
        </div>
      </div>

      {/* App Version */}
      <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        App Version 2.3
      </div>
    </div>
  );

  // Edit Profile View
  const renderEditView = () => (
    <div style={{ backgroundColor: '#ffb3ba', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => setCurrentView('profile')}
          style={{ background: 'none', border: 'none', fontSize: '18px' }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Edit Profile</h2>
        <div></div>
      </div>

      {/* Edit Profile Card */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '15px', 
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Profile Picture with Edit Icon */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={profileImage ? `http://localhost:5000${profileImage}` : "/assets/avatar.png"}
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <button 
              onClick={() => document.getElementById('editProfileImageInput').click()}
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✏️
            </button>
            <input
              id="editProfileImageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone Number</label>
          <div style={{ display: 'flex' }}>
            <select style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px 0 0 8px',
              fontSize: '16px',
              backgroundColor: '#f8f9fa'
            }}>
              <option>+234</option>
              <option>+1</option>
              <option>+44</option>
            </select>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #ddd',
                borderLeft: 'none',
                borderRadius: '0 8px 8px 0',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Gender</label>
          <select
            value={gender}
            onChange={handleGenderChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Change Password Button */}
        <button
          onClick={handleChangePassword}
          style={{
            width: '100%',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          🔒 Change Password
        </button>

        {/* Save Button */}
        <button
          type="button"
          disabled={!inputChanged}
          onClick={saveProfile}
          style={{
            width: '100%',
            backgroundColor: inputChanged ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: inputChanged ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  return currentView === 'profile' ? renderProfileView() : renderEditView();
}

export default Profile;

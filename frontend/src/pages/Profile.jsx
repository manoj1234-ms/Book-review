import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

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
  const [purchaseLimit, setPurchaseLimit] = useState(10);

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
          setPurchaseLimit(json.purchaseLimit || 10);
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
    <div className="bg-pink-200 dark:bg-gray-800 min-h-screen p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <button 
          onClick={() => navigate('/')}
          className="bg-none border-none text-lg"
        >
          ←
        </button>
        <h2 className="m-0 text-lg font-bold text-gray-900 dark:text-gray-100">My Profile</h2>
        <button className="bg-none border-none text-lg">⚙️</button>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-5 shadow-md">
        {/* Profile Picture */}
        <div className="text-center mb-5">
          <div className="relative inline-block">
            <img
              src={profileImage ? `http://localhost:5000${profileImage}` : "/assets/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button 
              onClick={() => document.getElementById('profileImageInput').click()}
              className="absolute bottom-1 right-1 bg-blue-600 text-white border-none rounded-full w-7 h-7 text-xs"
            >
              📷
            </button>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <h3 className="my-2 text-xl text-gray-900 dark:text-gray-100">{username}</h3>
          <p className="m-0 text-gray-600 dark:text-gray-300">{email}</p>
          <p className="m-0 text-gray-600 dark:text-gray-300">Books you can buy: {purchaseLimit}</p>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => setCurrentView('edit')}
          className="w-full bg-blue-600 text-white rounded-lg py-3 text-lg font-medium mb-5"
        >
          Edit Profile
        </button>
      </div>

      {/* Menu Options */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-md">
        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">❤️</span>
            <span className="text-gray-900 dark:text-gray-100">Favourites</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>
        
        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">⬇️</span>
            <span className="text-gray-900 dark:text-gray-100">Downloads</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">🌐</span>
            <span className="text-gray-900 dark:text-gray-100">Languages</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">📍</span>
            <span className="text-gray-900 dark:text-gray-100">Location</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">▶️</span>
            <span className="text-gray-900 dark:text-gray-100">Subscription</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">🖥️</span>
            <span className="text-gray-900 dark:text-gray-100">Display</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">🗑️</span>
            <span className="text-gray-900 dark:text-gray-100">Clear Cache</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">🕐</span>
            <span className="text-gray-900 dark:text-gray-100">Clear History</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>

        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="mr-4 text-2xl">↩️</span>
            <span onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">Log Out</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">›</span>
        </div>
      </div>

      {/* App Version */}
      <div className="text-center mt-5 text-gray-600 dark:text-gray-400">
        App Version 2.3
      </div>
    </div>
  );

  // Edit Profile View
  const renderEditView = () => (
    <div className="bg-pink-200 dark:bg-gray-800 min-h-screen p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <button 
          onClick={() => setCurrentView('profile')}
          className="bg-none border-none text-lg"
        >
          ←
        </button>
        <h2 className="m-0 text-lg font-bold text-gray-900 dark:text-gray-100">Edit Profile</h2>
        <div></div>
      </div>

      {/* Edit Profile Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md">
        {/* Profile Picture with Edit Icon */}
        <div className="text-center mb-7">
          <div className="relative inline-block">
            <img
              src={profileImage ? `http://localhost:5000${profileImage}` : "/assets/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button 
              onClick={() => document.getElementById('editProfileImageInput').click()}
              className="absolute bottom-0 right-0 bg-blue-600 text-white border-none rounded-full w-9 h-9 text-sm flex items-center justify-center"
            >
              ✏️
            </button>
            <input
              id="editProfileImageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg box-border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg box-border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Username</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg box-border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg box-border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Phone Number</label>
          <div className="flex">
            <select className="p-3 border border-gray-300 rounded-l-lg text-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100">
              <option>+234</option>
              <option>+91</option>
              <option>+44</option>
            </select>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="flex-1 p-3 border border-gray-300 border-l-0 rounded-r-lg text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="mb-7">
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg box-border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="mb-7">
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Gender</label>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg box-border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
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
          className="w-full bg-blue-600 text-white rounded-lg py-3 text-lg font-medium mb-5 flex items-center justify-center gap-2"
        >
          🔒 Change Password
        </button>

        {/* Save Button */}
        <button
          type="button"
          disabled={!inputChanged}
          onClick={saveProfile}
          className={`w-full rounded-lg py-3 text-lg font-medium transition-all ease-in-out ${inputChanged ? 'bg-blue-600 text-white cursor-pointer' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  return currentView === 'profile' ? renderProfileView() : renderEditView();
}

export default Profile;

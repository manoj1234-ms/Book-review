import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '15px', fontSize: '20px' }}>🎨</span>
        <span>Themes</span>
      </div>
      <button
        onClick={toggleDarkMode}
        style={{
          background: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#333',
          border: '1px solid #ccc',
          borderRadius: '20px',
          padding: '5px 10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
};

export default ThemeToggle;

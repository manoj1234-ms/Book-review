import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { loginUser } from '../utils/api.jsx';

const LoginPage = () => {
  // === STATE MANAGEMENT ===
  // State to hold the email and password from the form inputs.
  const [formData, setFormData] = useState({ email: '', password: '' });
  // State to hold any error messages from the login attempt.
  const [error, setError] = useState('');

  // === HOOKS ===
  // Access the `login` function from our authentication context.
  const { login } = useContext(AuthContext);
  // Get the navigate function to redirect the user after a successful login.
  const navigate = useNavigate();

  // === EVENT HANDLERS ===
  // Updates the `formData` state whenever the user types in an input field.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles the form submission when the user clicks the "Login" button.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission.
    try {
      // Call the API function to send the login credentials to the backend.
      const response = await loginUser(formData);
      // If the API call is successful, update the global auth state with the new token.
      login(response.data.token);
      // Redirect the user to the homepage.
      navigate('/');
    } catch (err) {
      // If the API call fails (e.g., wrong password), set an error message to display to the user.
      setError('Invalid credentials. Please check your email and password.');
      console.error("Login failed:", err);
    }
  };

  // === JSX RENDER ===
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              {/* Conditionally render the error message if one exists */}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email-input">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email-input"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password-input">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password-input"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


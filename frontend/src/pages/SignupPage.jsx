// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { registerUser } from '../utils/api.jsx';
// import console from 'console';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser(formData);
//       console.log(response);
//       login(response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title text-center">Sign Up</h2>
//               {error && <div className="alert alert-danger">{error}</div>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mb-3">
//                   <label htmlFor="name-input">Name</label>
//                   <input
//                     type="text"
//                     name="fullname"
//                     id="fullname-input"
//                     className="form-control"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group mb-3">
//                   <label htmlFor="email-input">Email address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email-input"
//                     className="form-control"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group mb-3">
//                   <label htmlFor="password-input">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password-input"
//                     className="form-control"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">Sign Up</button>
//               </form>
//               <div className="text-center mt-3">
//                 <p>
//                   Already have an account?{' '}
//                   <Link to="/login" className="text-primary">
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../utils/api.jsx';

const SignupPage = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Log what is being sent
      console.log('Submitting signup data:', formData);

      const response = await registerUser(formData);
      // console.log('Signup response:', response);

      login(response.data.token); // store token in context
      navigate('/'); // redirect to home
    } catch (err) {
      // Use backend error message if available
      const backendMsg = err.response?.data?.message || 
                         err.response?.data?.errors?.[0]?.msg;
      setError(backendMsg || 'Registration failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="fullname-input">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname-input"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.fullname}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email-input">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email-input"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.email}
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
                    value={formData.password}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

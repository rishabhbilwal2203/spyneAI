

// import React from 'react';

// const Login = () => {
//   return (
//     <section className="text-gray-600 body-font relative">
//       <div className="container px-5 py-24 mx-auto flex flex-col items-center">
//         <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col w-full md:py-8 mt-8 md:mt-0 p-10 rounded-lg shadow-lg">
//           <h1 className="text-gray-900 text-2xl mb-5 font-bold title-font text-center">Login</h1>
//           <div className="relative mb-4">
//             <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <div className="relative mb-4">
//             <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
//           <p className="text-xs text-gray-500 mt-3 text-center">Welcome back! Please log in to your account.</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, navigate to the home page
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
        console.log(email, password);
        const response = await axios.post(
            'http://localhost:5000/api/auth/login', 
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
            console.log('Login successful', response.data);
            localStorage.setItem('token', response.data.token);

            // Reset form
            setEmail("");
            setPassword("");

            // Navigate to home page
            navigate('/');
        } else {
            setError('Login failed. Please try again.');
        }
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
            setError('Invalid email or password');
        } else {
            setError('An error occurred. Please try again later.');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex flex-col items-center">
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col w-full md:py-8 mt-8 md:mt-0 p-10 rounded-lg shadow-lg">
          <h1 className="text-gray-900 text-2xl mb-5 font-bold title-font text-center">Login</h1>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={handleLogin}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
          <p className="text-xs text-gray-500 mt-3 text-center">Welcome back! Please log in to your account.</p>
        </div>
      </div>
    </section>
  );
};

export default Login;

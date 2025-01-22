import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

function LoginPage() {
  const [loginvalue, setLoginvalue] = useState(''); //login value should be email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/users/login', { loginvalue, password });

      setUser(data.user)

      if (data && data.message === 'Login successful') {
        navigate('/'); // Redirect to home page on successful login
      } else {
        setError(`Login failed with status code ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Login failed with error: ${error.response?.data?.message || error.message}`);
      } else {
        setError('An unknown error occurred');
      }
    }
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your username or email"
            value={loginvalue}
            onChange={e => setLoginvalue(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input type="password"
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button className='primary'>Login</button>
          {error && <div className='text-center py-2 text-red-500'>{error}</div>}
          <div className='text-center py-2 text-gray-700'>Don't have an account yet? <Link className='underline text-black' to={'/register'}>  Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
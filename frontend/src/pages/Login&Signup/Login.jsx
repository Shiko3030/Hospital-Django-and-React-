import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Label, TextInput, Alert } from 'flowbite-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '', // تغيير من email إلى username
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error before new request
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create', formData);
      console.log(response.data);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/');
    } catch (error) {
      console.log('Full error response:', error.response?.data);

      if (error.response && error.response.data) {
        const errors = error.response.data;
        let errorText = '';

        if (typeof errors === 'object') {
          for (let key in errors) {
            if (Array.isArray(errors[key])) {
              errorText += `${key}: ${errors[key].join(', ')}\n`;
            } else {
              errorText += `${errors[key]}\n`;
            }
          }
        } else {
          errorText = 'Login failed! Please try again.';
        }

        setErrorMessage(errorText.trim());
      } else {
        setErrorMessage('Login failed! Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800" id="test">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <Alert color="failure">
              <span>{errorMessage}</span>
            </Alert>
          )}
          <div>
            <div className="mb-2">
              <Label htmlFor="username" value="Your Username" /> {/* تغيير من Your Email إلى Your Username */}
            </div>
            <TextInput
              id="username" // تغيير من email إلى username
              type="text" // تغيير من type="email" إلى type="text"
              placeholder="username" // تغيير placeholder
              value={formData.username} // تغيير من formData.email إلى formData.username
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} // تغيير من email إلى username
              required
            />
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="password" value="Your Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Login
          </Button>
          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-500">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
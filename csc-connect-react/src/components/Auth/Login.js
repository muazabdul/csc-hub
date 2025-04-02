import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // ... (previous state variables)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        console.log('Login successful');
        setLoading(false);
        localStorage.setItem('authToken', 'fake-auth-token'); // Store the token
        navigate('/');
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1000);
  };

  // ... (rest of the component)
}

export default Login;
// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      alert('Login successful');
      onLogin(); // Call the login function provided by App.js
      // Optionally store JWT token or user data in local storage
      // localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

const styles = {
  
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
  },
  
  
  error: {
    color: 'red',
  },
};

export default Login;
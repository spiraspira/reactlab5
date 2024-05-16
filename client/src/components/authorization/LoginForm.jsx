import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/users/login', { login, password });
  
      // Handle successful login
      const { token, isAdmin, userId } = response.data;
  
      localStorage.setItem('token', token);
      sessionStorage.setItem('token', token);
      localStorage.setItem('role', isAdmin ? "admin" : "user");
      sessionStorage.setItem('role', isAdmin ? "admin" : "user");
      localStorage.setItem('userId', userId);
      sessionStorage.setItem('userId', userId);
  
      alert('success');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
  
      alert(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="test"
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/register"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
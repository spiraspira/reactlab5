import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!login || !password) {
      alert('Login and password fields cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users', { login, password });

      alert('success');
      window.location.href = '/login';
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 500) {
        alert(error.response.data.message);
      } else {
        // Handle other errors
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
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
          Register
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/login"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
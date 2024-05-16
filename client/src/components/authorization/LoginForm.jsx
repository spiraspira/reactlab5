import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@material-ui/core';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('YOUR_LOGIN_API_ENDPOINT', { email, password });
      // Handle successful login
      console.log(response.data);
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      </form>
    </Container>
  );
};

export default LoginForm;
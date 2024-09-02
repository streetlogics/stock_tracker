// LoginForm.jsx
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { Box, Button, TextField, Typography , ScopedCssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import authProvider from './components/admin/CustomAuthProvider';
import { MainContainer } from './MainContainer';
import { mdTheme } from './App';

const LoginForm = () => {
  return (
    <ScopedCssBaseline>
      <ThemeProvider theme={mdTheme}>
        <MainContainer content={<LoginFormContiner />} />
      </ThemeProvider>
    </ScopedCssBaseline>
  );
};

const LoginFormContiner = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ username: email, password });
    } catch (error) {
      notify('Login failed');
      console.error(error);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authProvider.register({ username: email, password, name });
      notify('Registration successful. Logging you in now!');
    } catch (error) {
      notify('Registration failed');
      console.error(error);
      return;
    }
    handleLogin(e);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>Welcome to Bradley's Stock Tracker App</Typography>
      {mode === 'login' ? (
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" alignItems="center" justifyContent="end" >
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Box mx={2}> { " or "} </Box>
            <Button variant="contained" color="primary" onClick={(e) => {
              e.preventDefault();
              setMode('register');
            }}>Register</Button>
          </Box>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <TextField
            label="Name"
            name="name"
            type="text"
            value={name}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box display="flex" alignItems="center" justifyContent="end" >

            <Button variant="contained" color="primary"  type="submit" sx={{ mr: 2 }}>Register</Button>
            <Button variant="contained" color="primary" onClick={(e) => {
              e.preventDefault();
              setMode('login')
            }}>Back to Login</Button>
          </Box>
        </form>
      )}
      <Notification />
    </div>
  );
};

export default LoginForm;

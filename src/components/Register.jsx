import AnimatedBackground from './AnimatedBackground.jsx';
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Paper } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const glassStyle = {
  background: 'rgba(30, 30, 30, 0.7)',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37), 0 0 32px 8px #80deea88, 0 0 8px 2px #b388ff55',
  backdropFilter: 'blur(16px)',
  borderRadius: { xs: '16px', sm: '20px', md: '24px' },
  border: '2.5px solid #80deea',
  padding: { xs: '1.5rem 1rem', sm: '2rem 1.5rem', md: '2.5rem 2rem' },
  width: '100%',
  maxWidth: { xs: 360, sm: 420, md: 480 },
  margin: { xs: '1rem auto', sm: '2rem auto' },
  position: 'relative',
  overflow: 'hidden',
  transition: 'box-shadow 0.4s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37), 0 0 48px 12px #b388ffcc, 0 0 16px 4px #80deea99',
    borderColor: '#b388ff',
  },
};

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setEmailError('');
    setPasswordError('');
    setConfirmError('');

    let hasError = false;
    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      hasError = true;
    }
    if (password.length < 6 || !/[^A-Za-z0-9]/.test(password)) {
      setPasswordError('Password must be 6+ chars and include a special character');
      hasError = true;
    }
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      hasError = true;
    }
    if (hasError) {
      setError('Please fix the errors above');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://auth-5lhr.onrender.com/api/auth/register', { email, password });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{
      background: 'linear-gradient(135deg, #000 0%, #222 100%)',
  fontFamily: 'Inter, Poppins, Roboto, Arial, sans-serif',
      position: 'relative',
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 20%, #80deea33 0%, transparent 70%), radial-gradient(circle at 80% 80%, #b388ff33 0%, transparent 70%)',
        zIndex: 0,
        filter: 'blur(60px)',
        animation: 'moveBg 10s linear infinite alternate',
      },
      '@keyframes moveBg': {
        '0%': { backgroundPosition: '20% 20%, 80% 80%' },
        '100%': { backgroundPosition: '40% 40%, 60% 60%' },
      },
    }}>
      <Paper elevation={6} sx={glassStyle}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <PersonAddAlt1Icon sx={{ fontSize: 48, color: '#80deea', mb: 1 }} />
        </Box>
  <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1, fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
            fullWidth
            margin="normal"
            required
            error={Boolean(emailError)}
            helperText={emailError}
            autoComplete="email"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              style: { color: '#fff' },
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#80deea', // light teal
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4dd0e1', // medium teal
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00bcd4', // deep teal
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
            fullWidth
            margin="normal"
            required
            error={Boolean(passwordError)}
            helperText={passwordError}
            autoComplete="new-password"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              style: { color: '#fff' },
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#90caf9',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#42a5f5',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={e => { setConfirmPassword(e.target.value); if (confirmError) setConfirmError(''); }}
            fullWidth
            margin="normal"
            required
            error={Boolean(confirmError)}
            helperText={confirmError}
            autoComplete="new-password"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              style: { color: '#fff' },
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#90caf9',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#42a5f5',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          {error && <Typography color="error" align="center">{error}</Typography>}
          {success && <Typography color="primary" align="center">{success}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: 18, letterSpacing: 1, background: 'linear-gradient(90deg, #80deea 0%, #b388ff 100%)', color: '#222', boxShadow: '0 2px 8px #80deea55', transition: '0.2s', '&:hover': { background: 'linear-gradient(90deg, #b388ff 0%, #80deea 100%)', color: '#000' } }}>
            {loading ? 'Registering' : 'Register'}{loading && <CircularProgress size={18} color="inherit" sx={{ ml: 1 }} />}
          </Button>
        </form>
        <Typography align="center" variant="body2" sx={{ color: '#fff', mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" underline="hover" sx={{ color: '#80deea', fontWeight: 600, '&:hover': { color: '#b388ff' } }}>Login</Link>
        </Typography>
      </Paper>
      </Box>
    </>
  );
}

export default Register;

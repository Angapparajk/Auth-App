import AnimatedBackground from './AnimatedBackground.jsx';
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const glassStyle = {
  background: 'rgba(30, 30, 30, 0.7)',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37), 0 0 32px 8px #80deea88, 0 0 8px 2px #b388ff55',
  backdropFilter: 'blur(16px)',
  borderRadius: { xs: 0, md: 0 },
  border: '2.5px solid #80deea',
  padding: { xs: '1rem', sm: '1.5rem', md: '2.5rem 2rem' },
  margin: 0,
  width: '100%',
  maxWidth: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'box-shadow 0.4s',
};

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  axios.get('https://auth-5lhr.onrender.com/api/auth/dashboard', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => {
        setError('Unauthorized. Please login.');
        setTimeout(() => navigate('/login'), 1500);
      });
  }, [navigate]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await axios.post('https://auth-5lhr.onrender.com/api/auth/logout', {}, { withCredentials: true });
    } catch (_) {
      // ignore and proceed to redirect
    }
    window.location.href = '/login';
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
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
          <Button variant="contained" color="secondary" disabled={loggingOut} sx={{ fontWeight: 600, fontSize: 18, letterSpacing: 1, background: 'linear-gradient(90deg, #80deea 0%, #b388ff 100%)', color: '#222', boxShadow: '0 2px 8px #80deea55', transition: '0.2s', '&:hover': { background: 'linear-gradient(90deg, #b388ff 0%, #80deea 100%)', color: '#000' } }} onClick={handleLogout}>
            {loggingOut ? 'Logging out' : 'Logout'}{loggingOut && <CircularProgress size={18} color="inherit" sx={{ ml: 1 }} />}
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <DashboardCustomizeIcon sx={{ fontSize: 48, color: '#80deea', mb: 1 }} />
        </Box>
  <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1, fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>Dashboard</Typography>
        {user ? (
          <>
            <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
              <PersonIcon sx={{ fontSize: 64, color: '#b388ff', mr: 1 }} />
            </Box>
            <Typography align="center" sx={{ color: '#fff', fontWeight: 500, fontSize: 20, mb: 2 }}>Welcome, {user.email}!</Typography>
            <Box sx={{ color: '#e0e0e0', fontSize: 16, mb: 2, fontFamily: 'Inter, Arial, sans-serif', textAlign: 'left' }}>
              <Typography variant="h5" sx={{ color: '#80deea', fontWeight: 700, mb: 1 }}>Project Overview</Typography>
              <Typography sx={{ mb: 2 }}>
                This app demonstrates a full-stack authentication flow using React (frontend), Node/Express (backend), and SQLite (database).
              </Typography>
              <Typography variant="h6" sx={{ color: '#b388ff', fontWeight: 700, mb: 1 }}>Process & Key Additions</Typography>
              <ul style={{margin: 0, paddingLeft: '1.2em'}}>
                <li><b>Secure Sessions:</b> JWT issued on login and stored in an HTTP-only cookie.</li>
                <li><b>CORS & Cookies:</b> Configured CORS with credentials and preflight handling; proxy-aware cookie security.</li>
                <li><b>Form UX:</b> Client-side validation (email format; password 6+ chars with special char).</li>
                <li><b>Protected Routes:</b> `ProtectedRoute` checks session via `/dashboard` before rendering.</li>
                <li><b>UI Polish:</b> Animated background</li>
              </ul>
              <Typography variant="h6" sx={{ color: '#b388ff', fontWeight: 700, mt: 2, mb: 1 }}>Auth Flow</Typography>
              <ul style={{margin: 0, paddingLeft: '1.2em'}}>
                <li><b>Register</b> → hash password → store in SQLite.</li>
                <li><b>Login</b> → verify password → sign JWT → set cookie (`SameSite=None`).</li>
                <li><b>Access</b> → `/dashboard` verifies cookie, returns user payload.</li>
                <li><b>Logout</b> → clear cookie → redirect to login.</li>
              </ul>
              <Typography variant="h6" sx={{ color: '#b388ff', fontWeight: 700, mt: 2, mb: 1 }}>Additional Points</Typography>
              <ul style={{margin: 0, paddingLeft: '1.2em'}}>
                <li><b>Environment & deployment:</b> `JWT_SECRET` required; `app.set('trust proxy', 1)`; HTTPS enabled on Render.</li>
                <li><b>Cookie security:</b> HTTP-only cookie, `SameSite=None`, `Secure` only over HTTPS for cross-origin support.</li>
                <li><b>CORS specifics:</b> Allowed origins list with credentials; Express 5 preflight fix using `app.options(/.*/)`.</li>
                <li><b>Password policy:</b> 6+ characters including at least one special character; bcrypt hashing on the server.</li>
                <li><b>Token lifecycle:</b> JWT expires in 1 hour; can extend with refresh tokens later.</li>
                <li><b>Validation & sanitization:</b> Client-side checks mirrored by server-side validation; consistent error responses.</li>
                <li><b>Error handling:</b> Standardized JSON errors and 401 handling; redirect to login on unauthorized.</li>
                <li><b>Logging & monitoring:</b> Basic server logs; consider Sentry/Logtail for production observability.</li>
                <li><b>Axios resilience:</b> `withCredentials` enabled; optional interceptor to auto-redirect on 401.</li>
                <li><b>Database notes:</b> SQLite file persistence and unique email constraint; room for migrations.</li>
              </ul>
            </Box>
            <Button variant="contained" color="secondary" fullWidth disabled={loggingOut} sx={{ mt: 2, fontWeight: 600, fontSize: 18, letterSpacing: 1, background: 'linear-gradient(90deg, #80deea 0%, #b388ff 100%)', color: '#222', boxShadow: '0 2px 8px #80deea55', transition: '0.2s', '&:hover': { background: 'linear-gradient(90deg, #b388ff 0%, #80deea 100%)', color: '#000' } }} onClick={handleLogout}>
              {loggingOut ? 'Logging out' : 'Logout'}{loggingOut && <CircularProgress size={18} color="inherit" sx={{ ml: 1 }} />}
            </Button>
          </>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
            {error ? (
              <Typography color="error" align="center">{error}</Typography>
            ) : (
              <CircularProgress 
                size={60} 
                thickness={4}
                sx={{ 
                  color: '#80deea',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                    stroke: '#80deea',
                  },
                  '& .MuiCircularProgress-svg': {
                    filter: 'drop-shadow(0 0 8px #80deea)',
                  }
                }}
              />
            )}
          </Box>
        )}
      </Paper>
      </Box>
    </>
  );
}

export default Dashboard;

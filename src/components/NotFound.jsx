import AnimatedBackground from './AnimatedBackground.jsx';
import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

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

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/login');
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
            <ErrorOutlineIcon sx={{ fontSize: 48, color: '#ff6b6b', mb: 1 }} />
          </Box>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1, fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
            404
          </Typography>
          <Typography variant="h6" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 500, mb: 2 }}>
            Page Not Found
          </Typography>
          <Typography align="center" sx={{ color: '#e0e0e0', fontSize: 16, mb: 3, fontFamily: 'Inter, Arial, sans-serif' }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleGoHome}
            sx={{ 
              fontWeight: 600, 
              fontSize: 18, 
              letterSpacing: 1, 
              background: 'linear-gradient(90deg, #80deea 0%, #b388ff 100%)', 
              color: '#222', 
              boxShadow: '0 2px 8px #80deea55', 
              transition: '0.2s', 
              '&:hover': { 
                background: 'linear-gradient(90deg, #b388ff 0%, #80deea 100%)', 
                color: '#000' 
              } 
            }}
          >
            Go to Login
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default NotFound;

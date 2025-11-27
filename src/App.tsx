
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, CssBaseline } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AlcoCalc from './components/AlcoCalc';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // CloudPeak-inspired palette and gradients
  const colors = darkMode
    ? {
        bg: 'linear-gradient(135deg, #0a0f2c 0%, #1a1f3c 100%)',
        appBar: 'rgba(10, 15, 44, 0.98)',
        highlight: '#4f5bd5',
        border: '#232a4d',
        iconColor: '#e3e6f3',
      }
    : {
        bg: 'linear-gradient(135deg, #e3e6f3 0%, #f5f7fa 100%)',
        appBar: 'rgba(255,255,255,0.98)',
        highlight: '#1976d2',
        border: '#e3e6f3',
        iconColor: '#222',
      };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', fontFamily: 'system-ui, Arial, sans-serif', display: 'flex', flexDirection: 'column', background: colors.bg }}>
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: colors.appBar, boxShadow: 'none', borderBottom: `1px solid ${colors.border}` }}>
        <Toolbar sx={{ px: { xs: 1, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: 22, sm: 32 }, color: colors.highlight }}>
            Drive
          </Typography>
          <IconButton color="inherit" onClick={() => setDarkMode(m => !m)} sx={{ ml: 1, color: colors.iconColor }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 2, sm: 4 }, px: { xs: 0, sm: 2 } }}>
        <AlcoCalc darkMode={darkMode} />
      </Box>
    </Box>
  );
}

export default App;

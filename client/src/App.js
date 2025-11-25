import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Visits from './pages/Visits';
import Payments from './pages/Payments';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import { Box } from '@mui/material';
import { useState } from 'react';
import LandingPage from './pages/LandingPage'

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366F1',
      },
      secondary: {
        main: '#EC4899',
      },
      background: {
        default: mode === 'light' ? '#f5f7fa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1E1E1E',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
  });

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar toggleTheme={toggleTheme} mode={mode} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard mode={mode} toggleTheme={toggleTheme} />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/visits" element={<Visits />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/landingpage" element={<LandingPage />} />

            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
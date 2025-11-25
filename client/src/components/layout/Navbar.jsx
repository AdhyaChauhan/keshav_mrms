import { AppBar, Toolbar, Typography, IconButton, Avatar, useTheme } from '@mui/material';
import { Menu, Notifications, AccountCircle } from '@mui/icons-material';

const Navbar = ({ toggleSidebar }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Keshav Pharma MRMS
        </Typography>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <IconButton color="inherit" sx={{ ml: 1 }}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  useTheme,
  Toolbar // <-- Add this import
} from '@mui/material';
import { 
  Dashboard, 
  People, 
  CalendarToday, 
  Payment,
  Science,
  Settings
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ width = 240, open, onClose }) => {
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Doctors', icon: <People />, path: '/doctors' },
    { text: 'Visits', icon: <CalendarToday />, path: '/visits' },
    { text: 'Payments', icon: <Payment />, path: '/payments' },
    // { text: 'LandingPage', icon: <Science />, path: '/landingpage' }
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRight: `1px solid ${theme.palette.divider}`
        },
      }}
    >
      <Toolbar /> {/* This now works with the import */}
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&.active': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main
                }
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        <ListItem 
          button 
          component={Link} 
          to="/settings"
          sx={{
            borderRadius: 2,
            mx: 1,
            my: 0.5
          }}
        >
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List> */}
    </Drawer>
  );
};

export default Sidebar;
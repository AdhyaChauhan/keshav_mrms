import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, color = 'primary', gradient }) => {
  const theme = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card sx={{ 
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.shadows[4],
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: gradient || theme.palette[color].main
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              mr: 2,
              borderRadius: 3,
              background: gradient || theme.palette[color].main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {icon}
            </Box>
            <Typography variant="h3" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
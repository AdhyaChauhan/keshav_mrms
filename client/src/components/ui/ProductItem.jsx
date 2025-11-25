import { Box, Typography, LinearProgress, useTheme } from '@mui/material';

const ProductItem = ({ name, value, color }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{value}%</Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={value} 
        sx={{ 
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            backgroundColor: color
          }
        }} 
      />
    </Box>
  );
};

export default ProductItem;
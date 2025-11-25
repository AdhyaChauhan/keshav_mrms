import { Box, Typography } from '@mui/material';

const GlassCard = ({ title, children, sx }) => {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        height: '100%',
        ...sx
      }}
    >
      {title && (
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default GlassCard;
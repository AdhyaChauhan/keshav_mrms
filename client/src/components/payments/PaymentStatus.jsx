import { 
  Box, 
  Typography, 
  Chip,
  LinearProgress,
  useTheme,
  Stack,
  CircularProgress,
} from '@mui/material';
import { 
  Paid,
  PendingActions,
  HourglassTop
} from '@mui/icons-material';
import GlassCard from '../ui/GlassCard';
import { useEffect, useState } from 'react';
import { getPendingPayments, getPayments } from '../../services/api';

const PaymentStatus = () => {
  const theme = useTheme();
  const [pendingAmount, setPendingAmount] = useState(0);
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        
        // Fetch all payments and filter them
        const allPayments = await getPayments();
        
        // Calculate pending amount (status !== 'Paid')
        const pending = allPayments
          .filter(payment => payment.status !== 'Paid')
          .reduce((sum, payment) => sum + payment.amount, 0);
        
        // Calculate collected amount (status === 'Paid')
        const collected = allPayments
          .filter(payment => payment.status === 'Paid')
          .reduce((sum, payment) => sum + payment.amount, 0);
        
        setPendingAmount(pending);
        setCollectedAmount(collected);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch payment status:", err);
        setError("Failed to load payment data");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  const total = pendingAmount + collectedAmount;
  const percentage = total > 0 ? Math.round((collectedAmount / total) * 100) : 0;

  if (loading) {
    return (
      <GlassCard title="Payment Status">
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </GlassCard>
    );
  }

  if (error) {
    return (
      <GlassCard title="Payment Status">
        <Box sx={{ p: 3, color: 'error.main' }}>
          {error}
        </Box>
      </GlassCard>
    );
  }

  return (
    <GlassCard title="Payment Status">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1">Pending</Typography>
          <Typography variant="body1" fontWeight="bold" color="warning.main">
            ₹{pendingAmount.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="body1">Collected</Typography>
          <Typography variant="body1" fontWeight="bold" color="success.main">
            ₹{collectedAmount.toLocaleString()}
          </Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={percentage} 
          sx={{ 
            height: 10,
            borderRadius: 5,
            mb: 3,
            backgroundColor: theme.palette.grey[300],
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
            }
          }} 
        />
        
        <Stack direction="row" justifyContent="space-between" marginLeft={-5.7} spacing={1}>
          <Chip
            icon={<PendingActions />}
            label="Pending"
            color="warning"
            variant="outlined"
          />
          <Chip
            icon={<HourglassTop />}
            label={`${percentage}% Collected`}
            color="info"
          />
          <Chip
            icon={<Paid />}
            label="Completed"
            color="success"
            variant="outlined"
          />
        </Stack>
      </Box>
    </GlassCard>
  );
};

export default PaymentStatus;
import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  useTheme,
  Avatar,
  Stack,
  CircularProgress
} from '@mui/material';
import { 
  TrendingUp, 
  People, 
  MonetizationOn, 
  CalendarToday,
  Science
} from '@mui/icons-material';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import ProductItem from '../components/ui/ProductItem';

// Update these import paths
import doctorImage from '../assets/images/doctor-illustration.png';
import medicineImage from '../assets/images/medicine-bg.jpg';
import { getDashboardData } from '../services/api';

// Register ChartJS
ChartJS.register(...registerables);

const Dashboard = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    doctors: 0,
    pendingPayments: 0,
    visits: 0,
    revenue: 0,
    collectedPayments: 0  
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get real data from backend
      const dashboardData = await getDashboardData();

      // Update stats with real data
      setStats({
        doctors: dashboardData.doctorsCount,
        pendingPayments: dashboardData.pendingPayments,
        visits: 142, // Keep mock for now (we'll make this dynamic later)
        revenue: dashboardData.totalRevenue,
        collectedPayments: dashboardData.collectedPayments
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
      // Fallback to mock data if API fails
      setStats({
        doctors: 24,
        pendingPayments: 8,
        visits: 142,
        revenue: 284500,
        collectedPayments: 22  
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <Box sx={{ 
        p: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        background: `url(${medicineImage}) no-repeat center/cover`
      }}>
        <Box sx={{
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          p: 4,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
          <CircularProgress size={40} />
          <Typography variant="h6" color="primary.main">
            Loading Dashboard Data...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box sx={{ 
        p: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        background: `url(${medicineImage}) no-repeat center/cover`
      }}>
        <Box sx={{
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          p: 4,
          borderRadius: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Using demo data for display
          </Typography>
        </Box>
      </Box>
    );
  }

  // Revenue Chart Data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue (₹)',
      data: [65000, 59000, 80000, 81000, 56000, 95000],
      borderColor: theme.palette.primary.main,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  // Doctor Specialty Distribution
  const specialtyData = {
    labels: ['Cardiology', 'Pediatrics', 'Orthopedics', 'General'],
    datasets: [{
      data: [35, 25, 20, 20],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.warning.main
      ],
      borderWidth: 0
    }]
  };

  // Payment Status Distribution - NOW DYNAMIC!
  const paymentStatusData = {
    labels: ['Paid', 'Pending'],
    datasets: [{
      data: [
        stats.collectedPayments,  // Real data from API
        stats.pendingPayments,    // Real data from API
      ],
      backgroundColor: [
        theme.palette.success.main,
        theme.palette.warning.main,
      ],
      borderWidth: 0
    }]
  };

  // Recent Activities
  const activities = [
    { id: 1, doctor: 'Dr. Sharma', action: 'Placed order', product: 'CardioPlus', time: '2 hours ago' },
    { id: 2, doctor: 'Dr. Patel', action: 'Requested sample', product: 'NeuroFlex', time: '5 hours ago' },
    { id: 3, doctor: 'Dr. Gupta', action: 'Payment received', amount: '₹12,500', time: '1 day ago' }
  ];

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 }, // RESPONSIVE: Smaller padding on mobile
      background: `url(${medicineImage}) no-repeat center/cover`,
      minHeight: '100vh'
    }}>
      {/* Glassmorphism Overlay */}
      <Box sx={{
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        p: { xs: 2, sm: 2 }, 
        mt: 2,
        borderRadius: 1,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
      }}>
        {/* Header - RESPONSIVE */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          mb: 4,
          gap: { xs: 2, sm: 0 }
        }}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h4" fontWeight="bold" color="primary.main" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } }}>
              Keshav Pharma Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Medical Representative Management System
            </Typography>
          </Box>
          <Avatar 
            src={doctorImage} 
            sx={{ 
              width: { xs: 40, sm: 56 }, 
              height: { xs: 40, sm: 56 },
              border: `3px solid ${theme.palette.primary.main}`
            }} 
          />
        </Box>

        {/* Stats Cards - RESPONSIVE */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={4} md={2.4}>
            <StatCard 
              icon={<People sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
              title="Total Doctors"
              value={stats.doctors}
              color="primary"
              gradient="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <StatCard 
              icon={<MonetizationOn sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
              title="Pending Payments"
              value={stats.pendingPayments}
              color="secondary"
              gradient="linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)"
            />
          </Grid>
           <Grid item xs={6} sm={4} md={2.4}>
            <StatCard 
              icon={<MonetizationOn sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
              title="Collected Payments"
              value={stats.collectedPayments}
              color="info"
              gradient="linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)"
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <StatCard 
              icon={<TrendingUp sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
              title="Revenue (₹)"
              value={stats.revenue.toLocaleString()}
              color="warning"
              gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <StatCard 
              icon={<CalendarToday sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
              title="Monthly Visits"
              value={stats.visits}
              color="success"
              gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
            />
          </Grid>
          
         
        </Grid>

        {/* Charts Row - RESPONSIVE */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} lg={6}>
            <GlassCard title="Revenue Trend">
              <Box sx={{ height: { xs: 250, sm: 280 } }}>
                <Line 
                  data={revenueData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      y: {
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        ticks: { 
                          callback: (value) => `₹${value/1000}k`
                        }
                      }
                    }
                  }}
                />
              </Box>
            </GlassCard>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <GlassCard title="Specialty Distribution">
              <Box sx={{ 
                height: { xs: 250, sm: 280 },
                position: 'relative',
                padding: 1 
              }}>
                <Doughnut
                  data={specialtyData}
                  options={{
                    cutout: '65%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { 
                          padding: 10,
                          usePointStyle: true,
                          pointStyle: 'circle',
                          boxWidth: 10
                        }
                      }
                    },
                    maintainAspectRatio: false
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {stats.doctors}
                  </Typography>
                </Box>
              </Box>
            </GlassCard>
          </Grid>
            
          <Grid item xs={12} sm={6} lg={3}>
            <GlassCard title="Payment Status">
              <Box sx={{ 
                height: { xs: 250, sm: 280 },
                position: 'relative',
                padding: 1 
              }}>
                <Doughnut
                  data={paymentStatusData}
                  options={{
                    cutout: '65%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { 
                          padding: 10,
                          usePointStyle: true,
                          pointStyle: 'circle',
                          boxWidth: 10
                        }
                      }
                    },
                    maintainAspectRatio: false
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {stats.collectedPayments + stats.pendingPayments}
                  </Typography>
                </Box>
              </Box>
            </GlassCard>
          </Grid>
        </Grid>

        {/* Bottom Row - RESPONSIVE */}
        <Grid container spacing={3}>
          <Grid item xs={12} xl={6}>
            <GlassCard title="Recent Activities">
              <Stack spacing={2}>
                {activities.map((activity) => (
                  <motion.div 
                    key={activity.id}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Box sx={{
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Avatar sx={{ 
                        bgcolor: theme.palette.primary.light,
                        mr: { xs: 0, sm: 2 },
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 }
                      }}>
                        <Science fontSize="small" />
                      </Avatar>
                      <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          {activity.doctor} {activity.action}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {activity.product || activity.amount}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        {activity.time}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </GlassCard>
          </Grid>
          <Grid item xs={12} xl={6}>
            <GlassCard title="Top Products">
              <Box sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <ProductItem 
                  name="MPFol-SL" 
                  progress={85} 
                  color={theme.palette.primary.main} 
                />
                <ProductItem 
                  name="Rebiz-D" 
                  progress={72} 
                  color={theme.palette.secondary.main} 
                />
                <ProductItem 
                  name="Immuflora" 
                  progress={63} 
                  color={theme.palette.success.main} 
                />
              </Box>
            </GlassCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
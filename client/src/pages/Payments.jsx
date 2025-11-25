import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Button, Chip, Avatar, 
  useTheme, Dialog, Grid, Divider, 
  CircularProgress, Alert, IconButton , DialogTitle , DialogContent  
} from '@mui/material';
import { 
  MonetizationOn, Paid, PendingActions, 
  People, Edit, Delete 
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import GlassCard from '../components/ui/GlassCard';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentStatus from '../components/payments/PaymentStatus';
import { 
  getPayments, createPayment, updatePayment,
  deletePayment, getPendingPayments, getDoctors 
} from '../services/api';

const Payments = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [paymentsData, doctorsData] = await Promise.all([
          getPayments(),
          getDoctors()
        ]);
        setPayments(paymentsData);
        setDoctors(doctorsData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSavePayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (selectedPayment) {
        response = await updatePayment(selectedPayment._id, paymentData);
        setPayments(payments.map(p => 
          p._id === selectedPayment._id ? response : p
        ));
      } else {
        response = await createPayment(paymentData);
        setPayments([...payments, response]);
      }
      
      setOpenForm(false);
      setSelectedPayment(null);
      setSuccess(`Payment ${selectedPayment ? 'updated' : 'created'} successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Payment operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (id) => {
    try {
      setLoading(true);
      await deletePayment(id);
      setPayments(payments.filter(p => p._id !== id));
      setSuccess('Payment deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete payment');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
  );

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, // RESPONSIVE PADDING
      marginTop: { xs: 3, sm: 5 } // RESPONSIVE MARGIN
    }}>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* HEADER - RESPONSIVE */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 4,
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h4" 
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } }}
        >
          Payment Tracking
        </Typography>
        <Button
          variant="contained"
          startIcon={<MonetizationOn />}
          onClick={() => {
            setSelectedPayment(null);
            setOpenForm(true);
          }}
          sx={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            '&:hover': { boxShadow: theme.shadows[8] },
            fontSize: { xs: '0.875rem', sm: '1rem' },
            px: { xs: 2, sm: 3 }
          }}
        >
          Record Payment
        </Button>
      </Box>

      {/* MAIN CONTENT - RESPONSIVE GRID */}
      <Grid container spacing={3}> {/* REDUCED SPACING */}
        <Grid item xs={12} xl={8}> {/* FULL WIDTH ON MOBILE */}
          <GlassCard title="Payment Records">
            <Box sx={{ height: { xs: 500, sm: 600 } }}> {/* SMALLER HEIGHT ON MOBILE */}
              <DataGrid
                rows={payments}
                columns={[
                  { 
                    field: 'doctorName', 
                    headerName: 'Doctor', 
                    flex: 1,
                    minWidth: 150, // MINIMUM WIDTH
                    renderCell: (params) => (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: theme.palette.primary.main,
                          width: { xs: 28, sm: 32 }, // SMALLER ON MOBILE
                          height: { xs: 28, sm: 32 }
                        }}>
                          <People fontSize="small" />
                        </Avatar>
                        <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          {params.value}
                        </Typography>
                      </Box>
                    )
                  },
                  { 
                    field: 'amount', 
                    headerName: 'Amount', 
                    flex: 1,
                    minWidth: 100,
                    renderCell: (params) => (
                      <Typography 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        ₹{params.value.toLocaleString()}
                      </Typography>
                    )
                  },
                  { 
                    field: 'status', 
                    headerName: 'Status', 
                    flex: 1,
                    minWidth: 120,
                    renderCell: (params) => (
                      <Chip
                        label={params.value}
                        color={params.value === 'Paid' ? 'success' : 'warning'}
                        icon={params.value === 'Paid' ? <Paid /> : <PendingActions />}
                        size={window.innerWidth < 600 ? "small" : "medium"} // SMALLER ON MOBILE
                      />
                    )
                  },
                  { 
                    field: 'actions', 
                    headerName: 'Actions', 
                    width: 120,
                    renderCell: (params) => (
                      <Box>
                        <IconButton
                          onClick={() => {
                            setSelectedPayment(params.row);
                            setOpenForm(true);
                          }}
                          size={window.innerWidth < 600 ? "small" : "medium"} // SMALLER ON MOBILE
                        >
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeletePayment(params.row._id)}
                          size={window.innerWidth < 600 ? "small" : "medium"}
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Box>
                    )
                  }
                ]}
                getRowId={(row) => row._id}
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: theme.palette.mode === 'dark' ? 
                      'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  },
                  '& .MuiDataGrid-cell': {
                    fontSize: { xs: '0.875rem', sm: '1rem' } // SMALLER FONT ON MOBILE
                  }
                }}
              />
            </Box>
          </GlassCard>
        </Grid>
        <Grid item xs={12} xl={4}> {/* FULL WIDTH ON MOBILE */}
          <PaymentStatus />
        </Grid>
      </Grid>

      {/* DIALOG - RESPONSIVE */}
      <Dialog 
        open={openForm} 
        onClose={() => setOpenForm(false)} 
        maxWidth="sm" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 1, sm: 2 },
            width: { xs: '100%', sm: 'auto' }
          }
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {selectedPayment ? 'Edit Payment' : 'Record New Payment'}
        </DialogTitle>
        <DialogContent>
          <PaymentForm
            doctors={doctors}
            payment={selectedPayment}
            onSave={handleSavePayment}
            onCancel={() => {
              setSelectedPayment(null);
              setOpenForm(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Payments;
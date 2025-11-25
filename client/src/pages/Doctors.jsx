import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, IconButton, Dialog,
  Avatar, useTheme, DialogTitle, DialogContent,
  Chip, CircularProgress, Alert, Snackbar
} from '@mui/material';
import { Add, Edit, Delete, People } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import DoctorForm from '../components/doctors/DoctorForm';
import GlassCard from '../components/ui/GlassCard';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../services/api';

const Doctors = () => {
  const theme = useTheme();
  const [state, setState] = useState({
    doctors: [],
    loading: true,
    error: null,
    openForm: false,
    selectedDoctor: null,
    snackbar: { open: false, message: '', severity: 'success' }
  });

  const fetchDoctors = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await getDoctors();
      setState(prev => ({ ...prev, doctors: data, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
        snackbar: { open: true, message: error.message, severity: 'error' }
      }));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSaveDoctor = async (doctorData) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      if (state.selectedDoctor) {
        const updatedDoctor = await updateDoctor(state.selectedDoctor._id, doctorData);
        setState(prev => ({
          ...prev,
          doctors: prev.doctors.map(d => d._id === updatedDoctor._id ? updatedDoctor : d),
          loading: false,
          openForm: false,
          selectedDoctor: null,
          snackbar: { open: true, message: 'Doctor updated!', severity: 'success' }
        }));
      } else {
        const newDoctor = await createDoctor(doctorData);
        setState(prev => ({
          ...prev,
          doctors: [...prev.doctors, newDoctor],
          loading: false,
          openForm: false,
          snackbar: { open: true, message: 'Doctor created!', severity: 'success' }
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        snackbar: { open: true, message: error.message, severity: 'error' }
      }));
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await deleteDoctor(id);
      setState(prev => ({
        ...prev,
        doctors: prev.doctors.filter(d => d._id !== id),
        loading: false,
        snackbar: { open: true, message: 'Doctor deleted!', severity: 'success' }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        snackbar: { open: true, message: error.message, severity: 'error' }
      }));
    }
  };

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
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
      field: 'contact', 
      headerName: 'Contact', 
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'clinicAddress', 
      headerName: 'Address', 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'specialty', 
      headerName: 'Specialty', 
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size={window.innerWidth < 600 ? "small" : "medium"} // SMALLER ON MOBILE
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        />
      )
    },
    { 
      field: 'scheme', 
      headerName: 'Scheme', 
      width: 150,
      renderCell: (params) => (
        <Typography 
          color={params.value === '30%' ? 'secondary.main' : 'text.primary'}
          fontWeight="bold"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton 
            onClick={() => setState(prev => ({ 
              ...prev, 
              selectedDoctor: params.row, 
              openForm: true 
            }))}
            size={window.innerWidth < 600 ? "small" : "medium"} // SMALLER ON MOBILE
          >
            <Edit />
          </IconButton>
          <IconButton 
            onClick={() => handleDeleteDoctor(params.id)} 
            color="error"
            size={window.innerWidth < 600 ? "small" : "medium"}
          >
            <Delete />
          </IconButton>
        </Box>
      )
    }
  ];

  if (state.loading && state.doctors.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (state.error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {state.error}
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, // RESPONSIVE PADDING
    }}>
      {/* HEADER - RESPONSIVE */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 4,
        mt: { xs: 2, sm: 4 },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } }}
        >
          Doctor Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setState(prev => ({ ...prev, openForm: true }))}
          sx={{
            borderRadius: 3,
            px: { xs: 2, sm: 3 },
            py: 1,
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            boxShadow: theme.shadows[4],
            '&:hover': { boxShadow: theme.shadows[8] },
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Add Doctor
        </Button>
      </Box>

      <GlassCard title="Doctor Directory">
        <Box sx={{ height: { xs: 500, sm: 600 } }}> {/* SMALLER HEIGHT ON MOBILE */}
          <DataGrid
            rows={state.doctors}
            columns={columns}
            getRowId={(row) => row._id}
            loading={state.loading}
            disableSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.05)',
              },
              '& .MuiDataGrid-cell': {
                fontSize: { xs: '0.875rem', sm: '1rem' } // SMALLER FONT ON MOBILE
              }
            }}
          />
        </Box>
      </GlassCard>

      {/* DIALOG - RESPONSIVE */}
      <Dialog 
        open={state.openForm} 
        onClose={() => setState(prev => ({ ...prev, openForm: false, selectedDoctor: null }))}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 1, sm: 2 },
            width: { xs: '100%', sm: 'auto' }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}>
          {state.selectedDoctor ? 'Edit Doctor' : 'Add New Doctor'}
        </DialogTitle>
        <DialogContent>
          <DoctorForm 
            doctor={state.selectedDoctor}
            onSave={handleSaveDoctor}
            onCancel={() => setState(prev => ({ ...prev, openForm: false, selectedDoctor: null }))}
          />
        </DialogContent>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={state.snackbar.open}
        autoHideDuration={6000}
        onClose={() => setState(prev => ({ ...prev, snackbar: { ...prev.snackbar, open: false } }))}
      >
        <Alert 
          onClose={() => setState(prev => ({ ...prev, snackbar: { ...prev.snackbar, open: false } }))} 
          severity={state.snackbar.severity}
          sx={{ width: '100%' }}
        >
          {state.snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Doctors;
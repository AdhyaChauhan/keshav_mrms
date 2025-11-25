import React from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  MenuItem,
  useTheme,
  InputAdornment
} from '@mui/material';
import {
  Business,
  Phone,
  Email,
  LocationOn,
  MedicalServices
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DoctorForm = ({ doctor, onSave, onCancel }) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: doctor?.name || '',
      contact: doctor?.contact || '',
      email: doctor?.email || '',
      clinicAddress: doctor?.clinicAddress || '',
      specialty: doctor?.specialty || '',
      scheme: doctor?.scheme || '20%'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Doctor name is required'),
      contact: Yup.string()
        .required('Contact number is required')
        .matches(/^[0-9]{10}$/, 'Contact must be 10 digits'),
      email: Yup.string().email('Invalid email address'),
      clinicAddress: Yup.string().required('Clinic address is required'),
      specialty: Yup.string().required('Specialty is required'),
      scheme: Yup.string().required('Commission scheme is required')
    }),
    onSubmit: (values) => {
      onSave(values);
    }
  });

  const specialties = [
    'Cardiology',
    'Pediatrics',
    'Orthopedics',
    'General Medicine',
    'Dermatology',
    'Neurology',
    'Gynecology',
    'Psychiatry',
    'Dentistry',
    'Ophthalmology'
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}> {/* Reduced spacing for mobile */}
        
        {/* Doctor Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Doctor Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size={window.innerWidth < 600 ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MedicalServices />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Contact Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contact Number"
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            size={window.innerWidth < 600 ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email (Optional)"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            size={window.innerWidth < 600 ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Clinic Address */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Clinic Address"
            name="clinicAddress"
            value={formik.values.clinicAddress}
            onChange={formik.handleChange}
            error={formik.touched.clinicAddress && Boolean(formik.errors.clinicAddress)}
            helperText={formik.touched.clinicAddress && formik.errors.clinicAddress}
            multiline
            rows={2}
            size={window.innerWidth < 600 ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Specialty */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Specialty"
            name="specialty"
            value={formik.values.specialty}
            onChange={formik.handleChange}
            error={formik.touched.specialty && Boolean(formik.errors.specialty)}
            helperText={formik.touched.specialty && formik.errors.specialty}
            size={window.innerWidth < 600 ? "small" : "medium"}
          >
            <MenuItem value="">Select Specialty</MenuItem>
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Commission Scheme */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Commission Scheme"
            name="scheme"
            value={formik.values.scheme}
            onChange={formik.handleChange}
            error={formik.touched.scheme && Boolean(formik.errors.scheme)}
            helperText={formik.touched.scheme && formik.errors.scheme}
            size={window.innerWidth < 600 ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business />
                </InputAdornment>
              )
            }}
          >
            <MenuItem value="20%">20% Commission</MenuItem>
            <MenuItem value="30%">30% Commission</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

      </Grid>

      {/* Buttons - Responsive Layout */}
      <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' } // Stack vertically on mobile
      }}>
        <Button 
          variant="outlined" 
          onClick={onCancel}
          fullWidth={window.innerWidth < 600} // Full width on mobile
          size={window.innerWidth < 600 ? "small" : "medium"}
          sx={{
            borderColor: theme.palette.grey[400],
            color: theme.palette.text.primary
          }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained"
          fullWidth={window.innerWidth < 600} // Full width on mobile
          size={window.innerWidth < 600 ? "small" : "medium"}
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5B5FEB 0%, #7C51F4 100%)',
              boxShadow: theme.shadows[4]
            }
          }}
        >
          {doctor ? 'Update Doctor' : 'Add Doctor'}
        </Button>
      </Box>
    </form>
  );
};

export default DoctorForm;
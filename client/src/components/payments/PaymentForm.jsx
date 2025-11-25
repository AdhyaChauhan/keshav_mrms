import { 
  TextField, Grid, useTheme, Button, 
  Box, InputAdornment, MenuItem 
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MonetizationOn, CalendarToday } from '@mui/icons-material';

const PaymentForm = ({ doctors = [], payment, onSave, onCancel }) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      doctorId: payment?.doctorId || '',
      amount: payment?.amount || '',
      date: payment?.date ? new Date(payment.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      method: payment?.method || 'Cash',
      notes: payment?.notes || '',
      status: payment?.status || 'Paid'
    },
    validationSchema: Yup.object({
      doctorId: Yup.string().required('Doctor is required'),
      amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be positive'),
      date: Yup.date()
        .required('Date is required')
        .max(new Date(), 'Date cannot be in the future'), // FUTURE DATE VALIDATION
      method: Yup.string().required('Payment method is required')
    }),
    onSubmit: (values) => {
      onSave(values);
    }
  });

  // Function to disable future dates in date picker
  const disableFutureDates = (date) => {
    return date > new Date();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* Doctor Selection */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Doctor"
            name="doctorId"
            value={formik.values.doctorId}
            onChange={formik.handleChange}
            error={formik.touched.doctorId && Boolean(formik.errors.doctorId)}
            helperText={formik.touched.doctorId && formik.errors.doctorId}
            size={window.innerWidth < 600 ? "small" : "medium"}
          >
            <MenuItem value="" disabled>Select Doctor</MenuItem>
            {doctors.map((doctor) => (
              <MenuItem key={doctor._id} value={doctor._id}>
                {doctor.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Amount */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOn />
                </InputAdornment>
              )
            }}
            size={window.innerWidth < 600 ? "small" : "medium"}
          />
        </Grid>

        {/* Date */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
              // Disable future dates in the date picker
              inputProps: {
                max: new Date().toISOString().split('T')[0] // Set max date to today
              }
            }}
            size={window.innerWidth < 600 ? "small" : "medium"}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* Payment Method */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Payment Method"
            name="method"
            value={formik.values.method}
            onChange={formik.handleChange}
            error={formik.touched.method && Boolean(formik.errors.method)}
            helperText={formik.touched.method && formik.errors.method}
            size={window.innerWidth < 600 ? "small" : "medium"}
          >
            {['Cash', 'Bank Transfer', 'UPI', 'Cheque'].map((method) => (
              <MenuItem key={method} value={method}>{method}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Status */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            size={window.innerWidth < 600 ? "small" : "medium"}
          >
            {['Pending', 'Paid'].map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Notes */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes"
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            multiline
            rows={3}
            size={window.innerWidth < 600 ? "small" : "medium"}
          />
        </Grid>
      </Grid>

      <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <Button 
          variant="outlined" 
          onClick={onCancel}
          fullWidth={window.innerWidth < 600}
          size={window.innerWidth < 600 ? "small" : "medium"}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained"
          fullWidth={window.innerWidth < 600}
          size={window.innerWidth < 600 ? "small" : "medium"}
          sx={{ 
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
          }}
        >
          {payment ? 'Update Payment' : 'Record Payment'}
        </Button>
      </Box>
    </form>
  );
};

export default PaymentForm;
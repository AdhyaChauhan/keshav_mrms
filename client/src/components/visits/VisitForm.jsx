import { 
    TextField, 
    Grid,
    useTheme,
    Button,
    Box,
    InputAdornment,
    Autocomplete
  } from '@mui/material';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import { CalendarToday, Person, Description } from '@mui/icons-material';
  
  const VisitForm = ({ doctors, onSave, onCancel }) => {
    const theme = useTheme();
  
    const formik = useFormik({
      initialValues: {
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        purpose: '',
        notes: ''
      },
      validationSchema: Yup.object({
        doctorId: Yup.string().required('Required'),
        date: Yup.date().required('Required'),
        purpose: Yup.string().required('Required')
      }),
      onSubmit: (values) => {
        onSave(values);
      }
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4} padding={5}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={doctors}
              getOptionLabel={(option) => option.name}
              value={doctors.find(d => d.id === formik.values.doctorId) || null}
              onChange={(e, value) => formik.setFieldValue('doctorId', value?.id || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Doctor"
                  error={formik.touched.doctorId && Boolean(formik.errors.doctorId)}
                  helperText={formik.touched.doctorId && formik.errors.doctorId}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              )}
            />
          </Grid>
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
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Purpose"
              name="purpose"
              value={formik.values.purpose}
              onChange={formik.handleChange}
              error={formik.touched.purpose && Boolean(formik.errors.purpose)}
              helperText={formik.touched.purpose && formik.errors.purpose}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              multiline
              rows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4,mb:2,mr:5,  display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={onCancel}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit" 
            variant="contained"
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1,
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
            }}
          >
            Schedule Visit
          </Button>
        </Box>
      </form>
    );
  };
  
  export default VisitForm;
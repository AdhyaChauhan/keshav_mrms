import { 
  Box, 
  Typography, 
  Button,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  useTheme
} from '@mui/material';
import { 
  Add,
  MedicalServices
} from '@mui/icons-material';
import { useState } from 'react';
import format from 'date-fns/format';
import VisitForm from '../components/visits/VisitForm';
import VisitCalendar from '../components/visits/VisitCalendar';
import GlassCard from '../components/ui/GlassCard';

const Visits = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      title: 'Dr. Sharma - Product Demo',
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 11, 0),
      doctor: 'Dr. Amit Sharma',
      purpose: 'CardioPlus Demonstration'
    }
  ]);

  const [doctors] = useState([
    { id: '1', name: 'Dr. Amit Sharma' },
    { id: '2', name: 'Dr. Priya Patel' },
    { id: '3', name: 'Dr. Rajesh Kumar' }
  ]);

  const handleSaveEvent = (formData) => {
    const doctor = doctors.find(d => d.id === formData.doctorId);
    const newEvent = {
      title: `${doctor.name} - ${formData.purpose}`,
      start: new Date(formData.date),
      end: new Date(new Date(formData.date).setHours(new Date(formData.date).getHours() + 1)),
      doctor: doctor.name,
      purpose: formData.purpose,
      notes: formData.notes
    };

    if (selectedEvent) {
      setEvents(events.map(e => e === selectedEvent ? newEvent : e));
    } else {
      setEvents([...events, newEvent]);
    }
    setOpenForm(false);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, // RESPONSIVE PADDING
      mt: { xs: 2, sm: 4 } // RESPONSIVE MARGIN
    }}>
      {/* HEADER - RESPONSIVE */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' }, // STACK ON MOBILE
        flexDirection: { xs: 'column', sm: 'row' }, // COLUMN ON MOBILE
        mb: 4,
        gap: { xs: 2, sm: 0 } // GAP ON MOBILE
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } }} // RESPONSIVE FONT
        >
          Visit Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedEvent(null);
            setOpenForm(true);
          }}
          sx={{
            borderRadius: 3,
            px: { xs: 2, sm: 3 }, // RESPONSIVE PADDING
            py: 1,
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            boxShadow: theme.shadows[4],
            '&:hover': { boxShadow: theme.shadows[8] },
            fontSize: { xs: '0.875rem', sm: '1rem' } // RESPONSIVE FONT
          }}
        >
          Schedule Visit
        </Button>
      </Box>

      {/* MAIN CONTENT - RESPONSIVE GRID */}
      <Grid container spacing={3}> {/* REDUCED SPACING */}
        <Grid item xs={12} lg={8}> {/* FULL WIDTH ON MOBILE */}
          <VisitCalendar 
            visits={events}
            onSelectEvent={(event) => {
              setSelectedEvent(event);
              setOpenForm(true);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={4}> {/* FULL WIDTH ON MOBILE */}
          <GlassCard title="Today's Visits">
            <List>
              {events.filter(e => 
                e.start.toDateString() === new Date().toDateString()
              ).map((event, i) => (
                <ListItem 
                  key={i} 
                  button 
                  onClick={() => {
                    setSelectedEvent(event);
                    setOpenForm(true);
                  }}
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' }, // STACK ON MOBILE
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: theme.palette.primary.main,
                      width: { xs: 32, sm: 40 }, // SMALLER ON MOBILE
                      height: { xs: 32, sm: 40 }
                    }}>
                      <MedicalServices fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        fontWeight="500" 
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        {event.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography 
                          variant="body2" 
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        >
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                        </Typography>
                        <Chip 
                          label={event.purpose} 
                          size="small" 
                          sx={{ 
                            mt: 1,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' } // SMALLER ON MOBILE
                          }}
                        />
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </GlassCard>
        </Grid>
      </Grid>

      {/* DIALOG - RESPONSIVE */}
      <Dialog 
        open={openForm} 
        onClose={() => setOpenForm(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 1, sm: 2 }, // SMALLER MARGIN ON MOBILE
            width: { xs: '100%', sm: 'auto' } // FULL WIDTH ON MOBILE
          }
        }}
      >
        <VisitForm
          doctors={doctors}
          initialValues={selectedEvent ? {
            doctorId: doctors.find(d => d.name === selectedEvent.doctor)?.id || '',
            date: format(selectedEvent.start, 'yyyy-MM-dd'),
            purpose: selectedEvent.purpose,
            notes: selectedEvent.notes || ''
          } : undefined}
          onSave={handleSaveEvent}
          onCancel={() => setOpenForm(false)}
        />
      </Dialog>
    </Box>
  );
};

export default Visits;
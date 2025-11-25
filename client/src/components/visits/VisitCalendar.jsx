import { useTheme, Box } from '@mui/material'; // Added Box import
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GlassCard from '../ui/GlassCard';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const VisitCalendar = ({ visits, onSelectEvent }) => {
  const theme = useTheme();

  return (
    <GlassCard title="Visit Calendar">
      <Box sx={{ height: 600, p: 2 }}>
        <Calendar
          localizer={localizer}
          events={visits}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={onSelectEvent}
          style={{ 
            borderRadius: theme.shape.borderRadius
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: theme.palette.primary.main,
              borderRadius: theme.shape.borderRadius,
              border: 'none',
              color: theme.palette.primary.contrastText
            }
          })}
        />
      </Box>
    </GlassCard>
  );
};

export default VisitCalendar;
import { 
  Box, 
  IconButton, 
  useTheme,
  Tooltip,
  Avatar
} from '@mui/material';
import { 
  Edit, 
  Delete,
  People
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import GlassCard from '../ui/GlassCard';

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  const theme = useTheme();

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ 
            bgcolor: theme.palette.primary.main,
            width: 36, 
            height: 36 
          }}>
            <People />
          </Avatar>
          {params.value}
        </Box>
      )
    },
    { field: 'contact', headerName: 'Contact', flex: 1 },
    { 
      field: 'specialty', 
      headerName: 'Specialty', 
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText
          }}
        >
          {params.value}
        </Box>
      )
    },
    { 
      field: 'scheme', 
      headerName: 'Scheme', 
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 4,
            backgroundColor: 
              params.value === '30%' ? 
                theme.palette.warning.light : 
                theme.palette.success.light,
            color: 
              params.value === '30%' ? 
                theme.palette.warning.contrastText : 
                theme.palette.success.contrastText
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(params.row)}>
              <Edit color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(params.id)}>
              <Delete color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <GlassCard title="Doctor Directory">
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={doctors}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.mode === 'dark' ? 
                'rgba(255, 255, 255, 0.05)' : 
                'rgba(0, 0, 0, 0.05)',
            },
          }}
        />
      </Box>
    </GlassCard>
  );
};

export default DoctorList;
import { 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { FormInputText, FormRating } from '@/components';
import NewPlayerValidations from '../../validations/PlayerValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { addPlayer } from '@/services/features/playerSlice';

export default function AddNewPlayers() {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(NewPlayerValidations),
    defaultValues: {
      name: '',
      rating: null
    }
  });
  const players = useAppSelector((state) => state.player.players);

  const handleAddPlayer = (data: any) => {
    dispatch(addPlayer({ 
      ...data, 
      id: players.length + 1 
    }));
    reset();
  };

  return (
    <Container maxWidth="sm">
      
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 4, 
          p: 3, 
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            color: 'primary.main',
            mb: 3 
          }}
        >
          Add New Player
        </Typography>
        
        <form onSubmit={handleSubmit(handleAddPlayer)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInputText 
                name="name" 
                control={control} 
                label="Player Name" 
              />
            </Grid>
            <Grid item xs={12} sm={6} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <FormRating 
                name="rating" 
                control={control} 
                label="Player Rating" 
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                startIcon={<AddIcon />}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                Add Player
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

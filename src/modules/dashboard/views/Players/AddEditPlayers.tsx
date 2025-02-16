import { useEffect } from 'react';
import { Button, Container, Paper, Typography, Dialog, DialogTitle, DialogContent, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/app/hooks';
import { addPlayer, updatePlayer } from '@/services/features/playerSlice';
import { FormInputText, FormRating } from '@/components';
import NewPlayerValidations from '../../validations/NewPlayerValidations';
import { Player } from '@/services/features/playerSlice';
import { playerMockService } from '@/services/api/playerMockService';

export default function AddEditPlayers({
  handleClose,
  open,
  type,
  existingPlayer,
}: {
  handleClose: () => void;
  open: boolean;
  type: string;
  existingPlayer?: Player | null;
}) {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(NewPlayerValidations),
    defaultValues: { name: '', rating: 0 },
  });

  useEffect(() => {
    reset(
      type === 'edit' && existingPlayer
        ? { name: existingPlayer.name, rating: existingPlayer.rating }
        : { name: '', rating: 0 }
    );
  }, [open, type, existingPlayer, reset]);

  const handleFormSubmission = async (data: any) => {
    try {
      if (type === 'add') {
        // Simulate API call
        const newPlayer = await playerMockService.addPlayer(data);
        dispatch(addPlayer(newPlayer));
      } else if (type === 'edit' && existingPlayer) {
        // Simulate API call
        const updatedPlayer = await playerMockService.updatePlayer({ ...data, id: existingPlayer.id });
        dispatch(updatePlayer(updatedPlayer));
      }
      reset();
      handleClose();
    } catch (error) {
      // Handle API errors
      console.error('Player submission error:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'primary.main' }}>
          {type === 'add' ? 'Add New' : 'Edit'} Player
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Container>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
            <form onSubmit={handleSubmit(handleFormSubmission)}>
              <Stack spacing={2}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <FormInputText name="name" control={control} label="Player Name" />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FormRating name="rating" control={control} label="Player Rating" />
                  </Box>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<AddIcon />}
                  sx={{ mt: 2, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                >
                  {type === 'add' ? 'Add Player' : 'Update Player'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

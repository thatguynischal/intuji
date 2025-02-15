import { Container, Button } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import PlayersList from './PlayersList';
import AddEditPlayers from './AddEditPlayers';
import Box from '@mui/material/Box';
import { stepsIncrement } from '@/services/features/playerSlice';
import { useAppDispatch } from '@/app/hooks';
import Dialog from '@/components/Dialog';

export default function AddNewPlayers() {
  const players = useAppSelector((state) => state.player.players);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const onSuccess = () => {
    dispatch(stepsIncrement());
  };

  return (
    <Container maxWidth="sm">
      <PlayersList players={players} />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        Add New Player
      </Button>
      <AddEditPlayers handleClose={() => setOpen(false)} open={open} type="add" />
      <Dialog title="Continue" open={dialogOpen} handleClose={() => setDialogOpen(false)} onSuccess={onSuccess}>
        Are you sure you want to continue to team creation with {players.length} players?
      </Dialog>
      <Box sx={{ mb: 2, mt: 2 }}>
        <div>
          <Button variant="contained" onClick={() => setDialogOpen(true)} sx={{ mt: 1, mr: 1 }}>
            {'Continue'}
          </Button>
        </div>
      </Box>
    </Container>
  );
}

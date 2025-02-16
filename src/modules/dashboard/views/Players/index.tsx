import { Box, CardContent, Button, Typography } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import PlayersList from './PlayersList';
import AddEditPlayers from './AddEditPlayers';
import { stepsIncrement } from '@/services/features/playerSlice';
import { useAppDispatch } from '@/app/hooks';
import Dialog from '@/components/Dialog';
import SendIcon from '@mui/icons-material/Send';

export default function AddNewPlayers() {
  const players = useAppSelector((state) => state.player.players);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const onSuccess = () => {
    dispatch(stepsIncrement());
  };

  return (
    <Box>
      <CardContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Add Player
        </Typography>
        <PlayersList players={players} />
        <Button
          variant="contained"
          color="info"
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
          Are you sure you want to continue to team creation with total of{' '}
          <Box component="div" sx={{ display: 'inline', color: 'green', fontWeight: 'bold' }}>
            {players.length}
          </Box>{' '}
          players?
        </Dialog>
        <Button
          variant="contained"
          color="info"
          startIcon={<SendIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            ps: 2,
            m: 2,
          }}
        >
          Continue to Next Step
        </Button>
      </CardContent>
    </Box>
  );
}

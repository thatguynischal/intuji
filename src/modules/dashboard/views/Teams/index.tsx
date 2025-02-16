import { Box, CardContent, Alert, Button, useMediaQuery, useTheme } from '@mui/material';
import { Add as AddIcon, Send as SendIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import AddEditTeams from './AddEditTeams';
import TeamList from './TeamList';
import Dialog from '@/components/Dialog';
import { stepsIncrement, stepsDecrement } from '@/services/features/playerSlice';
import { validatePlayerTeamCount } from '../../utils';
import { toast } from 'react-toastify';

export default function CreateTeams() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.player.players);
  const teams = useAppSelector((state) => state.team.teams);

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddTeam = () => setOpen(true);
  const handleCloseAddTeam = () => setOpen(false);
  const handleContinue = async () => {
    try {
      validatePlayerTeamCount(players, teams);
      dispatch(stepsIncrement());
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
      return;
    }
    setDialogOpen(false);
  };
  const handleBack = () => dispatch(stepsDecrement());

  return (
    <>
      <Alert 
        severity="info" 
        sx={{ 
          mb: 2, 
          '& .MuiAlert-message': { width: '100%' } 
        }}
      >
        You have {players.length} total players available for team creation.
      </Alert>

      <Box>
        <CardContent 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2 
          }}
        >
          <TeamList teams={teams} />

          <Button
            fullWidth={isMobile}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTeam}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Add Team
          </Button>

          <AddEditTeams 
            handleClose={handleCloseAddTeam} 
            open={open} 
            type="add" 
          />

          <Dialog 
            title="Confirm Team Generation" 
            open={dialogOpen} 
            handleClose={() => setDialogOpen(false)} 
            onSuccess={handleContinue}
          >
            Are you sure you want to generate {teams.length} teams 
            with a total of {players.length} players?
          </Dialog>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2, 
              width: '100%' 
            }}
          >
            <Button
              variant="contained"
              color="info"
              startIcon={<SendIcon />}
              onClick={() => setDialogOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Generate Teams
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<BackIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Box>
    </>
  );
}

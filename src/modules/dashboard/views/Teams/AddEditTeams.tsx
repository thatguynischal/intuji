import { useEffect } from 'react';
import { Button, Container, Paper, Typography, Dialog, DialogTitle, DialogContent, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { addTeam, updateTeam } from '@/services/features/teamSlice';
import { FormInputText } from '@/components';
import NewTeamValidations from '../../validations/NewTeamValidations';
import { Team } from '@/utils/globalTypes';

export default function AddEditTeams({
  handleClose,
  open,
  type,
  existingTeam,
}: {
  handleClose: () => void;
  open: boolean;
  type: string;
  existingTeam?: Team | null;
}) {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(NewTeamValidations),
    defaultValues: { name: '' },
  });
  const teams = useAppSelector((state) => state.team.teams);

  useEffect(() => {
    reset(type === 'edit' && existingTeam ? { name: existingTeam.name } : { name: '' });
  }, [open, type, existingTeam, reset]);

  const handleFormSubmission = (data: any) => {
    if (type === 'add') dispatch(addTeam({ ...data, id: teams.length + 1 }));
    else if (type === 'edit' && existingTeam) dispatch(updateTeam({ ...data, id: existingTeam.id }));
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'primary.main' }}>
          {type === 'add' ? 'Add New' : 'Edit'} Team
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Container>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
            <form onSubmit={handleSubmit(handleFormSubmission)}>
              <Stack spacing={2}>
                <Box sx={{ display: 'grid', gap: 2, width: '100%' }}>
                  <FormInputText name="name" control={control} label="Team Name" />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<AddIcon />}
                  sx={{ mt: 2, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                >
                  {type === 'add' ? 'Add Team' : 'Update Team'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

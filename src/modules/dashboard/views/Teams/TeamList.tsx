import React, { useState, useMemo } from 'react';
import { List, ListItem, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { removeTeam } from '@/services/features/teamSlice';
import Dialog from '@/components/Dialog';
import AddEditTeams from './AddEditTeams';
import { Team } from '@/utils/globalTypes';

interface TeamListProps {
  teams?: Team[];
}

export default function TeamList({ teams: propTeams }: TeamListProps) {
  const globalTeams = useAppSelector((state) => state.team.teams);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const displayTeams = useMemo(() => propTeams || globalTeams, [propTeams, globalTeams]);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>, team: Team) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTeam(null);
  };

  const handleDelete = () => {
    if (selectedTeam) {
      dispatch(removeTeam(selectedTeam));
      handleClose();
      setDialogOpen(false);
    }
  };

  const confirmDelete = () => setDialogOpen(true);

  const handleEditClose = () => {
    setOpenEdit(false);
    handleClose();
  };

  const renderTeamItem = (team: Team, index: number) => (
    <ListItem key={index} sx={{ borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography variant="body1" sx={{ mx: 3 }}>{team.name}</Typography>
        <IconButton onClick={(e) => handleMoreClick(e, team)}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </ListItem>
  );

  return (
    <List sx={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
      {displayTeams.length > 0 ? (
        displayTeams.map(renderTeamItem)
      ) : (
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No teams added yet
        </Typography>
      )}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => setOpenEdit(true)}>Edit</MenuItem>
        <MenuItem onClick={confirmDelete}>Delete</MenuItem>
      </Menu>
      <Dialog title="Delete Team" open={dialogOpen} handleClose={() => setDialogOpen(false)} onSuccess={handleDelete}>
        Are you sure you want to delete {selectedTeam?.name}?
      </Dialog>
      <AddEditTeams 
        existingTeam={selectedTeam} 
        handleClose={handleEditClose} 
        open={openEdit} 
        type="edit" 
      />
    </List>
  );
}

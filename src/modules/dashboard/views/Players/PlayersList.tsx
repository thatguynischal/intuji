import React, { useState, useMemo } from 'react';
import { List, ListItem, Typography, IconButton, Box, Rating, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { Player, removePlayer } from '@/services/features/playerSlice';
import Dialog from '@/components/Dialog';
import AddEditPlayers from './AddEditPlayers';

interface PlayersListProps {
  players?: Player[];
}

export default function PlayersList({ players: propPlayers }: PlayersListProps) {
  const globalPlayers = useAppSelector((state) => state.player.players);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const displayPlayers = useMemo(() => propPlayers || globalPlayers, [propPlayers, globalPlayers]);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>, player: Player) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlayer(player);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPlayer(null);
  };

  const handleDelete = () => {
    if (selectedPlayer) {
      dispatch(removePlayer(selectedPlayer));
      handleClose();
      setDialogOpen(false);
    }
  };

  const confirmDelete = () => setDialogOpen(true);

  const handleEditClose = () => {
    setOpenEdit(false);
    handleClose();
  };

  const renderPlayerItem = (player: Player, index: number) => (
    <ListItem key={index} sx={{ borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography variant="body1" sx={{ mx: 3 }}>{player.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mx: 3 }}>
          <Rating value={player.rating} readOnly size="small" />
        </Box>
        <IconButton onClick={(e) => handleMoreClick(e, player)}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </ListItem>
  );

  return (
    <List sx={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
      {displayPlayers.length > 0 ? (
        displayPlayers.map(renderPlayerItem)
      ) : (
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No players added yet
        </Typography>
      )}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => setOpenEdit(true)}>Edit</MenuItem>
        <MenuItem onClick={confirmDelete}>Delete</MenuItem>
      </Menu>
      <Dialog title="Delete Player" open={dialogOpen} handleClose={() => setDialogOpen(false)} onSuccess={handleDelete}>
        Are you sure you want to delete {selectedPlayer?.name}?
      </Dialog>
      <AddEditPlayers 
        existingPlayer={selectedPlayer} 
        handleClose={handleEditClose} 
        open={openEdit} 
        type="edit" 
      />
    </List>
  );
}

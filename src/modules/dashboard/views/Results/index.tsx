import { Box, Button, Typography, CardContent, IconButton, Tooltip } from '@mui/material';
import { Send as SendIcon, ArrowBack as BackIcon, ContentCopy as CopyIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { stepsDecrement, stepsIncrement } from '@/services/features/playerSlice';
import { dividePlayersIntoTeams } from '@/modules/dashboard/utils';
import Results from './Results';
import { useState, useEffect, useMemo } from 'react';

const TeamResults = () => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.player);
  const { teams } = useAppSelector((state) => state.team);
  const [shareLink, setShareLink] = useState('');
  const [copyTooltip, setCopyTooltip] = useState('Copy link');

  const canGenerateTeams = useMemo(() => 
    teams.length >= 2 && players.length >= teams.length, 
    [teams, players]
  );

  const generateShareLink = () => {
    try {
      const balancedTeams = dividePlayersIntoTeams(players, teams);
      return `${window.location.origin}/shared-results/${btoa(JSON.stringify(balancedTeams))}`;
    } catch (error) {
      return null;
    }
  };

  const copyShareLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).then(() => {
        setCopyTooltip('Copied!');
        setTimeout(() => setCopyTooltip('Copy link'), 2000);
      });
    }
  };

  useEffect(() => {
    if (canGenerateTeams) {
      const link = generateShareLink();
      if (link) {
        setShareLink(link);
      }
    }
  }, [canGenerateTeams]);

  return (
    <Box>
      <Typography variant="subtitle2" align="center">
        Share Results
      </Typography>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {shareLink && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 1, 
            backgroundColor: 'rgba(0,0,0,0.05)', 
            padding: 1, 
            borderRadius: 1 
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                maxWidth: '80%', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {shareLink}
            </Typography>
            <Tooltip title={copyTooltip}>
              <IconButton 
                size="small" 
                onClick={copyShareLink}
                color="primary"
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <Typography variant="h6" align="center">
          Randomly Generated Teams with {players.length} Players and {teams.length} Teams
        </Typography>

        {canGenerateTeams ? (
          <>
            <Results balancedTeams={dividePlayersIntoTeams(players, teams)} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                color="info" 
                startIcon={<SendIcon />} 
                onClick={() => dispatch(stepsIncrement())}
              >
                Finish
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<BackIcon />}
                onClick={() => dispatch(stepsDecrement())}
              >
                Back
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="error" align="center">
            Please add at least 2 teams and ensure the number of players is greater than or equal to the number of teams.
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<BackIcon />}
              onClick={() => dispatch(stepsDecrement())}
              sx={{ ml: 2 }}
            >
              Back
            </Button>
          </Typography>
        )}
      </CardContent>
    </Box>
  );
};

export default TeamResults;

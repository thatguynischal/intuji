import React from 'react';
import { 
  Box, 
  Typography, 
  Stack,
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';

interface ResultsProps {
  balancedTeams: Array<{
    id: number;
    name: string;
    players: Array<{
      id: string;
      name: string;
      rating: number;
    }>;
  }>;
}

const Results: React.FC<ResultsProps> = ({ balancedTeams }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        useFlexGap
        flexWrap="wrap"
      >
        {balancedTeams.map((team) => (
          <Paper 
            key={team.id} 
            elevation={2} 
            sx={{ 
              p: 2, 
              width: { xs: '100%', md: 'calc(50% - 24px)' },
              boxSizing: 'border-box' 
            }}
          >
            <Typography 
              variant="h6" 
              color="primary" 
              sx={{ mb: 2, textAlign: 'center' }}
            >
              {team.name}
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Player Name</TableCell>
                    <TableCell align="right">Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell component="th" scope="row">
                        {player.name}
                      </TableCell>
                      <TableCell align="right">{player.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Results;

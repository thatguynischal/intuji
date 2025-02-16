import { Box, Typography, Container, Card, CardContent, Stack, Rating } from '@mui/material';
import React from 'react';
import { Team } from '@/utils/globalTypes';

const RenderTeams = React.memo(({ teams, error }: { teams: Team[]; error: string | null }) => {
  if (error || teams.length === 0) return null;
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Randomly Generated Teams
        </Typography>
          <Stack
            spacing={3}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {teams.map((team) => (
              <Card
                key={team.id}
                elevation={3}
                sx={{
                  width: { xs: '100%', md: '45%' },
                  minWidth: 300,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {team.name}
                  </Typography>
                  <Stack spacing={1}>
                    {team.players.map((player) => (
                      <Typography
                        key={player.id}
                        variant="body1"
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        {player.name} <Rating value={player.rating} readOnly />
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Container>
    );
  });

  export default RenderTeams;
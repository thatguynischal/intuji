import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import RenderTeams from './RenderTeams';
import { Team } from '@/utils/globalTypes';

const SharedResults: React.FC = () => {
  const { encodedTeams } = useParams<{ encodedTeams: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log('Encoded Teams:', encodedTeams);

  const decodeTeams = useCallback(() => {
    if (!encodedTeams) {
      setError('No team data provided');
      console.error('No encoded teams found');
      return;
    }

    try {
      const decodedTeamsData = atob(encodedTeams);
      const parsedTeams = JSON.parse(decodedTeamsData);
      setTeams(parsedTeams);
      setError(null);
    } catch (err) {
      setError('Invalid shared results link');
    }
  }, [encodedTeams]);

  useEffect(() => {
    decodeTeams();
  }, [decodeTeams]);

  const renderError = useMemo(() => {
    if (!error) return null;
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }, [error]);

  return (
    <>
      {renderError}
      {teams.length > 0 && <RenderTeams teams={teams} error={null} />}
    </>
  );
};

export default SharedResults;

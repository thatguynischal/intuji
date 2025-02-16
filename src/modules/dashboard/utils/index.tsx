export const validatePlayerTeamCount = (players: any[], teams: any[]) => {
  if(teams.length < 2) {
    throw new Error('Number of teams must be at least 2.');
  }
  if (players.length < teams.length) {
    throw new Error('Number of players cannot be less than number of teams.');
  }
  return true;
};

export const dividePlayersIntoTeams = (players: any[], teams: any[]) => {
  validatePlayerTeamCount(players, teams);

  const balancedTeams = teams.map(team => ({ ...team, players: [] }));

  const sortedPlayers = [...players].sort((a: any, b: any) => b.rating - a.rating);
  sortedPlayers.forEach((player: any) => {
    const teamWithLowestRating = balancedTeams.reduce((lowestTeam: any, currentTeam: any) => {
      const lowestTeamRating = lowestTeam.players.reduce((sum: number, p: any) => sum + p.rating, 0);
      const currentTeamRating = currentTeam.players.reduce((sum: number, p: any) => sum + p.rating, 0);
      return currentTeamRating < lowestTeamRating ? currentTeam : lowestTeam;
    });

    teamWithLowestRating.players.push(player);
  });

  return balancedTeams;
};
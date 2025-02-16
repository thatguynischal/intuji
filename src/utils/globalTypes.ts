interface TeamPlayer {
    id: string;
    name: string;
    rating: number;
  }
  
  interface Team {
    id: number;
    name: string;
    players: TeamPlayer[];
  }

  export type { Team, TeamPlayer };
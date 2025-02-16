// src/services/api/playerMockService.ts
import { Player } from '@/services/features/playerSlice';

// Simulated delay to mimic network request
const simulateNetworkDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const playerMockService = {
  // Mock API for adding a player
  async addPlayer(player: Omit<Player, 'id'>): Promise<Player> {
    await simulateNetworkDelay();
    
    // Simulate server-side validation or processing
    if (!player.name || player.rating < 0 || player.rating > 5) {
      throw new Error('Invalid player data');
    }

    // Simulate generating an ID on the backend
    const newPlayer: Player = {
      ...player,
      id: Math.floor(Math.random() * 1000) // Simulate backend ID generation
    };

    // In a real scenario, this would be an actual API call
    console.log('Mock API: Player Added', newPlayer);
    return newPlayer;
  },

  // Mock API for updating a player
  async updatePlayer(player: Player): Promise<Player> {
    await simulateNetworkDelay();
    
    // Simulate server-side validation
    if (!player.id || !player.name || player.rating < 0 || player.rating > 5) {
      throw new Error('Invalid player data');
    }

    // Simulate backend update
    console.log('Mock API: Player Updated', player);
    return player;
  }
};
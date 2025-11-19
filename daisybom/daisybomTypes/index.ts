export type Player = {
  id: string;
  name: string;
  avatar?: string;
};

export type Category = 'sport' | 'animals' | 'dance';

export type RoundResult = {
  round: number;
  playerId: string;
  completed: boolean;
};

export type GameState = {
  player1: Player | null;
  player2: Player | null;
  category: Category | null;
  currentRound: number;
  totalRounds: number;
  results: RoundResult[];
  scores: {
    player1: number;
    player2: number;
  };
};

export type Settings = {
  vibrationEnabled: boolean;
  roundCount: 5 | 10 | 15;
};

export type Wish = {
  id: string;
  text: string;
  isDefault?: boolean;
};


// Mock data for ADHD puzzle game
export const mockUser = {
  id: '1',
  username: 'alex_player',
  email: 'alex@example.com',
  currentLevel: 5,
  totalScore: 1250,
  gamesPlayed: 12,
  streakDays: 7,
  achievements: [
    { id: 1, name: 'First Steps', description: 'Complete your first puzzle', unlocked: true },
    { id: 2, name: 'Focus Master', description: 'Complete 5 attention puzzles', unlocked: true },
    { id: 3, name: 'Memory Champion', description: 'Complete 10 memory games', unlocked: false },
    { id: 4, name: 'Speed Demon', description: 'Complete a puzzle in under 30 seconds', unlocked: true },
    { id: 5, name: 'Consistency King', description: 'Play for 7 days straight', unlocked: true }
  ],
  stats: {
    averageTime: 45,
    bestTime: 23,
    accuracyRate: 85,
    improvementRate: 12
  }
};

export const mockLevels = [
  { id: 1, name: 'Getting Started', difficulty: 'Easy', unlocked: true, completed: true, score: 95, bestTime: 42 },
  { id: 2, name: 'Pattern Recognition', difficulty: 'Easy', unlocked: true, completed: true, score: 88, bestTime: 38 },
  { id: 3, name: 'Memory Trail', difficulty: 'Easy', unlocked: true, completed: true, score: 92, bestTime: 45 },
  { id: 4, name: 'Focus Challenge', difficulty: 'Medium', unlocked: true, completed: true, score: 85, bestTime: 52 },
  { id: 5, name: 'Speed Test', difficulty: 'Medium', unlocked: true, completed: false, score: 0, bestTime: 0 },
  { id: 6, name: 'Advanced Patterns', difficulty: 'Medium', unlocked: false, completed: false, score: 0, bestTime: 0 },
  { id: 7, name: 'Memory Master', difficulty: 'Hard', unlocked: false, completed: false, score: 0, bestTime: 0 },
  { id: 8, name: 'Attention Elite', difficulty: 'Hard', unlocked: false, completed: false, score: 0, bestTime: 0 },
  { id: 9, name: 'Processing Pro', difficulty: 'Hard', unlocked: false, completed: false, score: 0, bestTime: 0 },
  { id: 10, name: 'ADHD Champion', difficulty: 'Expert', unlocked: false, completed: false, score: 0, bestTime: 0 }
];

export const mockPuzzleTypes = [
  {
    id: 1,
    name: 'Pattern Memory',
    description: 'Remember and reproduce color patterns',
    targetSkill: 'Working Memory',
    icon: '🧠',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Attention Focus',
    description: 'Find target items while ignoring distractions',
    targetSkill: 'Selective Attention',
    icon: '🎯',
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Speed Processing',
    description: 'Quick decision making under time pressure',
    targetSkill: 'Processing Speed',
    icon: '⚡',
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    name: 'Impulse Control',
    description: 'Resist incorrect responses and think before acting',
    targetSkill: 'Inhibitory Control',
    icon: '🛡️',
    color: 'bg-red-500'
  }
];

export const mockGameSession = {
  id: 'session_1',
  levelId: 5,
  puzzleType: 'Pattern Memory',
  startTime: new Date(),
  currentRound: 1,
  totalRounds: 3,
  score: 0,
  timeRemaining: 60,
  breakTime: 180, // 3 minutes in seconds
  needsBreak: false,
  consecutiveGames: 2
};

export const mockDailyChallenge = {
  id: 'daily_1',
  date: new Date().toISOString().split('T')[0],
  title: 'Memory Marathon',
  description: 'Complete 3 memory puzzles in a row',
  difficulty: 'Medium',
  reward: 50,
  progress: 1,
  target: 3,
  completed: false
};

export const mockLeaderboard = [
  { rank: 1, username: 'MindMaster', score: 2350, level: 8 },
  { rank: 2, username: 'FocusQueen', score: 2100, level: 7 },
  { rank: 3, username: 'PatternPro', score: 1890, level: 6 },
  { rank: 4, username: 'alex_player', score: 1250, level: 5 },
  { rank: 5, username: 'SpeedySam', score: 1150, level: 5 },
  { rank: 6, username: 'MemoryMage', score: 980, level: 4 },
  { rank: 7, username: 'AttentionAce', score: 850, level: 4 },
  { rank: 8, username: 'PuzzlePal', score: 720, level: 3 },
  { rank: 9, username: 'ThinkFast', score: 650, level: 3 },
  { rank: 10, username: 'BrainBoost', score: 520, level: 2 }
];
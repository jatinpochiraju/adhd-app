import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { 
  Brain, 
  Trophy, 
  Target, 
  Users, 
  Settings, 
  Home as HomeIcon,
  Play,
  Award,
  BarChart3
} from 'lucide-react';

// Import components
import Dashboard from './components/Dashboard';
import LevelSelect from './components/LevelSelect';
import GameBoard from './components/GameBoard';
import BreakTimer from './components/BreakTimer';
import Achievements from './components/Achievements';
import Leaderboard from './components/Leaderboard';

// Import mock data
import { 
  mockUser, 
  mockLevels, 
  mockPuzzleTypes, 
  mockGameSession, 
  mockDailyChallenge, 
  mockLeaderboard 
} from './data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(mockUser);
  const [levels, setLevels] = useState(mockLevels);
  const [gameSession, setGameSession] = useState(null);
  const [showBreakTimer, setShowBreakTimer] = useState(false);
  const [consecutiveGames, setConsecutiveGames] = useState(0);

  const handleStartLevel = (levelId) => {
    const level = levels.find(l => l.id === levelId);
    if (level && level.unlocked) {
      setGameSession({
        ...mockGameSession,
        levelId: levelId,
        level: level
      });
      setCurrentView('game');
    }
  };

  const handleGameComplete = (gameResult) => {
    // Update user stats and level progress
    setUser(prev => ({
      ...prev,
      totalScore: prev.totalScore + gameResult.score,
      gamesPlayed: prev.gamesPlayed + 1,
      currentLevel: gameResult.level,
      stats: {
        ...prev.stats,
        bestTime: Math.min(prev.stats.bestTime, gameResult.timeUsed)
      }
    }));

    // Update level completion
    setLevels(prev => prev.map(level => {
      if (level.id === gameResult.level) {
        return {
          ...level,
          completed: true,
          score: Math.max(level.score, gameResult.score),
          bestTime: level.bestTime === 0 ? gameResult.timeUsed : Math.min(level.bestTime, gameResult.timeUsed)
        };
      }
      // Unlock next level
      if (level.id === gameResult.level + 1) {
        return { ...level, unlocked: true };
      }
      return level;
    }));

    // Check if break is needed
    setConsecutiveGames(prev => prev + 1);
    if (consecutiveGames >= 2) {
      setShowBreakTimer(true);
      setConsecutiveGames(0);
    } else {
      setCurrentView('dashboard');
    }
    
    setGameSession(null);
  };

  const handleBreakComplete = () => {
    setShowBreakTimer(false);
    setCurrentView('dashboard');
  };

  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Brain className="text-blue-500" size={32} />
          <span className="text-xl font-bold text-gray-800">MindBoost</span>
          <Badge className="bg-blue-100 text-blue-800">ADHD Training</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <HomeIcon size={16} />
            Dashboard
          </Button>
          <Button
            variant={currentView === 'levels' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('levels')}
            className="flex items-center gap-2"
          >
            <Play size={16} />
            Levels
          </Button>
          <Button
            variant={currentView === 'achievements' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('achievements')}
            className="flex items-center gap-2"
          >
            <Award size={16} />
            Achievements
          </Button>
          <Button
            variant={currentView === 'leaderboard' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('leaderboard')}
            className="flex items-center gap-2"
          >
            <BarChart3 size={16} />
            Leaderboard
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-medium">{user.username}</div>
            <div className="text-xs text-gray-600">Level {user.currentLevel}</div>
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {user.username[0].toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-6 max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Brain className="text-blue-500 animate-pulse" size={64} />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MindBoost
            </h1>
          </div>
          
          <p className="text-2xl text-gray-600 font-medium">
            ADHD Training Game for Teens & Young Adults
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Improve your focus, working memory, and cognitive skills through engaging level-based puzzles. 
            Each level increases in difficulty, with built-in break timers to help maintain optimal performance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {mockPuzzleTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{type.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <Badge className={`${type.color} text-white`}>
                    {type.targetSkill}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 space-y-4">
            <Button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Your Journey
            </Button>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Target className="text-blue-500" size={16} />
                <span>10 Challenging Levels</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={16} />
                <span>Achievement System</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-green-500" size={16} />
                <span>Global Leaderboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    if (showBreakTimer) {
      return <BreakTimer onBreakComplete={handleBreakComplete} />;
    }

    switch (currentView) {
      case 'home':
        return <WelcomeScreen />;
      case 'dashboard':
        return (
          <Dashboard 
            user={user}
            levels={levels}
            achievements={mockUser.achievements}
            dailyChallenge={mockDailyChallenge}
            onStartLevel={handleStartLevel}
            onViewAchievements={() => setCurrentView('achievements')}
            onViewLeaderboard={() => setCurrentView('leaderboard')}
          />
        );
      case 'levels':
        return (
          <LevelSelect 
            levels={levels}
            onSelectLevel={handleStartLevel}
            currentLevel={user.currentLevel}
          />
        );
      case 'game':
        return gameSession && (
          <GameBoard 
            level={gameSession.level.id}
            puzzleType={gameSession.puzzleType}
            onGameComplete={handleGameComplete}
            onNeedBreak={() => setShowBreakTimer(true)}
            gameSession={gameSession}
          />
        );
      case 'achievements':
        return (
          <Achievements 
            achievements={mockUser.achievements}
            userStats={user.stats}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'leaderboard':
        return (
          <Leaderboard 
            leaderboard={mockLeaderboard}
            currentUser={user.username}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-gray-50">
        {currentView !== 'home' && <Navigation />}
        <main className={`${currentView !== 'home' ? 'p-6' : ''}`}>
          <div className={`${currentView !== 'home' ? 'max-w-7xl mx-auto' : ''}`}>
            {renderCurrentView()}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

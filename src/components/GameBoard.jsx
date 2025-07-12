import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Clock, Heart, Zap, Target, Trophy, Pause, Play } from 'lucide-react';

const GameBoard = ({ 
  level, 
  puzzleType, 
  onGameComplete, 
  onNeedBreak,
  gameSession 
}) => {
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, paused, completed
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [round, setRound] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [showPattern, setShowPattern] = useState(false);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const totalRounds = 3;

  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleGameEnd();
    }
  }, [gameState, timeRemaining]);

  const generatePattern = () => {
    const patternLength = Math.min(3 + level, 8);
    const newPattern = Array.from({ length: patternLength }, () => 
      colors[Math.floor(Math.random() * colors.length)]
    );
    setPattern(newPattern);
    setUserPattern([]);
    setShowPattern(true);
    
    setTimeout(() => {
      setShowPattern(false);
    }, 2000 + (patternLength * 500));
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeRemaining(60);
    setRound(1);
    setLives(3);
    setStreak(0);
    generatePattern();
  };

  const handleColorClick = (color) => {
    if (gameState !== 'playing' || showPattern) return;

    const newUserPattern = [...userPattern, color];
    setUserPattern(newUserPattern);

    if (newUserPattern.length === pattern.length) {
      if (JSON.stringify(newUserPattern) === JSON.stringify(pattern)) {
        // Correct pattern
        const roundScore = Math.floor((timeRemaining / 60) * 100 * (1 + level * 0.2));
        setScore(prev => prev + roundScore);
        setStreak(prev => prev + 1);
        
        if (round < totalRounds) {
          setRound(prev => prev + 1);
          setTimeout(() => generatePattern(), 1000);
        } else {
          handleGameEnd();
        }
      } else {
        // Wrong pattern
        setLives(prev => prev - 1);
        setStreak(0);
        if (lives <= 1) {
          handleGameEnd();
        } else {
          setUserPattern([]);
          setTimeout(() => generatePattern(), 1000);
        }
      }
    }
  };

  const handleGameEnd = () => {
    setGameState('completed');
    const finalScore = score + (streak * 10);
    onGameComplete({
      score: finalScore,
      level: level,
      timeUsed: 60 - timeRemaining,
      accuracy: Math.round((streak / (round * pattern.length)) * 100) || 0,
      round: round
    });
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      case 'Expert': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getColorClass = (color) => {
    const colorMap = {
      red: 'bg-red-500 hover:bg-red-600',
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
      orange: 'bg-orange-500 hover:bg-orange-600'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  if (gameState === 'waiting') {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Target className="text-blue-500" />
            Level {level} - {puzzleType}
          </CardTitle>
          <Badge className={`${getDifficultyColor(level <= 3 ? 'Easy' : level <= 6 ? 'Medium' : level <= 9 ? 'Hard' : 'Expert')} text-white`}>
            {level <= 3 ? 'Easy' : level <= 6 ? 'Medium' : level <= 9 ? 'Hard' : 'Expert'}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Pattern Memory Challenge</h3>
              <p className="text-gray-600">
                Watch the color pattern carefully, then reproduce it by clicking the colors in the correct order.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-500" />
                <span className="text-sm">60 seconds per round</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="text-red-500" />
                <span className="text-sm">3 lives</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-500" />
                <span className="text-sm">{totalRounds} rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="text-purple-500" />
                <span className="text-sm">Streak bonuses</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Level {level} - Round {round}/{totalRounds}
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(lives)].map((_, i) => (
                <Heart key={i} className="text-red-500 fill-current" size={20} />
              ))}
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Score: {score}
            </Badge>
            {gameState === 'playing' ? (
              <Button onClick={pauseGame} variant="outline" size="sm">
                <Pause size={16} />
              </Button>
            ) : (
              <Button onClick={resumeGame} variant="outline" size="sm">
                <Play size={16} />
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Time: {timeRemaining}s</span>
            <span>Streak: {streak}</span>
          </div>
          <Progress value={(timeRemaining / 60) * 100} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showPattern && (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Memorize this pattern:</h3>
            <div className="flex justify-center gap-2 flex-wrap">
              {pattern.map((color, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-lg ${getColorClass(color)} border-2 border-white shadow-lg animate-pulse`}
                />
              ))}
            </div>
          </div>
        )}
        
        {!showPattern && gameState === 'playing' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Reproduce the pattern:</h3>
              <div className="flex justify-center gap-2 flex-wrap mb-4">
                {userPattern.map((color, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-lg ${getColorClass(color)} border-2 border-white shadow-lg`}
                  />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={`w-20 h-20 rounded-lg ${getColorClass(color)} border-2 border-white shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95`}
                  disabled={gameState !== 'playing'}
                />
              ))}
            </div>
          </div>
        )}
        
        {gameState === 'paused' && (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Game Paused</h3>
            <Button onClick={resumeGame} className="bg-green-500 hover:bg-green-600">
              Resume Game
            </Button>
          </div>
        )}
        
        {gameState === 'completed' && (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-green-600">Level Complete!</h3>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="font-semibold">Final Score</div>
                <div className="text-2xl font-bold text-blue-600">{score}</div>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="font-semibold">Best Streak</div>
                <div className="text-2xl font-bold text-purple-600">{streak}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameBoard;
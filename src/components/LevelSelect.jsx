import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Lock, 
  CheckCircle, 
  Star, 
  Clock, 
  Trophy, 
  Target,
  Play,
  RotateCcw
} from 'lucide-react';

const LevelSelect = ({ levels, onSelectLevel, currentLevel }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      case 'Expert': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCardStyle = (level) => {
    if (!level.unlocked) {
      return 'bg-gray-50 border-gray-200 opacity-60';
    }
    if (level.completed) {
      return 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 hover:from-green-100 hover:to-blue-100';
    }
    if (level.id === currentLevel) {
      return 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 ring-2 ring-blue-200';
    }
    return 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg';
  };

  const completedLevels = levels.filter(l => l.completed).length;
  const totalLevels = levels.length;
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-blue-500" />
            Level Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{completedLevels}/{totalLevels} completed</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level) => (
          <Card 
            key={level.id} 
            className={`transition-all duration-300 ${getCardStyle(level)} cursor-pointer`}
            onClick={() => level.unlocked && onSelectLevel(level.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-gray-700">
                    {level.id}
                  </div>
                  {!level.unlocked && <Lock className="text-gray-400" size={16} />}
                  {level.completed && <CheckCircle className="text-green-500" size={16} />}
                  {level.id === currentLevel && !level.completed && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </div>
                <Badge className={getDifficultyColor(level.difficulty)}>
                  {level.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg">{level.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {level.completed && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Trophy size={14} className="text-yellow-500" />
                      Best Score:
                    </span>
                    <span className={`font-semibold ${getScoreColor(level.score)}`}>
                      {level.score}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-blue-500" />
                      Best Time:
                    </span>
                    <span className="font-semibold">{level.bestTime}s</span>
                  </div>
                  <div className="flex items-center justify-center">
                    {level.score >= 90 && <Star className="text-yellow-500 fill-current" size={20} />}
                    {level.score >= 70 && level.score < 90 && <Star className="text-gray-400" size={20} />}
                    {level.score >= 50 && level.score < 70 && <Star className="text-gray-300" size={20} />}
                  </div>
                </div>
              )}
              
              {!level.unlocked && (
                <div className="text-center py-4">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Complete previous levels to unlock
                  </p>
                </div>
              )}
              
              {level.unlocked && (
                <div className="space-y-2">
                  {level.completed ? (
                    <div className="flex gap-2">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLevel(level.id);
                        }}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                        size="sm"
                      >
                        <RotateCcw size={14} className="mr-1" />
                        Play Again
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLevel(level.id);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      size="sm"
                    >
                      <Play size={14} className="mr-1" />
                      {level.id === currentLevel ? 'Continue' : 'Start Level'}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Tips for Success</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Take your time to memorize patterns carefully</li>
              <li>• Use the break timer to rest between sessions</li>
              <li>• Focus on accuracy over speed for better scores</li>
              <li>• Practice regularly to improve your cognitive skills</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LevelSelect;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Brain, 
  Zap, 
  Calendar,
  Star,
  Award,
  PlayCircle
} from 'lucide-react';

const Dashboard = ({ 
  user, 
  levels, 
  achievements, 
  dailyChallenge, 
  onStartLevel, 
  onViewAchievements,
  onViewLeaderboard 
}) => {
  const currentLevel = levels.find(l => l.id === user.currentLevel);
  const completedLevels = levels.filter(l => l.completed).length;
  const progressPercentage = (completedLevels / levels.length) * 100;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const recentAchievements = achievements.filter(a => a.unlocked).slice(0, 3);
  const nextLevel = levels.find(l => l.id === user.currentLevel + 1);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Current Level</p>
                <p className="text-3xl font-bold">{user.currentLevel}</p>
              </div>
              <Target className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Score</p>
                <p className="text-3xl font-bold">{user.totalScore.toLocaleString()}</p>
              </div>
              <Trophy className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Streak Days</p>
                <p className="text-3xl font-bold">{user.streakDays}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Games Played</p>
                <p className="text-3xl font-bold">{user.gamesPlayed}</p>
              </div>
              <Brain className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-blue-500" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-gray-600">{completedLevels}/{levels.length} levels</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{user.stats.averageTime}s</div>
              <div className="text-sm text-gray-600">Avg Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{user.stats.bestTime}s</div>
              <div className="text-sm text-gray-600">Best Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{user.stats.accuracyRate}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">+{user.stats.improvementRate}%</div>
              <div className="text-sm text-gray-600">Improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            Daily Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{dailyChallenge.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{dailyChallenge.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getDifficultyColor(dailyChallenge.difficulty)}>
                  {dailyChallenge.difficulty}
                </Badge>
                <span className="text-sm text-gray-600">
                  Reward: {dailyChallenge.reward} points
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{dailyChallenge.progress}/{dailyChallenge.target}</span>
                </div>
                <Progress value={(dailyChallenge.progress / dailyChallenge.target) * 100} />
              </div>
            </div>
            <Button className="ml-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              Start Challenge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Level & Next Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="text-green-500" />
              Continue Playing
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentLevel ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{currentLevel.name}</h3>
                  <Badge className={getDifficultyColor(currentLevel.difficulty)}>
                    {currentLevel.difficulty}
                  </Badge>
                </div>
                {currentLevel.completed ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best Score:</span>
                      <span className={`font-semibold ${getScoreColor(currentLevel.score)}`}>
                        {currentLevel.score}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Best Time:</span>
                      <span className="font-semibold">{currentLevel.bestTime}s</span>
                    </div>
                    <Button 
                      onClick={() => onStartLevel(currentLevel.id)}
                      className="w-full"
                      variant="outline"
                    >
                      Play Again
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => onStartLevel(currentLevel.id)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    Continue Level
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-gray-600">All levels completed!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="text-purple-500" />
              Next Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextLevel ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{nextLevel.name}</h3>
                  <Badge className={getDifficultyColor(nextLevel.difficulty)}>
                    {nextLevel.difficulty}
                  </Badge>
                </div>
                {nextLevel.unlocked ? (
                  <Button 
                    onClick={() => onStartLevel(nextLevel.id)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Start Next Level
                  </Button>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-gray-400 mb-2">🔒</div>
                    <p className="text-sm text-gray-600">
                      Complete current level to unlock
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                <p className="text-gray-600">No more levels!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="text-gold-500" />
              Recent Achievements
            </CardTitle>
            <Button variant="outline" onClick={onViewAchievements}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAchievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg"
              >
                <div className="text-2xl">🏆</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{achievement.name}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
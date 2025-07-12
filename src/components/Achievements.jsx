import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Brain, 
  Clock, 
  Award,
  CheckCircle,
  Lock
} from 'lucide-react';

const Achievements = ({ achievements, userStats, onBack }) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const completionPercentage = (unlockedAchievements.length / achievements.length) * 100;

  const getAchievementIcon = (id) => {
    switch (id) {
      case 1: return <Star className="text-yellow-500" size={24} />;
      case 2: return <Target className="text-blue-500" size={24} />;
      case 3: return <Brain className="text-purple-500" size={24} />;
      case 4: return <Zap className="text-orange-500" size={24} />;
      case 5: return <Clock className="text-green-500" size={24} />;
      default: return <Trophy className="text-gray-500" size={24} />;
    }
  };

  const getAchievementProgress = (achievement) => {
    // Mock progress calculation based on achievement type
    switch (achievement.id) {
      case 1: return { current: 1, total: 1 }; // First puzzle completed
      case 2: return { current: 5, total: 5 }; // 5 attention puzzles
      case 3: return { current: 7, total: 10 }; // 10 memory games
      case 4: return { current: 1, total: 1 }; // Speed achievement
      case 5: return { current: 7, total: 7 }; // 7 day streak
      default: return { current: 0, total: 1 };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="text-gold-500" />
              Achievements
            </CardTitle>
            <Button variant="outline" onClick={onBack}>
              Back to Dashboard
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Achievement Progress</span>
              <span className="text-sm text-gray-600">
                {unlockedAchievements.length}/{achievements.length} unlocked
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Unlocked Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          Unlocked Achievements ({unlockedAchievements.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unlockedAchievements.map((achievement) => {
            const progress = getAchievementProgress(achievement);
            return (
              <Card key={achievement.id} className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      {getAchievementIcon(achievement.id)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {achievement.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">
                          ✓ Completed
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {progress.current}/{progress.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="text-gray-500" />
            Locked Achievements ({lockedAchievements.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => {
              const progress = getAchievementProgress(achievement);
              const progressPercentage = (progress.current / progress.total) * 100;
              return (
                <Card key={achievement.id} className="bg-gray-50 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Lock className="text-gray-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-700">
                          {achievement.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">
                          {achievement.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-gray-600">
                              {progress.current}/{progress.total}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                          <Badge variant="outline" className="text-gray-600">
                            {Math.round(progressPercentage)}% Complete
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievement Categories */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-purple-500" />
            Achievement Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <Star className="text-yellow-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold">Progress</h3>
              <p className="text-sm text-gray-600">Level completion milestones</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Target className="text-blue-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold">Skill</h3>
              <p className="text-sm text-gray-600">Cognitive skill achievements</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Zap className="text-orange-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold">Performance</h3>
              <p className="text-sm text-gray-600">Speed and accuracy rewards</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Clock className="text-green-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold">Consistency</h3>
              <p className="text-sm text-gray-600">Daily streak rewards</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Brain className="text-purple-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold">Mastery</h3>
              <p className="text-sm text-gray-600">Advanced skill milestones</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Award className="text-red-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold">Special</h3>
              <p className="text-sm text-gray-600">Rare and unique achievements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp,
  User,
  Filter
} from 'lucide-react';

const Leaderboard = ({ leaderboard, currentUser, onBack }) => {
  const [timeFilter, setTimeFilter] = useState('all-time');

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Medal className="text-orange-600" size={20} />;
      default: return <span className="text-gray-600 font-bold">#{rank}</span>;
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300';
      case 2: return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
      case 3: return 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-300';
      default: return 'bg-white border-gray-200';
    }
  };

  const isCurrentUser = (username) => username === currentUser;

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  const getInitials = (username) => {
    return username.split('_').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="text-gold-500" />
              Leaderboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <select 
                  value={timeFilter} 
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="text-sm border rounded-md px-2 py-1"
                >
                  <option value="all-time">All Time</option>
                  <option value="monthly">This Month</option>
                  <option value="weekly">This Week</option>
                  <option value="daily">Today</option>
                </select>
              </div>
              <Button variant="outline" onClick={onBack}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-gray-600">
            Compete with other players and climb the ranks!
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThree.map((player, index) => (
              <div 
                key={player.rank} 
                className={`${getRankStyle(player.rank)} p-6 rounded-lg text-center border-2 ${
                  isCurrentUser(player.username) ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                <div className="flex justify-center mb-3">
                  {getRankIcon(player.rank)}
                </div>
                <Avatar className="mx-auto mb-3 w-16 h-16">
                  <AvatarFallback className="text-lg font-bold">
                    {getInitials(player.username)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">
                  {player.username}
                  {isCurrentUser(player.username) && (
                    <Badge className="ml-2 bg-blue-100 text-blue-800">You</Badge>
                  )}
                </h3>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-800">
                    {player.score.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Level {player.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-blue-500" />
            Full Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div 
                key={player.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  getRankStyle(player.rank)
                } ${isCurrentUser(player.username) ? 'ring-2 ring-blue-400' : ''}`}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                  {getRankIcon(player.rank)}
                </div>
                
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {getInitials(player.username)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{player.username}</h3>
                    {isCurrentUser(player.username) && (
                      <Badge className="bg-blue-100 text-blue-800">You</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Level {player.level}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-800">
                    {player.score.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-medium">{player.level}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User's Position Info */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <User className="text-blue-500 mx-auto" size={32} />
            <h3 className="text-lg font-semibold">Your Position</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  #{leaderboard.find(p => p.username === currentUser)?.rank || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {leaderboard.find(p => p.username === currentUser)?.score.toLocaleString() || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {leaderboard.find(p => p.username === currentUser)?.level || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            Tips to Climb the Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Boost Your Score:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Complete levels quickly for time bonuses</li>
                <li>• Maintain high accuracy rates</li>
                <li>• Build up streak multipliers</li>
                <li>• Complete daily challenges</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Stay Consistent:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Play regularly to maintain skills</li>
                <li>• Focus on weak areas for improvement</li>
                <li>• Practice different puzzle types</li>
                <li>• Use break timers to stay fresh</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
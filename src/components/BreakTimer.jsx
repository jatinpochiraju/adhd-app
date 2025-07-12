import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Coffee, Brain, Sparkles, CheckCircle } from 'lucide-react';

const BreakTimer = ({ onBreakComplete, breakDuration = 180 }) => {
  const [timeRemaining, setTimeRemaining] = useState(breakDuration);
  const [isActive, setIsActive] = useState(true);
  const [showActivities, setShowActivities] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      onBreakComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, onBreakComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((breakDuration - timeRemaining) / breakDuration) * 100;

  const breakActivities = [
    { icon: '🚶', title: 'Take a short walk', description: 'Move around for 30 seconds' },
    { icon: '💧', title: 'Drink water', description: 'Stay hydrated for better focus' },
    { icon: '🧘', title: 'Deep breathing', description: '5 deep breaths in and out' },
    { icon: '👀', title: 'Look away from screen', description: 'Rest your eyes for a moment' },
    { icon: '🤸', title: 'Light stretching', description: 'Stretch your neck and shoulders' },
    { icon: '🎵', title: 'Listen to music', description: 'Enjoy a calming song' }
  ];

  const skipBreak = () => {
    setTimeRemaining(0);
    onBreakComplete();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Coffee className="text-orange-500" />
          Break Time!
        </CardTitle>
        <p className="text-gray-600">
          Taking regular breaks helps improve focus and prevents mental fatigue
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
              <div className="text-3xl font-bold text-orange-600">
                {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#fed7aa"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setShowActivities(!showActivities)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Brain size={16} />
              {showActivities ? 'Hide Activities' : 'Show Break Activities'}
            </Button>
            <Button
              onClick={skipBreak}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              Skip Break
            </Button>
          </div>

          {showActivities && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2">
                <Sparkles className="text-yellow-500" />
                Try these activities:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {breakActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 cursor-pointer"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{activity.title}</div>
                      <div className="text-sm text-gray-600">{activity.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-500" size={20} />
            <span className="font-semibold text-green-700">Why breaks matter:</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Improve concentration and focus</li>
            <li>• Reduce mental fatigue and stress</li>
            <li>• Enhance problem-solving abilities</li>
            <li>• Maintain consistent performance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakTimer;
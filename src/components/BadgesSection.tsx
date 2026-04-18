import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Trophy, Target } from 'lucide-react';
import { BADGES, LEVELS } from '@/types/gamification';
import { useGamification } from '@/hooks/useGamification';

const BadgesSection = () => {
  const { gamificationData, getProgressToNextLevel } = useGamification();

  if (!gamificationData) return null;

  const earnedBadges = BADGES.filter(badge => gamificationData.badges.includes(badge.id));
  const availableBadges = BADGES.filter(badge => !gamificationData.badges.includes(badge.id));
  const progressData = getProgressToNextLevel() || { progress: 0, nextLevel: 'Silver', pointsNeeded: 50 };
  const currentLevelData = LEVELS[gamificationData.level] || LEVELS.Bronze;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      {/* Level and Points */}
      <Card className="ios-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Badges & Rewards
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Level */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className={`w-16 h-16 rounded-full ${currentLevelData.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {gamificationData.level[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold">{gamificationData.level}</h3>
                <p className="text-sm text-muted-foreground">{gamificationData.totalPoints} points</p>
              </div>
            </div>

            {/* Progress to Next Level */}
            {progressData.pointsNeeded > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {progressData.nextLevel}</span>
                  <span>{progressData.pointsNeeded} points needed</span>
                </div>
                <Progress 
                  value={Math.min(progressData.progress, 100)} 
                  className="h-2"
                />
              </div>
            )}
          </div>

          {/* Points Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary-light/20 rounded-xl">
              <Target className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{gamificationData.sessionsCreated}</p>
              <p className="text-xs text-muted-foreground">Sessions Created</p>
            </div>
            <div className="text-center p-3 bg-primary-light/20 rounded-xl">
              <Target className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{gamificationData.sessionsJoined}</p>
              <p className="text-xs text-muted-foreground">Sessions Joined</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <Card className="ios-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Earned Badges ({earnedBadges.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {earnedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-3 bg-gradient-to-br from-primary-light/30 to-primary-light/10 rounded-xl border border-primary/20"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-sm">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  <Badge variant="secondary" className="mt-2 text-xs bg-primary/10 text-primary">
                    Earned
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Badges */}
      {availableBadges.length > 0 && (
        <Card className="ios-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Available Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableBadges.slice(0, 6).map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-3 bg-muted/30 rounded-xl border border-border"
                >
                  <div className="text-3xl mb-2 opacity-50">{badge.icon}</div>
                  <h4 className="font-semibold text-sm">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {badge.type === 'streak' 
                      ? `${badge.requirement} days`
                      : badge.type === 'sessions'
                      ? `${badge.requirement} sessions`
                      : `${badge.requirement} required`
                    }
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default BadgesSection;
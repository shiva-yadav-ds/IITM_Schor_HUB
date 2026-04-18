import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, Trophy, Settings, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomTabNavigation = () => {
  const location = useLocation();
  
  const tabs = [
    { id: 'feed', label: 'Feed', icon: Home, path: '/feed' },
    { id: 'explore', label: 'Explore', icon: Search, path: '/explore' },
    { id: 'reels', label: 'Shorts', icon: Video, path: '/reels' },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy, path: '/leaderboard' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around py-2 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className="flex flex-col items-center p-2 min-w-0 flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="relative">
                  <Icon className="h-6 w-6" />
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -inset-2 bg-primary/10 rounded-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
                <span className={`text-xs font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabNavigation;
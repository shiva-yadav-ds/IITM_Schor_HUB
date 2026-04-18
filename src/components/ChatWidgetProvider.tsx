import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatWidget from './ChatWidget';

/**
 * ChatWidgetProvider selectively renders the ChatWidget component
 * only on specific pages of the application.
 */
const ChatWidgetProvider = () => {
  const location = useLocation();

  // List of paths where ChatWidget should be enabled
  const enabledPaths = ['/', '/resume-generator', '/resume', '/grade-calculator', '/cgpa-calculator', '/endterm-marks-predictor', '/roadmaps', '/python-cheatsheet'];

  // Check if current path matches the start of any enabled path
  const isEnabled = enabledPaths.some(path =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path + '/'))
  );

  return isEnabled ? <ChatWidget /> : null;
};

export default ChatWidgetProvider; 
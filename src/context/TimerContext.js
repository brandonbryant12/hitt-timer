
/* <ai_context>
   This file defines a React Context for managing the HIIT timer's global state, such as segments,
   current segment, and time remaining. It uses useState for simplicity and will be expanded as
   timer features are implemented in the MVP.
</ai_context> */

import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [segments, setSegments] = useState([]);
  const [currentSegment, setCurrentSegment] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const value = {
    segments,
    setSegments,
    currentSegment,
    setCurrentSegment,
    timeRemaining,
    setTimeRemaining,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
      
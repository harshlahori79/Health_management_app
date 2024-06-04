import React, { createContext, useState } from 'react';

export const StepContext = createContext();

export const StepProvider = ({ children }) => {
  const [stepData, setStepData] = useState({
    steps: 0,
    caloriesBurned: 0,
    kilometersTraveled: 0,
  });

  return (
    <StepContext.Provider value={{ stepData, setStepData }}>
      {children}
    </StepContext.Provider>
  );
};

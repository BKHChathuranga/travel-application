import React, { createContext, useContext, useState } from "react";

const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);

  const updateRecommendations = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  return (
    <RecommendationContext.Provider value={{ recommendations, updateRecommendations }}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => useContext(RecommendationContext);

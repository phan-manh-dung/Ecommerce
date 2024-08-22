// Context.js
import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isTrue, setIsTrue] = useState(false);

  const toggleState = () => {
    setIsTrue((prevState) => !prevState);
  };

  return <StateContext.Provider value={{ isTrue, setIsTrue, toggleState }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);

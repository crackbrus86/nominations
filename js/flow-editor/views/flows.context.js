import React from "react";

const FlowsContext = React.createContext();

const FlowsContextProvider = ({ children }) => {
  const [currentEvent, setCurrentEvent] = React.useState(null);
  const onCloseEvent = () => setCurrentEvent(null);
  const value = { currentEvent, setCurrentEvent, onCloseEvent };
  return (
    <FlowsContext.Provider value={value}>{children}</FlowsContext.Provider>
  );
};

const useFlows = () => {
  const context = React.useContext(FlowsContext);
  if (context === undefined) {
    throw new Error(
      "useEventSelector must be used within a EventSelectorProvider"
    );
  }
  return context;
};

export { FlowsContextProvider, useFlows };

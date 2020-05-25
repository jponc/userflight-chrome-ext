import React, { useContext, createContext, useState } from "react";

type PreferencesContextType = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
};

const PreferencesContext = createContext<PreferencesContextType>({
  isDrawerOpen: false,
  setIsDrawerOpen: (_isDrawerOpen: boolean) => {}
});

const PreferencesProvider: React.FC = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const contextValue = {
    isDrawerOpen,
    setIsDrawerOpen,
  };

  return <PreferencesContext.Provider value={contextValue} {...props} />;
};

const usePreferences = () => useContext(PreferencesContext);
export { PreferencesProvider, usePreferences };

import React from "react";
import { UserProvider } from "./UserContext";
import { PreferencesProvider } from "./PreferencesContext";

const AppProviders: React.FC = ({ children }) => {
  return (
    <PreferencesProvider>
      <UserProvider>{children}</UserProvider>
    </PreferencesProvider>
  );
};

export { AppProviders };

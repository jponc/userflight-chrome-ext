import React from 'react';
import { AppProviders } from "./context/AppContext";
import { Main } from "./Main";

export default function App() {
  return (
    <AppProviders>
      <Main />
    </AppProviders>
  );
}

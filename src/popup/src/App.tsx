import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentUrl, setCurrentUrl] = useState<string>("")

  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    setCurrentUrl(tabs[0].url || "");
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Current url: {currentUrl}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

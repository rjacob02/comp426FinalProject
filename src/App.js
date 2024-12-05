import './App.css';
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './containers/main';
import HomePage from './components/HomePage';
import React, { useState, useEffect } from 'react';


function App() {

  const [showHomePage, setShowHomePage] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
 
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem('darkMode', newDarkMode);
      return newDarkMode;
    });
  };

    const handleStart = () => {
        setShowHomePage(false);
    };

    return (
        <div>
            {showHomePage ? (
                <HomePage onStart={handleStart} />
            ) : (
              <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Main darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </PersistGate>
            </Provider>
            )}
        </div>
    );

}

export default App;

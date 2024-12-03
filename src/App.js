import './App.css';
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './containers/main';
import HomePage from './components/HomePage';
import React, { useState } from 'react';


function App() {

  const [showHomePage, setShowHomePage] = useState(true);

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
                <Main />
              </PersistGate>
            </Provider>
            )}
        </div>
    );

}

export default App;

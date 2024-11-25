import './App.css';
import Settings from './components/Settings';
import SettingsContext from './components/SettingsContext';
import Logo from './assets/images/logo.png';
import Timer from './components/Timer';
import Background from './components/Background';
import { useState } from 'react';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <div className='logo-app'>
        <img src={Logo} alt="Logo app" />
      </div>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }} >
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
      <h3 className='success-text'>Discipline + Focus + Action  = Success</h3>
      <Background />
    </main>
  );
}

export default App;
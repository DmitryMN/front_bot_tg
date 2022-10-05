import React, { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import { Header } from './components/Header/Header';



function App() {

  const {onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);


  return (
    <div className="App">
      <button onClick={onToggleButton}>toggle</button>
      <Header />
      <div>your price</div>
    </div>
  );
}

export default App;

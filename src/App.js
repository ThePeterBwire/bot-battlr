import React, { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import BotSpecs from './components/BotSpecs';
import SortBar from './components/SortBar';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then(res => res.json())
      .then(data => setBots(data))
      .catch(err => console.error("Error fetching bots:", err));
  }, []);

  const enlistBot = (bot) => {
    if (army.some(b => b.bot_class === bot.bot_class)) {
      alert(`You can only have one ${bot.bot_class} in your army!`);
      return;
    }
    
    if (!army.some(b => b.id === bot.id)) {
      setArmy([...army, bot]);
      setSelectedBot(null); 
    }
  };

  const releaseBot = (botId) => {
    setArmy(army.filter(bot => bot.id !== botId));
  };

  const dischargeBot = (botId) => {
    fetch(`http://localhost:8001/bots/${botId}`, {
      method: 'DELETE'
    })
    .then(() => {
      setBots(bots.filter(bot => bot.id !== botId));
      setArmy(army.filter(bot => bot.id !== botId));
    })
    .catch(err => console.error("Error deleting bot:", err));
  };

  const sortBots = (criteria) => {
    setSortBy(criteria);
    const sortedBots = [...bots].sort((a, b) => b[criteria] - a[criteria]);
    setBots(sortedBots);
  };

  return (
    <div className="App">
      <h1>Bot Battlr</h1>
      <SortBar sortBots={sortBots} />
      <YourBotArmy 
        army={army} 
        releaseBot={releaseBot} 
        dischargeBot={dischargeBot} 
      />
      
      {selectedBot ? (
        <BotSpecs 
          bot={selectedBot} 
          goBack={() => setSelectedBot(null)} 
          enlistBot={enlistBot} 
        />
      ) : (
        <BotCollection 
          bots={bots} 
          enlistBot={enlistBot} 
          setSelectedBot={setSelectedBot} 
        />
      )}
    </div>
  );
}

export default App;

import React from 'react';
import BotCard from './BotCard';

function BotCollection({ bots, enlistBot, setSelectedBot }) {
  return (
    <div className="bot-collection">
      <h2>Available Bots</h2>
      <div className="bot-grid">
        {bots.map(bot => (
          <BotCard 
            key={bot.id} 
            bot={bot} 
            clickAction={enlistBot} 
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
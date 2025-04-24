import React from 'react';
import BotCard from './BotCard';

function YourBotArmy({ army, releaseBot, dischargeBot }) {
  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      {army.length === 0 ? (
        <p>No bots enlisted yet. Click on bots to add them to your army!</p>
      ) : (
        <div className="bot-grid">
          {army.map(bot => (
            <div key={bot.id} className="army-bot-wrapper">
              <BotCard 
                bot={bot} 
                clickAction={() => releaseBot(bot.id)} 
              />
              <button 
                className="discharge-btn"
                onClick={() => dischargeBot(bot.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourBotArmy;
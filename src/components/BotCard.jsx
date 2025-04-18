import React from 'react';

function BotCard({ bot, clickAction, dischargeBot }) {
  return (
    <div className="bot-card" onClick={() => clickAction(bot)}>
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>{bot.catchphrase}</p>
      <div className="bot-stats">
        <span>❤️{bot.health}</span>
        <span>⚔️{bot.damage}</span>
        <span>🛡️{bot.armor}</span>
      </div>
      <div className="bot-class">{bot.bot_class}</div>
      {dischargeBot && (
        <button 
          className="discharge-btn" 
          onClick={(e) => {
            e.stopPropagation();
            dischargeBot(bot.id);
          }}
        >
          x
        </button>
      )}
    </div>
  );
}

export default BotCard;
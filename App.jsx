import React, { useState } from 'react';

const mockGames = [
  { id: 1, teams: 'Lakers @ Nuggets', time: '7:30p', legs: [
    { name: 'LAL Moneyline', odds: { FanDuel: '+128', DraftKings: '+122', BetMGM: '+120' } },
    { name: 'LeBron Points Over 26.5', odds: { FanDuel: '-110', DraftKings: '-115', BetMGM: '-118' } },
    { name: 'Jokic Rebounds Over 12.5', odds: { FanDuel: '-105', DraftKings: '-110', BetMGM: '-115' } }
  ]},
];

export default function App() {
  const [view, setView] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);
  const [betBuilder, setBetBuilder] = useState([]);

  const addLeg = (leg) => {
    setBetBuilder([...betBuilder, leg]);
  };

  return (
    <div className="container p-4 font-sans">
      {view === 'home' && (
        <div>
          <h1 className="text-xl font-bold mb-4">Select a Game</h1>
          {mockGames.map(game => (
            <div key={game.id} className="border p-2 mb-2 rounded cursor-pointer" onClick={() => { setSelectedGame(game); setView('game'); }}>
              <div>{game.teams}</div>
              <div className="text-sm text-gray-600">{game.time}</div>
            </div>
          ))}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={() => setView('builder')}>
            Bet Builder ({betBuilder.length} legs)
          </button>
        </div>
      )}

      {view === 'game' && selectedGame && (
        <div>
          <button onClick={() => setView('home')} className="text-blue-500">← Back</button>
          <h2 className="text-lg font-bold mb-4">{selectedGame.teams}</h2>
          {selectedGame.legs.map((leg, idx) => (
            <div key={idx} className="border p-2 mb-2 rounded">
              <div className="font-semibold">{leg.name}</div>
              <button className="mt-2 px-3 py-1 bg-green-500 text-white" onClick={() => addLeg(leg)}>+ Add</button>
            </div>
          ))}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={() => setView('builder')}>
            Go to Bet Builder ({betBuilder.length} legs)
          </button>
        </div>
      )}

      {view === 'builder' && (
        <div>
          <button onClick={() => setView('home')} className="text-blue-500">← Back</button>
          <h2 className="text-lg font-bold mb-4">Bet Builder</h2>
          {betBuilder.length === 0 && <div className="text-sm text-gray-600">No legs yet — add from a game.</div>}
          {betBuilder.map((leg, idx) => (
            <div key={idx} className="border p-2 mb-2 rounded">
              <div className="font-semibold mb-2">{leg.name}</div>
              {Object.entries(leg.odds).map(([book, odds]) => (
                <div key={book} className="flex justify-between mb-1">
                  <span>{book}</span>
                  <span>{odds}</span>
                  <a href="#" className="text-blue-500">Go</a>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

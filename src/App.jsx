import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import GameOver from './components/GameOver';

const GAME_MODES = {
  classic: { name: 'Classic', description: 'Traditional piano tiles gameplay' },
  melody: { name: 'Melody', description: 'Musical patterns that flow naturally' },
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('highScore')) || 0
  );
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameMode, setGameMode] = useState('classic');
  const [stats, setStats] = useState({
    gamesPlayed: parseInt(localStorage.getItem('gamesPlayed')) || 0,
    totalScore: parseInt(localStorage.getItem('totalScore')) || 0,
  });

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);

  useEffect(() => {
    if (showGameOver) {
      const newStats = {
        gamesPlayed: stats.gamesPlayed + 1,
        totalScore: stats.totalScore + score,
      };
      setStats(newStats);
      localStorage.setItem('gamesPlayed', newStats.gamesPlayed.toString());
      localStorage.setItem('totalScore', newStats.totalScore.toString());
    }
  }, [showGameOver]);

  const handleGameOver = () => {
    setIsPlaying(false);
    setShowGameOver(true);
    setGameSpeed(1000);
  };

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setShowGameOver(false);
  };

  useEffect(() => {
    if (isPlaying && score > 0) {
      if (score % 5 === 0) {
        setGameSpeed(prev => Math.max(prev * 0.9, 400));
      }
      if (score % 10 === 0) {
        setGameSpeed(prev => Math.max(prev * 0.95, 400));
      }
    }
  }, [score, isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Piano Tiles Game
        </h1>
        
        <Scoreboard 
          currentScore={score} 
          highScore={highScore}
          averageScore={stats.gamesPlayed > 0 ? Math.round(stats.totalScore / stats.gamesPlayed) : 0}
          gamesPlayed={stats.gamesPlayed}
        />

        {!isPlaying && !showGameOver && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Select Game Mode</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(GAME_MODES).map(([mode, { name, description }]) => (
                <button
                  key={mode}
                  onClick={() => setGameMode(mode)}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-200
                    ${gameMode === mode 
                      ? 'bg-purple-600 text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="font-bold">{name}</div>
                  <div className="text-sm opacity-80">{description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <GameBoard
          isPlaying={isPlaying}
          onGameOver={handleGameOver}
          onScoreUpdate={setScore}
          speed={gameSpeed}
          gameMode={gameMode}
        />

        {!showGameOver && (
          <button
            onClick={startGame}
            className="mt-8 w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 
              text-white rounded-xl font-bold text-lg tracking-wide
              hover:from-blue-600 hover:to-purple-600 
              transform transition-all duration-200 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
              shadow-lg hover:shadow-xl"
          >
            {isPlaying ? 'Restart Game' : 'Start Game'}
          </button>
        )}

        {isPlaying && (
          <div className="text-center mt-4 space-y-2">
            <p className="text-gray-600">
              Speed: {Math.round(1000/gameSpeed * 100)/100}x
            </p>
            <p className="text-sm text-gray-500">
              Mode: {GAME_MODES[gameMode].name}
            </p>
          </div>
        )}

        {showGameOver && (
          <GameOver
            score={score}
            highScore={highScore}
            onRestart={startGame}
            gameMode={gameMode}
            stats={stats}
          />
        )}
      </div>
    </div>
  );
}

export default App;
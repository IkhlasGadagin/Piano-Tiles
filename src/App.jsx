import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import GameOver from './components/GameOver';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('highScore')) || 0
  );
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);

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
      // Add bonus speed increase at certain milestones
      if (score % 10 === 0) {
        setGameSpeed(prev => Math.max(prev * 0.95, 400));
      }
    }
  }, [score, isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Piano Tiles
        </h1>
        
        <Scoreboard currentScore={score} highScore={highScore} />
        
        <GameBoard
          isPlaying={isPlaying}
          onGameOver={handleGameOver}
          onScoreUpdate={setScore}
          speed={gameSpeed}
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
          <p className="text-center mt-4 text-gray-600">
            Speed: {Math.round(1000/gameSpeed * 100)/100}x
          </p>
        )}

        {showGameOver && (
          <GameOver
            score={score}
            highScore={highScore}
            onRestart={startGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;
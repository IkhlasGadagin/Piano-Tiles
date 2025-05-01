const GameOver = ({ score, highScore, onRestart, gameMode, stats }) => {
  const isNewHighScore = score === highScore;

  return (
    <div className="mt-8 text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform hover:scale-105 transition-transform">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Game Over!</h2>
        
        <div className="space-y-6">
          <div>
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {score}
            </div>
            <div className="text-gray-500 mt-2">Final Score</div>
          </div>

          {isNewHighScore && (
            <div className="animate-perfect">
              <div className="text-2xl font-bold text-yellow-500">🏆 New High Score! 🏆</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xl font-bold text-purple-600">{highScore}</div>
              <div className="text-sm text-gray-500">High Score</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xl font-bold text-green-600">
                {Math.round(stats.totalScore / stats.gamesPlayed)}
              </div>
              <div className="text-sm text-gray-500">Average Score</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{stats.gamesPlayed}</div>
              <div className="text-sm text-gray-500">Games Played</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xl font-bold text-orange-600">{stats.totalScore}</div>
              <div className="text-sm text-gray-500">Total Score</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 
          text-white rounded-xl font-bold text-lg tracking-wide
          hover:from-blue-600 hover:to-purple-600 
          transform transition-all duration-200 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
          shadow-lg hover:shadow-xl"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
const GameOver = ({ score, highScore, onRestart }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-2xl shadow-2xl transform animate-fadeIn">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
        Game Over!
      </h2>
      <div className="space-y-4 mb-6">
        <div className="text-center">
          <p className="text-gray-600">Final Score</p>
          <p className="text-3xl font-bold text-gray-800">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">High Score</p>
          <p className="text-2xl font-bold text-gray-800">{highScore}</p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 
          text-white rounded-xl font-bold text-lg
          hover:from-blue-600 hover:to-purple-600 
          transform transition-all duration-200 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Play Again
      </button>
    </div>
  </div>
);

export default GameOver;
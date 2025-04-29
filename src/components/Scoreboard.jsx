// const Scoreboard = ({ currentScore, highScore }) => (
//   <div className="text-center mb-6 bg-white p-4 rounded-lg shadow">
//     <div className="text-3xl font-bold text-gray-800">Score: {currentScore}</div>
//     <div className="text-xl text-gray-600">High Score: {highScore}</div>
//   </div>
// );

// export default Scoreboard;
const Scoreboard = ({ currentScore, highScore }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform hover:scale-105 transition-transform">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {currentScore}
        </div>
        <div className="text-gray-500 text-sm uppercase tracking-wide">Current Score</div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-700">{highScore}</div>
        <div className="text-gray-500 text-sm uppercase tracking-wide">High Score</div>
      </div>
    </div>
  </div>
);

export default Scoreboard;
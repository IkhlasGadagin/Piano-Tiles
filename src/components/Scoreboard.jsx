// const Scoreboard = ({ currentScore, highScore }) => (
//   <div className="text-center mb-6 bg-white p-4 rounded-lg shadow">
//     <div className="text-3xl font-bold text-gray-800">Score: {currentScore}</div>
//     <div className="text-xl text-gray-600">High Score: {highScore}</div>
//   </div>
// );

// export default Scoreboard;
const Scoreboard = ({ currentScore, highScore, averageScore, gamesPlayed }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="text-sm text-gray-600 mb-1">Current Score</div>
        <div className="text-3xl font-bold text-blue-600">{currentScore}</div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="text-sm text-gray-600 mb-1">High Score</div>
        <div className="text-3xl font-bold text-purple-600">{highScore}</div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="text-sm text-gray-600 mb-1">Average Score</div>
        <div className="text-3xl font-bold text-green-600">{averageScore}</div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="text-sm text-gray-600 mb-1">Games Played</div>
        <div className="text-3xl font-bold text-orange-600">{gamesPlayed}</div>
      </div>
    </div>
  );
};

export default Scoreboard;
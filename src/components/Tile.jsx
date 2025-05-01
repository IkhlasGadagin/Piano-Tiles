import { useState, useEffect } from 'react';

// const Tile = ({ isBlack, onClick, active }) => (
//   <div
//     onClick={onClick}
//     className={`h-24 w-full border border-gray-300 cursor-pointer transition-all duration-300 transform
//       ${isBlack ? 'bg-black' : 'bg-white'}
//       ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
//     `}
//   />
// );

// export default Tile;
const Tile = ({ isBlack, active, onClick, animationDelay, perfect }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (showParticles) {
      const timer = setTimeout(() => setShowParticles(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showParticles]);

  const handleClick = () => {
    setIsPressed(true);
    setShowParticles(true);
    onClick();
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`
          w-full aspect-square rounded-lg transition-all duration-150 transform
          ${isBlack ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-100'}
          ${isPressed ? 'scale-95' : 'scale-100'}
          ${active ? 'opacity-100' : 'opacity-40'}
          ${perfect ? 'ring-2 ring-yellow-400' : ''}
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          animate-slide-in
        `}
        style={{
          animation: active ? `slideIn 0.3s ease-out ${animationDelay}ms` : 'none',
        }}
      >
        {showParticles && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-2 h-2 rounded-full
                  ${isBlack ? 'bg-white' : 'bg-gray-900'}
                  animate-particle
                `}
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-10px)`,
                }}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default Tile;
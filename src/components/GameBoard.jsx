import { useState, useEffect, useCallback, useRef } from 'react';
import Tile from './Tile';

const GameBoard = ({ onGameOver, onScoreUpdate, isPlaying, speed }) => {
  const [tiles, setTiles] = useState([]);
  const [activeTileIndex, setActiveTileIndex] = useState(null);
  const missedTileTimeout = useRef(null);

  const generateTile = useCallback(() => {
    return Math.floor(Math.random() * 4);
  }, []);

  const checkMissedTile = useCallback(() => {
    if (activeTileIndex !== null && tiles.length > 0) {
      onGameOver();
    }
  }, [activeTileIndex, tiles, onGameOver]);

  useEffect(() => {
    if (!isPlaying) {
      setTiles([]);
      setActiveTileIndex(null);
      if (missedTileTimeout.current) {
        clearTimeout(missedTileTimeout.current);
      }
      return;
    }

    const interval = setInterval(() => {
      setTiles(prev => [...prev, generateTile()]);
      setActiveTileIndex(prev => {
        if (prev === null) return 0;
        return prev + 1;
      });
    }, speed);

    return () => {
      clearInterval(interval);
      if (missedTileTimeout.current) {
        clearTimeout(missedTileTimeout.current);
      }
    };
  }, [isPlaying, speed, generateTile]);

  useEffect(() => {
    if (isPlaying && activeTileIndex !== null) {
      if (missedTileTimeout.current) {
        clearTimeout(missedTileTimeout.current);
      }
      missedTileTimeout.current = setTimeout(checkMissedTile, speed * 1.2);
    }
  }, [activeTileIndex, isPlaying, speed, checkMissedTile]);

  const handleTileClick = (columnIndex, rowIndex) => {
    if (!isPlaying) return;

    if (rowIndex === activeTileIndex && tiles[rowIndex] === columnIndex) {
      onScoreUpdate(prev => prev + 1);
      setTiles(prev => prev.slice(1));
      setActiveTileIndex(prev => prev - 1);
    } else {
      onGameOver();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-2 bg-gradient-to-b from-gray-100 to-gray-200 p-3 rounded-xl shadow-lg">
        {[...Array(4)].map((_, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-2">
            {[...Array(4)].map((_, rowIndex) => (
              <Tile
                key={rowIndex}
                isBlack={tiles[rowIndex] === columnIndex}
                active={rowIndex <= activeTileIndex}
                onClick={() => handleTileClick(columnIndex, rowIndex)}
                animationDelay={rowIndex * 100}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
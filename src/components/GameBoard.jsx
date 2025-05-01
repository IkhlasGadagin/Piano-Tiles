import { useState, useEffect, useCallback, useRef } from 'react';
import Tile from './Tile';
import { playNote, playGameOver, playPerfect } from '../sounds';

const GameBoard = ({ onGameOver, onScoreUpdate, isPlaying, speed, gameMode = 'classic' }) => {
  const [tiles, setTiles] = useState([]);
  const [activeTileIndex, setActiveTileIndex] = useState(null);
  const [combo, setCombo] = useState(0);
  const [perfectHits, setPerfectHits] = useState([]);
  const missedTileTimeout = useRef(null);
  const lastClickTime = useRef(null);

  const generateTile = useCallback(() => {
    if (gameMode === 'classic') {
      return Math.floor(Math.random() * 4);
    } else if (gameMode === 'melody') {
      // Create more musical patterns
      const lastTile = tiles[tiles.length - 1];
      const possibleTiles = [0, 1, 2, 3].filter(t => Math.abs(t - (lastTile || 2)) <= 1);
      return possibleTiles[Math.floor(Math.random() * possibleTiles.length)];
    }
    return Math.floor(Math.random() * 4);
  }, [gameMode, tiles]);

  const checkMissedTile = useCallback(() => {
    if (activeTileIndex !== null && tiles.length > 0) {
      playGameOver();
      onGameOver();
    }
  }, [activeTileIndex, tiles, onGameOver]);

  useEffect(() => {
    if (!isPlaying) {
      setTiles([]);
      setActiveTileIndex(null);
      setCombo(0);
      setPerfectHits([]);
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

    const now = Date.now();
    const timeDiff = now - (lastClickTime.current || now);
    lastClickTime.current = now;

    if (rowIndex === activeTileIndex && tiles[rowIndex] === columnIndex) {
      // Play the corresponding note
      playNote(columnIndex);

      // Calculate timing perfection
      const isPerfect = timeDiff > speed * 0.8 && timeDiff < speed * 1.2;
      if (isPerfect) {
        setPerfectHits(prev => [...prev, rowIndex]);
        setCombo(prev => prev + 1);
        if (combo > 0 && combo % 10 === 0) {
          playPerfect();
        }
      } else {
        setCombo(0);
      }

      // Update score with combo bonus
      const comboBonus = Math.floor(combo / 10);
      onScoreUpdate(prev => prev + 1 + comboBonus);

      setTiles(prev => prev.slice(1));
      setActiveTileIndex(prev => prev - 1);
    } else {
      playGameOver();
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
                perfect={perfectHits.includes(rowIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      {combo > 0 && (
        <div className="text-center mt-4">
          <span className={`font-bold text-xl ${combo >= 10 ? 'text-purple-600 animate-perfect' : 'text-gray-700'}`}>
            {combo}x Combo!
          </span>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
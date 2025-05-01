// Create audio context
let audioContext;

// Initialize audio context on first user interaction
const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Generate a piano-like tone
const createPianoNote = (frequency, duration = 0.2) => {
  const ctx = initAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Use a sine wave for a softer sound
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Shape the sound envelope for a piano-like effect
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
};

// Piano note frequencies (C4, D4, E4, F4)
const noteFrequencies = [261.63, 293.66, 329.63, 349.23];

export const playNote = (index) => {
  createPianoNote(noteFrequencies[index]);
};

export const playGameOver = () => {
  const ctx = initAudioContext();
  // Play a descending pattern
  setTimeout(() => createPianoNote(noteFrequencies[3], 0.15), 0);
  setTimeout(() => createPianoNote(noteFrequencies[2], 0.15), 100);
  setTimeout(() => createPianoNote(noteFrequencies[1], 0.15), 200);
  setTimeout(() => createPianoNote(noteFrequencies[0], 0.3), 300);
};

export const playPerfect = () => {
  const ctx = initAudioContext();
  // Play an ascending pattern
  setTimeout(() => createPianoNote(noteFrequencies[0], 0.15), 0);
  setTimeout(() => createPianoNote(noteFrequencies[1], 0.15), 100);
  setTimeout(() => createPianoNote(noteFrequencies[2], 0.15), 200);
  setTimeout(() => createPianoNote(noteFrequencies[3], 0.3), 300);
}; 
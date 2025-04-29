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
const Tile = ({ isBlack, onClick, active, animationDelay }) => (
  <div
    onClick={onClick}
    style={{ animationDelay: `${animationDelay}ms` }}
    className={`
      h-24 w-full border border-gray-300 cursor-pointer
      transition-all duration-300 transform
      ${isBlack ? 'bg-gradient-to-b from-gray-900 to-black hover:from-gray-800' : 'bg-white'}
      ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      rounded-md shadow-lg
      ${isBlack && 'hover:shadow-xl hover:scale-[1.02]'}
    `}
  />
);

export default Tile;
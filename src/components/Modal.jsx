import React from 'react';

const Modal = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-dark-100 rounded-xl p-6 max-w-lg w-full relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}
            alt={movie.title}
            className="w-32 h-48 object-cover rounded-lg mx-auto md:mx-0"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
            <p className="text-gray-200 mb-2 text-sm">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'} | {movie.original_language?.toUpperCase()}</p>
            <p className="text-gray-100 mb-4 text-sm">{movie.overview || 'No description available.'}</p>
            <div className="flex items-center gap-2">
              <img src="star.svg" alt="Star Icon" className="w-5 h-5" />
              <span className="text-white font-semibold">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

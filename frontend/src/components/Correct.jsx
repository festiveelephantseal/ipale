import React from "react";
import Cookies from "js-cookie";

const Correct = ({ setBanner }) => {
  const set = () => {
    setBanner(false);
  };

  const attempts = Cookies.get("attempts");

  return (
    <div className="relative bg-gray-700 rounded p-4 shadow-md text-white text-center w-80 h-40">
      <button
        type="button"
        className="absolute top-2 right-2 text-white fill-current"
        onClick={set}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
      <h1 className="text-2xl text-green-500">Correct!</h1>
      <p className="text-lg">Guessed in {attempts} guesses</p>
    </div>
  );
};

export default Correct;

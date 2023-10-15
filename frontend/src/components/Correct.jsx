import React from "react";

const Correct = ({ attempts }) => {
  return (
    <div className="bg-gray-700 h-40 w-30 p-4 rounded">
      <h1 className="text-white">Correct!</h1>
      <p className="text-white">Guessed in {attempts} guesses</p>
    </div>
  );
};

export default Correct;

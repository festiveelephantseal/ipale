import React from "react";

const Incorrect = ({ answer }) => {
    return (
        <div className="bg-gray-700 h-40 w-30 p-4 rounded">
            <h1 className="text-white">The correct answer was "{answer}"</h1>
        </div>
    );
};

export default Incorrect;


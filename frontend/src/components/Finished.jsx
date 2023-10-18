import Cookies from "js-cookie";

const Finished = () => {
  const attempts = Cookies.get("attempts");
  const correct = Cookies.get("correct");
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl text-gray-700">Hello!</h1>
      <h1 className="text-xl text-blue-500">
        Come back tomorrow for a new puzzle
      </h1>

      {parseInt(correct) === 1 ? (
        <p className="text-gray-700">Solved in {attempts} attempts</p>
      ) : null}
    </div>
  );
};

export default Finished;

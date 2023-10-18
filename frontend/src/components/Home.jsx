import { useState, useEffect } from "react";
import Correct from "./Correct";
import Incorrect from "./Incorrect";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const [data, setData] = useState({ word: "", transcription: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const [banner, setBanner] = useState(false);
  const [wrongBanner, setWrongBanner] = useState(false);

  const special = "ɛæɜʌɒəʊɔθʃʧðŋʒɪiɑˌ";

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  useEffect(() => {
    if (!data.word && loading) {
      axios
        .get("http://localhost:4000/word")
        .then((res) => {
          setData({
            word: res.data.word,
            transcription: res.data.transcription,
          });
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [data.word, loading]);
  useEffect(() => {
    if (attempts === 6) {
      setWrongBanner(true);
    }
  }, [attempts]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const set = () => {
    Cookies.set("attempts", attempts);
  };

  const set2 = () => {
    Cookies.set("solved", true);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4">
        {banner ? (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            {set()}
            <Correct setBanner={setBanner} />
          </div>
        ) : null}

        {wrongBanner ? (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            {set()}
            {set2()}
            <Incorrect answer={data.transcription} setBanner={setWrongBanner} />
          </div>
        ) : null}
        <h1 className="text-center text-3xl text-gray-700">IPA'le</h1>
        <h2 className="text-center text-2xl text-blue-500">{data.word}</h2>
        <div className="flex justify-center gap-1 items-center mt-5">
          <div className="text-center">
            <label>
              <input
                name="ipaguess"
                className="border-black border-2 rounded p-1 placeholder-gray-700 "
                placeholder="Guess the word's IPA"
                value={guess}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>
          </div>

          <div
            className="border-black border-2 rounded w-18 h-9 p-1"
            onClick={() => {
              if (guess === data.transcription && attempts < 6) {
                console.log("Correct!");
                setAttempts(attempts + 1);
                setCorrect(true);
                setBanner(true);
                Cookies.set("solved", 1, { expires: 1 });
                Cookies.set("attempts", attempts);
                Cookies.set("correct", 1);
              } else {
                console.log("Incorrect :(");
                setAttempts(attempts + 1);
                Cookies.set("correct", 0);
              }
              setGuesses([...guesses, guess]);
            }}
          >
            <p className="text-gray-700">Guess</p>
          </div>
        </div>

        <div className="flex justify-center gap-1 items-center mt-3 flex-wrap">
          {special.split("").map((s, i) => (
            <div
              key={i}
              className="bg-gray-700 text-white w-10 h-10 text-xl text-center rounded"
              onClick={() => {
                setGuess(guess + "" + s);
              }}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="w-full mt-4">
          <div className="flex flex-col gap-1 mx-auto">
            {guesses.map((g, i) => (
              <div key={i} className="h-10 w-1/13 p-2 bg-gray-700 rounded">
                <p className="text-white text-center">{g}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

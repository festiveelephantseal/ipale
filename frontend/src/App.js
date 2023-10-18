import Correct from "./components/Correct";
import Finished from "./components/Finished";
import Home from "./components/Home";
import Cookies from "js-cookie";

function App() {
  const solved = Cookies.get("solved");

  if (solved) {
    return <Finished />;
  } else {
    return <Home />;
  }
}

export default App;

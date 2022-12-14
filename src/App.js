import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.scss";
import Question from "./pages/question/Question";
import Finish from "./pages/finish/Finish";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<Question />} />
          <Route path="/congrates" element={<Finish />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

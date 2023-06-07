import "./App.css";
import Mainpage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
import Sidebar from "./components/layout/sidebar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
          <Route path="*" element={"notfound"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

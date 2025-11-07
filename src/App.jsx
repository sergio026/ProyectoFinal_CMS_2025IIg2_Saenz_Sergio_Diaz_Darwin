import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Menu from "./Components/NavBar/NavBar";
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <main>
          <Routes>        
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

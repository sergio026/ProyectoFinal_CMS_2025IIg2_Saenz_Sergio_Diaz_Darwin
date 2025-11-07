// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Loguin from "./Pages/Loguin/Loguin";
// import RecuperarContrasena from "./Pages/Restablecer/Restablecer";
// import './index.css'
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Loguin />} />
//         <Route path="/Restablecer" element={<RecuperarContrasena />} />
//         {/* <Route path="/inicio" element={<Inicio />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Loguin/Loguin";
// import './index.css'
function App() {
  return (
    <Router>
      <Navbar /> {/* se muestra siempre arriba */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loguin" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

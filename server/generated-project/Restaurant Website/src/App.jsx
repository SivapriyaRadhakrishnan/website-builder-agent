import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MenuList from "./pages/MenuList";
import ReservationForm from "./pages/ReservationForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<MenuList />} />
      <Route path="/reservations" element={<ReservationForm />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
import { Homepage } from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.scss";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  return (
    <Routes>
      <Route exact path="/home" element={<Homepage />} />
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      {/* <Route exact path="/home" element={<ProtectedRoute />}>
        <Route exact path="/home" element={<Homepage />} />
      </Route> */}
    </Routes>
  );
}

export default App;

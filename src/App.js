import { Homepage } from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.scss";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ProtectRoute} from "./components/ProtectRoute"

function App() {
  return (
    <Routes>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/" element={<ProtectRoute />}>
        <Route exact path="/" element={<Homepage />} />
      </Route>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/home" element={<ProtectRoute />}>
        <Route exact path="/home" element={<Homepage />} />
      </Route>
      {/* <Route exact path="/login" element={<ProtectRoute />}>
        <Route exact path="/home" element={<Homepage />} />
      </Route> */}
    </Routes>
  );
}

export default App;

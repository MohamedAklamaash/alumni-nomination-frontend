import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HomeNavLayout from "./layouts/HomeNav";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeNavLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home/>}/>
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;

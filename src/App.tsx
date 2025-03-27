import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HomeNavLayout from "./layouts/HomeNav";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeNavLayout />}>
          <Route path="/" element={<Landing />} />
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;

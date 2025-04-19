import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HomeNavLayout from "./layouts/HomeNav";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOTP";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeNavLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;

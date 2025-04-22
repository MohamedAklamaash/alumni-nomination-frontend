import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HomeNavLayout from "./layouts/HomeNav";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import VerifyOtp from "./pages/VerifyOTP";
import Profile from "./pages/Profile";
import NominationForm from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FoundationLanding from "./pages/Home";
import AboutCollege from "./pages/AboutCollege";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeNavLayout />}>
          <Route path="/" element={<FoundationLanding />} />
          <Route path="/distinguishedalumni" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home/dashboard" element={<NominationForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-college" element={<AboutCollege />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

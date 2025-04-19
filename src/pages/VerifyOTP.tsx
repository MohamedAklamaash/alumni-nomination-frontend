import { BACKEND_URL } from "@/constants/backend";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please sign up again.");
      navigate("/profile");
      return;
    }

    if (!/^\d{4}$/.test(otp)) {
      toast.error("OTP must be a 4-digit number.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/verifyotp`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Invalid OTP. Try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Verify OTP
        </h2>
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input
              type="text"
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              required
              className="bg-transparent outline-none w-full text-white text-center tracking-widest text-xl"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            Verify OTP
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          Didn't receive OTP? Please check your email or try again.
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;

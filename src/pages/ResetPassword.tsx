import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/constants/backend";

const ResetPassword = () => {
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    inputRefs.current[index].value = value;

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    const otpValue = inputRefs.current.map((ref) => ref.value).join("");
    setOtp(otpValue);
  };

  const onSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/auth/forgotPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === "Forgot password OTP sent successfully") {
          toast.success(data.message);
          setIsEmailSent(true);
        } else {
          toast.success(data.message || "OTP sent successfully!");
          setIsEmailSent(true);
        }
      } else {
        // Handle error responses (404, 400, etc.)
        toast.error(data.message || `Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const onSubmitResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error("OTP must be 4 digits");
      return;
    }
    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/changepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully.");
        navigate("/login");
      } else {
        // Handle error responses (404, 400, etc.)
        toast.error(data.message || `Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <ToastContainer position="top-right" />
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">Enter your email.</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-white w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 mt-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}

      {isEmailSent && (
        <form
          onSubmit={onSubmitResetPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Your Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your email, OTP, and new password.
          </p>
          <div className="mb-4 flex items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            {/* <img src={assets.mail_icon} alt="" className="w-3 h-3" /> */}
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-white w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between gap-2 mb-4">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                onChange={(e) => handleOtpChange(e, index)}
                className="w-12 h-12 text-center rounded bg-[#333A5C] text-white"
              />
            ))}
          </div>
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-5 py-2.5 mb-4 rounded-full bg-[#333A5C] text-white outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="w-full py-2.5 mt-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
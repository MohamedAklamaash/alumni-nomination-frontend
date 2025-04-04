import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const backendURL = "";
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isOtpSubmitted, setOtpIsSubmitted] = useState<boolean>(false);

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > 0 && index < inputRefs.current.length - 1) {
      // Move focus to the next input field
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Backspace" && target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus(); // Focus on the previous input field
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim(); // Get the pasted string

    if (pastedData.length === inputRefs.current.length) {
      pastedData.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char; // Set value for each input
        }
      });

      // Automatically focus the last field
      inputRefs.current[inputRefs.current.length - 1].focus();
    } else {
      // Optional: Display a toast or error for invalid paste length
      toast.error("Invalid code length");
    }
  };

  // a function to handle the email used to reset your password
  const onSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendURL}/api/auth/send-reset-otp`,
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  // function to handle the submitting OTP to handle password reset
  const onSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value);
    setOtp(otpArray.join(""));
    setOtpIsSubmitted(true);
  };

  // function to change the password to new
  const onSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendURL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return   ( 
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
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
        <img src={assets.mail_icon} alt="" className="w-3 h-3" />
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent outline-none text-white"
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

  {/* a new form for adding otp */}
  {!isOtpSubmitted && isEmailSent && (
    <form
      onSubmit={onSubmitOtp}
      className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
    >
      <h1 className="text-white text-2xl font-semibold text-center mb-4">
        Reset Password OTP
      </h1>
      <p className="text-center mb-6 text-indigo-300">
        Enter 6-digit code sent to your email.
      </p>
      <div className="flex justify-between mb-8" onPaste={handlePaste}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              type="text"
              maxLength={1}
              key={index}
              required
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              // ref={(el) => el && (inputRefs.current[index] = el)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
        Submit
      </button>
    </form>
  )}

  {/* enter new password */}
  {isOtpSubmitted && isEmailSent && (
    <form
      onSubmit={onSubmitNewPassword}
      className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
    >
      <h1 className="text-white text-2xl font-semibold text-center mb-4">
        New Password
      </h1>
      <p className="text-center mb-6 text-indigo-300">
        Enter your new Password below.
      </p>
      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
        <img src={assets.lock_icon} alt="" className="w-3 h-3" />
        <input
          type="password"
          placeholder="New Password"
          className="bg-transparent outline-none text-white"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button className="w-full py-2.5 mt-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
        Save
      </button>
    </form>
  )}
</div>
);
}

export default ResetPassword
import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/constants/backend";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<"Sign Up" | "Login">("Sign Up");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload =
      state === "Sign Up"
        ? {
          email,
          password,
          firstName: name,
        }
        : {
          email,
          password,
        };

    const url =
      state === "Sign Up"
        ? `${BACKEND_URL}/auth/signup`
        : `${BACKEND_URL}/auth/signin`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          state === "Sign Up"
            ? "Account created successfully!"
            : "Logged in successfully!"
        );

        if (state === "Sign Up") {
          navigate("/verify-otp", { state: { email } });
        }
        if (state === "Login") {
          localStorage.setItem("access_token", data.access_token);
          // a token is returned in the response
          navigate("/profile"); 
        } else {
          setState("Login");
        }
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create an account to get started."
            : "Login to your account."}
        </p>
        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none w-full text-white"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none w-full text-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none w-full text-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign Up"
            ? "Already have an Account? "
            : "Don't have an Account? "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-blue-400 cursor-pointer underline"
          >
            {state === "Sign Up" ? "Login Here" : "Sign Up Here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

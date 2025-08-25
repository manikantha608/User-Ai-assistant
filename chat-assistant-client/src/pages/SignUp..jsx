import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function SignUp() {
  const [state, setState] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axios, setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const { data } = await axios.post(url, { name, email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(state === "login" ? "Login successful!" : "Account created!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      {/* Left side image */}
      <div className="w-full hidden md:inline-block bg-white">
        <img
          className="h-full"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* Form */}
      <div className="w-full flex flex-col items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">
            {state === "login" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-sm text-gray-500/90 mt-3">
            {state === "login"
              ? "Welcome back! Please sign in to continue"
              : "Create your account to get started"}
          </p>

          {/* Name field (only for register) */}
          {state === "register" && (
            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              
            />
          </div>

          {/* Password */}
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {state === "login" ? "Login" : "Create Account"}
          </button>

          {/* Switch between login/register */}
          {state === "login" ? (
            <p className="text-gray-500/90 text-sm mt-4">
              Don’t have an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-indigo-400 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          ) : (
            <p className="text-gray-500/90 text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-indigo-400 hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

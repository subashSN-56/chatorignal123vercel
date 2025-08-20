import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useLogin from "../hooks/useLogin.js"


const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

  // const { mutate: loginMutation, isPending, error } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //     navigate("/"); // redirect to home after success
  //   },
  // });
  const {isPending , error , loginMutation} = useLogin() 

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        
        {/* LEFT: Login Form */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Fingerprint className="size-9 text-primary" />
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse">
              SN - Login
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Welcome Back</h2>
              <p className="text-sm opacity-70">
                Log in to continue your learning journey.
              </p>
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>


            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error.response?.data?.message || "Login failed. Please try again."}
              </div>
            )}

            {/* Signup Redirect */}
            <div className="text-center my-4">
              <p>
                Don’t have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT: Image Section */}
        <div className="hidden md:flex items-center justify-center md:w-1/2 bg-base-200">
          <img
            src="/login.png"
            alt="Login Illustration"
            className="w-4/5 max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
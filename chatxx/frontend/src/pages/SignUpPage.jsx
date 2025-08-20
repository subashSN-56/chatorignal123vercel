
import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

  // const { mutate:signupMutation, isPending, error } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //     navigate("/login"); // redirect after success
  //   },
  // });

  const {isPending ,error , signupMutation} = useSignUp()

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT: Signup Form */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Fingerprint className="size-9 text-primary" />
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
              SN - Signup
            </span>
          </div>
          {/* ERROR MESSAGE IF ANY  */}
          {/* {error && (
            <div className="alert alert-error mb-4">
              <span> {error.response.data.message}</span>
            </div>
          )} */}


          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <p className="text-sm opacity-70">
                Join Stearmify & start your language learning adventure!
              </p>
            </div>

            {/* Full Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
              />
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
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
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
                placeholder="Enter a password above 6 letters"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                minLength={6}
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="form-control">
              <label className="cursor-pointer label items-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" required />
                <span className="label-text text-sm leading-snug">
                  I agree to the sign 🩷 up page{" "}
                  <a href="#" className="text-primary underline">Terms of Service</a> and{" "}
                  <a href="#" className="text-primary underline">Privacy Policy</a>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Create Account"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error.response?.data?.message || "Signup failed. Please try again."}
              </div>
            )}

            {/* Login Redirect */}
            <div className="text-center my-4">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT: Image Section */}
        <div className="hidden md:flex items-center justify-center md:w-1/2 bg-base-200">
          <img
            src="/signup.png"
            alt="Signup Illustration"
            className="w-4/5 max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

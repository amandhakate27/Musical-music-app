import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import musicalImg from "../assets/musical.png";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const user = login(data.email, data.password);
    if (!user) {
      alert("User Not Found! Invalid Credentials");
      return;
    }
    alert("Login Successful !");
    if (user.role === "artist") {
      navigate("/main/artist-dashboard", { replace: true });
    } else {
      navigate("/main", { replace: true });
    }
    reset();
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const inputClass =
    "w-full bg-[#1c1825] text-[#FCFCFC] text-[15px] pl-10 pr-4 py-3 rounded-md outline-none placeholder:text-[#8C8B8F]/50 border border-[#38333f] focus:border-[#E6444F] transition-colors duration-150";

  const labelClass = "block text-[13px] font-medium text-[#FCFCFC] mb-1.5 ml-1";

  return (
    <div className="h-screen w-screen flex overflow-hidden select-none bg-[#211D27]">

      <div className="hidden lg:flex lg:w-1/2 h-full p-5">
        {/* Child - Image */}
        <div className="w-full h-full bg-[#EDEDED] rounded-[6px] flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0 flex items-end justify-center overflow-hidden">
            <img
              src={musicalImg}
              alt="Musical"
              className="w-full max-w-[780px] h-auto max-h-[82vh] object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* form */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#211D27] overflow-y-auto">
        <div className="w-full max-w-105">

          <div className="mb-7 text-left">
            <h2 className="text-[32px] sm:text-[36px] font-black text-[#FCFCFC] font-playfair tracking-tight leading-none">
              Welcome back !
            </h2>
            <p className="text-[#8C8B8F] text-[14px] mt-2.5">
              Please login to continue.
            </p>
          </div>

          {/* Form - UI only, no logic */}
          <form onSubmit={handleSubmit(handleLogin)}
            className="space-y-4">
            {/* Email */}
            <div>
              <label className={labelClass}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.75 h-3.75 text-[#8C8B8F]" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className={inputClass}
                />
              </div>

            </div>
            {errors.email && <p className="text-[#E6444F] text-[13px] mt-1 ml-1">{errors.email.message}</p>}

            {/* Password */}
            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.75 h-3.75 text-[#8C8B8F]" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8B8F] hover:text-[#E6444F] transition-colors duration-150"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {errors.password && <p className="text-[#E6444F] text-[13px] mt-1 ml-1">{errors.password.message}</p>}
            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-6! py-3 bg-[#E6444F] hover:bg-[#d43c47] active:scale-[0.99] text-white font-semibold text-[15px] rounded-md transition-all duration-150 tracking-wide cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-[13.5px] text-[#8C8B8F] mt-5">
            Don&apos;t have an account?{" "}
            <span onClick={() => navigate("/register")}
              className="text-[#FCFCFC] font-medium hover:text-[#E6444F] cursor-pointer transition-colors duration-150">
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

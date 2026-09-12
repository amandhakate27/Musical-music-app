import { useState, useContext } from "react";
import { User, AtSign, Mail, Lock, Eye, EyeOff, Music4, Mic2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: { role: "listener" },
    });

    const selectedRole = watch("role");

    const handleRegister = (data) => {
        console.log("Form data:", data);
        const success = registerUser(data);
        if (!success) return;
        console.log("Navigating to login");
        navigate("/", { replace: true });
        reset();
    };

    const inputClass =
        "w-full bg-[#1c1825] text-[#FCFCFC] text-[15px] pl-10 pr-4 py-3 rounded-md outline-none placeholder:text-[#8C8B8F]/50 border focus:border-[#E6444F] transition-colors duration-150";

    return (
        <div className="h-screen w-full bg-[#211D27] flex items-center justify-center p-4 overflow-hidden select-none">
            <div className="w-full max-w-112.5">

                {/* Brand */}
                <div className="mb-5 text-left">
                    <h1 className="text-[32px] sm:text-[36px] font-black text-[#FCFCFC] font-playfair tracking-tight leading-none">
                        Create an account
                    </h1>
                    <p className="text-[#8C8B8F] text-[14px] mt-2">
                        Create your account to get started.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-2.5">

                    {/* Role Selector - semantic radio */}
                    <div className="flex rounded-md border border-[#2a2533] overflow-hidden mb-3.5" role="radiogroup" aria-label="Select role">
                        <label
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[14.5px] font-medium cursor-pointer transition-colors duration-150 ${selectedRole === "listener" ? "bg-[#E6444F] text-white" : "text-[#8C8B8F] hover:text-[#FCFCFC]"
                                }`}
                        >
                            <input type="radio" value="listener" {...register("role")} className="sr-only" />
                            <Music4 className="w-3.75 h-3.75" />
                            Listener
                        </label>
                        <label
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[14.5px] font-medium cursor-pointer border-l border-[#2a2533] transition-colors duration-150 ${selectedRole === "artist" ? "bg-[#E6444F] text-white" : "text-[#8C8B8F] hover:text-[#FCFCFC]"
                                }`}
                        >
                            <input type="radio" value="artist" {...register("role")} className="sr-only" />
                            <Mic2 className="w-3.75 h-3.75" />
                            Artist
                        </label>
                    </div>

                    {/* Full Name */}
                    <div>
                        <div className="relative">
                            <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.75 h-3.75 transition-colors duration-150 ${errors.fullName ? "text-[#E6444F]" : "text-[#8C8B8F]"}`} />
                            <input
                                {...register("fullName", {
                                    required: "Full Name is required",
                                })}
                                type="text"
                                placeholder="Full Name"
                                className={`${inputClass} ${errors.fullName ? "border-[#E6444F]" : "border-[#38333f]"}`}
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-[12px] text-[#E6444F] mt-1 pl-1 leading-tight">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <div className="relative">
                            <AtSign className={`absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-colors duration-150 ${errors.username ? "text-[#E6444F]" : "text-[#8C8B8F]"}`} />
                            <input
                                {...register("username", {
                                    required: "Username is required",
                                })}
                                type="text"
                                placeholder="Username"
                                className={`${inputClass} ${errors.username ? "border-[#E6444F]" : "border-[#38333f]"}`}
                            />
                        </div>
                        {errors.username && (
                            <p className="text-[12px] text-[#E6444F] mt-1 pl-1 leading-tight">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.75 h-3.75 transition-colors duration-150 ${errors.email ? "text-[#E6444F]" : "text-[#8C8B8F]"}`} />
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                                type="email"
                                placeholder="Email Address"
                                className={`${inputClass} ${errors.email ? "border-[#E6444F]" : "border-[#38333f]"}`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-[12px] text-[#E6444F] mt-1 pl-1 leading-tight">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.75 h-3.75 transition-colors duration-150 ${errors.password ? "text-[#E6444F]" : "text-[#8C8B8F]"}`} />
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className={`${inputClass} pr-10 ${errors.password ? "border-[#E6444F]" : "border-[#38333f]"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8B8F] hover:text-[#E6444F] transition-colors duration-150"
                            >
                                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-[12px] text-[#E6444F] mt-1 pl-1 leading-tight">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-5! py-3 bg-[#E6444F] hover:bg-[#d43c47] active:scale-[0.99] text-white font-semibold text-[15px] rounded-md transition-all duration-150 tracking-wide cursor-pointer"
                    >
                        Create Account
                    </button>

                </form>

                {/* Sign in */}
                <p className="text-center text-[13.5px] text-[#8C8B8F] mt-4">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}
                        className="text-[#FCFCFC] font-medium hover:text-[#E6444F] cursor-pointer transition-colors duration-150">
                        Sign in
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Register;

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../authThunks";
import { toast } from "react-hot-toast";
import useToggle from "../../../hooks/useToggle";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useToggle("showPassword", false);
  const [persist, setPersist] = useToggle("persist", false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    // Simulate API call
    console.log("Login data:", { ...data, persist });
    const toastId = toast.loading("Logging in...");
    try {
      const response = await dispatch(
        loginUser({
          ...data,
          email: data.usernameOrEmail,
          username: data.usernameOrEmail,
        })
      ).unwrap();
      console.log(response);
      if (response.status) {
        toast.success("Login successful", { id: toastId });
        localStorage.setItem("isLoggedIn", true);
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error, { id: toastId });
      console.log(error);
    }
  };

  const validateUsernameOrEmail = (value) => {
    // Check if it's a valid email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // Check if it's a valid username (alphanumeric and underscores, min 3 chars)
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

    if (emailRegex.test(value) || usernameRegex.test(value)) {
      return true;
    }
    return "Please enter a valid email address or username (min 3 characters, letters, numbers, and underscores only)";
  };
  return (
    <div className="space-y-4">
      {/* Username or Email Field */}
      <div className="space-y-2">
        <Label
          htmlFor="usernameOrEmail"
          className="text-sm font-medium text-gray-700"
        >
          Username or Email
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="usernameOrEmail"
            type="text"
            placeholder="Enter your username or email"
            className={`pl-10 ${
              errors.usernameOrEmail ? "border-red-500" : ""
            }`}
            {...register("usernameOrEmail", {
              required: "Username or email is required",
              validate: validateUsernameOrEmail,
            })}
          />
        </div>
        {errors.usernameOrEmail && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription className="text-sm">
              {errors.usernameOrEmail.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <button
            type="button"
            className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
            onClick={() => alert("Navigate to forgot password page")}
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription className="text-sm">
              {errors.password.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={persist}
          onCheckedChange={setPersist}
          className="border-gray-300"
        />
        <Label
          htmlFor="rememberMe"
          className="text-sm text-gray-600 cursor-pointer"
        >
          Remember me
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isSubmitting}
      >
        <LogIn className="w-4 h-4 mr-2" />
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => alert("Google login integration")}
          className="w-full border-gray-300 hover:bg-gray-50"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => alert("Facebook login integration")}
          className="w-full border-gray-300 hover:bg-gray-50"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>

      {/* Register Link */}
      <div className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
        >
          Create one here
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useContext, useState, useEffect } from "react";
import CustomAlert from "../Components/UI/AlertIcon";
import { AuthContext } from "../context/auth_context";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const AuthForm = () => {
  const { login, signup } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Form data states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    role: "customer",
    password: "",
    confirmPassword: "",
  });

  // Reset error when switching forms
  useEffect(() => {
    setError("");
  }, [isLogin]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const response = await login(loginData);
        if (!response.success) {
          throw new Error(response.message);
        }
      } else {
        // Check if passwords match
        if (signupData.password !== signupData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const response = await signup(signupData);

        if (!response.success) {
          throw new Error(response.message);
        }

        // Auto switch to login after successful signup
        toggleForm();
      }
    } catch (err) {
      setError(
        err.message ||
          `${isLogin ? "Login" : "Signup"} failed. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setTransitioning(true);

    // Wait for content to slide out completely
    setTimeout(() => {
      setIsLogin(!isLogin);
      // Then show the content again once the form has changed
      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => !isLogin && !transitioning && toggleForm()}
              className={`w-1/2 py-4 px-6 text-center font-medium focus:outline-none transition-colors duration-300 ${
                isLogin
                  ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => isLogin && !transitioning && toggleForm()}
              className={`w-1/2 py-4 px-6 text-center font-medium focus:outline-none transition-colors duration-300 ${
                !isLogin
                  ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Signup
            </button>
          </div>

          <div className="p-8">
            {/* Form title */}
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {isLogin ? "Sign in to your account" : "Create Account"}
            </h2>

            {/* Error alert */}
            {error && (
              <CustomAlert
                key={Date.now()}
                type="error"
                message={error}
                onClose={() => setError("")}
              />
            )}

            {/* Animated form container */}
            <div className="min-h-64">
              {/* Login Form */}
              {isLogin && !transitioning && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 animate-fade-in"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="login-email"
                        required
                        placeholder="Email address"
                        className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white py-3 px-4"
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="login-password"
                        required
                        placeholder="Password"
                        className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white py-3 px-4"
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              )}

              {/* Signup Form */}
              {!isLogin && !transitioning && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 animate-fade-in"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Full name"
                        className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white py-3 px-4"
                        value={signupData.name}
                        onChange={handleSignupChange}
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="signup-email"
                        required
                        placeholder="Email address"
                        className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white py-3 px-4"
                        value={signupData.email}
                        onChange={handleSignupChange}
                      />
                    </div>

                    <div className="relative mb-4">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-400 dark:text-gray-300 mb-1"
                      >
                        Select your role
                      </label>
                      <select
                        name="role"
                        id="role"
                        required
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white py-3 px-4"
                        value={signupData.role || "customer"}
                        onChange={handleSignupChange}
                      >
                        <option value="customer">Customer</option>
                        <option value="designer">Designer</option>
                        <option value="factory_owner">Factory Owner</option>
                      </select>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="signup-password"
                        required
                        placeholder="Password"
                        className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white py-3 px-4"
                        value={signupData.password}
                        onChange={handleSignupChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirm-password"
                        required
                        placeholder="Confirm password"
                        className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white py-3 px-4"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Sign up"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Form footer */}
          <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => !transitioning && toggleForm()}
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus:outline-none"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add a tailwind keyframe for fade-in animation
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}
`;

export default AuthForm;

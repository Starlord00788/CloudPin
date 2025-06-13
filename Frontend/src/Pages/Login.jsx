import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const errors = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Please enter a valid email address.";
    }
    if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    return errors;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/v1/users/login", form);
      const token = res.data.data.accessToken;

      if (!token) throw new Error("Access token missing in response");

      login(token);
      navigate("/upload");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      if (message.toLowerCase().includes("verify") && message.toLowerCase().includes("otp")) {
        navigate("/verify-otp", { state: { email: form.email } });
      } else {
        setServerError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-md sm:max-w-lg p-8 sm:p-10 rounded-xl border border-white/40 bg-white/30 backdrop-blur-md shadow-lg transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
          Sign in to <span className="text-blue-600 font-bold">CloudPin</span>
        </h2>

        {serverError && (
          <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mb-4 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                fieldErrors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

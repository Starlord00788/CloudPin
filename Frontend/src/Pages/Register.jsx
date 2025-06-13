import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.fullname.trim()) errors.fullname = "Full name is required.";
    if (!form.username.trim()) errors.username = "Username is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = "Invalid email.";
    if (!form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/))
      errors.password =
        "Password must be at least 6 characters with 1 uppercase and 1 number.";
    if (!avatar) errors.avatar = "Please upload a profile image.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
    setFieldErrors((prev) => ({ ...prev, avatar: "" }));
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

  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => formData.append(key, value));
  formData.append("avatar", avatar);

  try {
    const res = await axios.post("https://cloudpin-backend.onrender.com/users/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const email = res.data?.email || form.email;
    navigate("/verify-otp", { state: { email } }); // 
  } catch (err) {
    const msg = err.response?.data?.message || "Registration failed.";
    setServerError(msg);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
          Sign Up for <span className="text-blue-600 font-bold">CloudPin</span>
        </h2>

        {serverError && (
          <div className="text-red-600 text-sm mb-4">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            {fieldErrors.fullname && (
              <p className="text-red-500 text-xs">{fieldErrors.fullname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            {fieldErrors.username && (
              <p className="text-red-500 text-xs">{fieldErrors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs">{fieldErrors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />
            {fieldErrors.avatar && (
              <p className="text-red-500 text-xs">{fieldErrors.avatar}</p>
            )}
            {avatar && (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Preview"
                className="mt-2 w-16 h-16 object-cover rounded-full border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

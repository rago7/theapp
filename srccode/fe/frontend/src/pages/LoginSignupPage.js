import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/LoginSignupPage.css";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    university: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email address.";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (!isLogin) {
      if (!formData.fname.trim()) newErrors.fname = "First name is required.";
      if (!formData.lname.trim()) newErrors.lname = "Last name is required.";
      if (!formData.gender) newErrors.gender = "Please select your gender.";
      if (!formData.university.trim()) newErrors.university = "University name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) navigate("/");
        else alert("Login failed. Please try again.");
      } else {
        const success = await signup(formData);
        if (success) {
          alert("Signup successful! Logging you in...");
          const loginSuccess = await login(formData.email, formData.password);
          if (loginSuccess) navigate("/");
        } else {
          alert("Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-signup-page">
      <div className="form-card">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              {errors.fname && <p className="error">{errors.fname}</p>}
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
              {errors.lname && <p className="error">{errors.lname}</p>}
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                onChange={handleChange}
              />
              <select name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="error">{errors.gender}</p>}
              <input
                type="text"
                name="university"
                placeholder="University"
                onChange={handleChange}
                required
              />
              {errors.university && <p className="error">{errors.university}</p>}
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <div className="password-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="spinner"></span> : isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <p className="toggle-link">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up here!</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login here!</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;

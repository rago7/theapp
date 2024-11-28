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
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Attempt Login
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/"); // Redirect to main page on successful login
      } else {
        alert("Login failed. Please try signing up.");
        setIsLogin(false); // Switch to signup form
      }
    } else {
      // Attempt Signup
      const success = await signup(formData);
      if (success) {
        alert("Signup successful. Logging you in...");
        const loginSuccess = await login(formData.email, formData.password);
        if (loginSuccess) {
          navigate("/"); // Redirect to main page after successful signup and login
        }
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-signup-page">
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
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={handleChange}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              onChange={handleChange}
            />
            <input
              type="text"
              name="university"
              placeholder="University"
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default LoginSignupPage;

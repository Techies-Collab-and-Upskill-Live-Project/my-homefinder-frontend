import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light px-3 position-relative overflow-hidden">
      <div style={{ width: "250px", height: "250px", backgroundColor: "green", borderRadius: "50%", position: "absolute", top: "-100px", right: "-100px" }}></div>

      <div style={{ width: "250px", height: "250px", backgroundColor: "green", borderRadius: "50%", position: "absolute", bottom: "-100px", left: "-100px" }}></div>
      <img src="\Images\Logo.png" alt="Logo" style={{ position: 'absolute', top: '0px', left: '20px', height: '100px' }} />
      
      <div className="card shadow p-4 rounded-4" style={{ maxWidth: "800px", width: "100%", zIndex: 1 }}>
        <div className="text-start">
          <button className="btn-close" />
        </div>

      <form
        onSubmit={handleSubmit}
      
      >
       <h2 className="mb-2 text-center fw-semibold ">Welcome Back!!</h2>
        <p className="text-center">Please Log in to continue</p>


       <div className="mb-3 position-relative">
          <label className="position-absolute bg-white px-2 py-1 rounded shadow-sm d-flex align-items-center" style={{ top: "-10px", left: "10px", color: "rgba(0,0,0,0.5)", fontSize:'16px' }}>
           <i class="bi bi-envelope me-2"style={{color: "rgba(0,0,0,1)", width:'17px'}}></i>Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            style={ {height: '50px'}}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3 position-relative">
          <label className="position-absolute bg-white px-2 py-1 rounded shadow-sm d-flex align-items-center" style={{ top: "-10px", left: "10px", color: "rgba(0,0,0,0.5)", fontSize:'16px' }}>
            <i class="bi bi-lock me-2 fw-regular" style={{color: "rgba(0,0,0,1)", width:'17px'}}></i> Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
            style={ {height: '50px'}}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn helo w-100 mb-3">
          Login
        </button>
        {/* <div className="d-flex justify-content-center align-items-center mb-3">
          <hr/> Or Sign Up With <hr />
          </div> */}
        {/* Social login icons only */}
      <div className="container">
      <div className="row justify-content-center text-center">
        {/* Google */}
        <div className="col-4 col-md-1">
          <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer">
            
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1"
              style={{ width: '50px', height: '50px', backgroundColor: '#e9f5ee' }}
            >
              <img src="\Images\Google logo.png" alt="Google" style={{ width: '30px'}}/>
            </div>
          </a>
        </div>

        {/* Apple */}
        <div className="col-4 col-md-2">
          <a href="https://appleid.apple.com" target="_blank" rel="noopener noreferrer">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1"
              style={{ width: '50px', height: '50px', backgroundColor: '#e9f5ee' }}
            >
              <img src="\Images\Apple logo.png" alt="Apple"  style={{ width: '30px' }} />
            </div>
          </a>
        </div>

        {/* Facebook */}
        <div className="col-4 col-md-1">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1"
              style={{ width: '50px', height: '50px', backgroundColor: '#e9f5ee' }}
            >
              <img src="\Images\Facebook logo.png" alt="Facebook" style={{ width: '30px' }}/>
            </div>
          </a>
        </div>
      </div>
    </div>

        {/* Already have an account */}
        <div className="text-center mt-3 ">
          <p className="d-flex justify-content-center align-items-center">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="btn btn-link  text-decoration-none"
            style={{color:'rgba(90,168,90,1)'}}
            onClick={() => navigate("/signup")}>
          
            Sign Up
          </button>
        </p>
        </div>
      </form>
      </div>
    </div>
  );
}

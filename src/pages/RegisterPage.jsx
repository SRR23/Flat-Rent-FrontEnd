import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myaxios from "../uitils/myaxios";

const RegisterPage = () => {
  const [userType, setUserType] = useState("renter"); // Default to Tenants
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);

    // Correctly add userType field
    data.user_type = userType;

    try {
      const response = await myaxios.post("/register/", data);

      if (response.data.status === "success") {
        alert("Registration Successful, Check your email to verify your account");
        navigate("/login/");
      } else {
        alert("Register Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Register Failed");
    }
    
    setLoading(false); // Stop loading
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 overflow-auto">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="p-4 border rounded shadow">
              <h3 className="text-center mb-3">Create an Account</h3>

              {/* User Type Selection */}
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="customer"
                    name="user_type"
                    value="renter"
                    checked={userType === "renter"}
                    onChange={() => setUserType("renter")}
                  />
                  <label className="form-check-label" htmlFor="customer">
                    Tenants
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="owner"
                    name="user_type"
                    value="owner"
                    checked={userType === "owner"}
                    onChange={() => setUserType("owner")}
                  />
                  <label className="form-check-label" htmlFor="owner">
                    Owner
                  </label>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    name="phone_number"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                {/* Additional fields for Owner */}
                {userType === "owner" && (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="house_holding_number"
                        className="form-control"
                        placeholder="House Holding Number"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Address"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                  />
                </div>

                {/* Register Button with Loading State */}
                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                  {loading ? "Registering..." : `Register as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
                </button>
              </form>

              <div className="text-center mt-3">
                <p>
                  Already have an account?{" "}
                  <Link to="/login/" className="text-primary">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

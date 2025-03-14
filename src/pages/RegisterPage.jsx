import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [userType, setUserType] = useState("customer");

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 overflow-auto">
      <div className="container mt-5">
        <div
          className="text-center mx-auto mb-4 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          {/* <h1 className="mb-3">Create an Account</h1> */}
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="wow fadeInUp p-4 border rounded shadow"
              data-wow-delay="0.5s"
            >
              {/* User Type Selection */}
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="customer"
                    name="userType"
                    value="customer"
                    checked={userType === "customer"}
                    onChange={() => setUserType("customer")}
                  />
                  <label className="form-check-label" htmlFor="customer">
                    Tenants
                  </label>
                </div>

                {/* Heading in between */}
                <h3 className="mb-0">Create an Account</h3>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="owner"
                    name="userType"
                    value="owner"
                    checked={userType === "owner"}
                    onChange={() => setUserType("owner")}
                  />
                  <label className="form-check-label" htmlFor="owner">
                    Owner
                  </label>
                </div>
              </div>

              {/* Customer Form */}
              {userType === "customer" && (
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <button className="btn btn-primary w-100" type="submit">
                    Register as Tenants
                  </button>
                </form>
              )}

              {/* Owner Form */}
              {userType === "owner" && (
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="House Holding Number"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>

                  <button className="btn btn-primary w-100" type="submit">
                    Register as Owner
                  </button>
                </form>
              )}

              {/* Already have an account? */}
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

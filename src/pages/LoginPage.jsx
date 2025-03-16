import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import myaxios from "../uitils/myaxios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const { data: response } = await myaxios.post("/login/", data);

      if (response.status === "success") {
        // Store user details and tokens BEFORE navigating
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        localStorage.setItem("refresh_token", response.refresh_token);

        // Navigate only after storing user data
        navigate("/");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="p-4 border rounded shadow">
                <h1 className="text-center mb-3">Login to your account</h1>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          required
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password">Your Password</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>

                    <div className="col-12 text-center">
                      <p className="mt-3">
                        Don't have an account?{" "}
                        <Link to="/register/" className="text-primary">
                          Register here
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

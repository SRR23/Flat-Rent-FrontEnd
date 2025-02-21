
import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div>
      {/* Header Below Navbar */}
      {/* <div
        className="container-fluid header bg-white p-0"
        style={{ marginTop: "80px" }}
      ></div> */}

      {/* <!-- Contact Start --> */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container">
          <div
            className="text-center mx-auto mb-4 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3">Login to your account</h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="wow fadeInUp p-4 border rounded shadow"
                data-wow-delay="0.5s"
              >
                <form>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                        />
                        <label htmlFor="password">Your Password</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Login
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
      {/* <!-- Contact End --> */}
    </div>
  );
};

export default LoginPage;

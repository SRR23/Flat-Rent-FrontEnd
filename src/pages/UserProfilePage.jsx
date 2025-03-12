import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = ["Manage Your Profile!", "Keep Your Information Updated!"];

const UserProfilePage = () => {
    const [messageIndex, setMessageIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 4000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <div
          className="container-fluid header bg-white p-0"
          style={{ marginTop: "80px" }}
        >
          <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 mt-lg-5">
              <h1 className="display-5 animated fadeIn mb-4">User Profile</h1>
              <nav aria-label="breadcrumb animated fadeIn">
                <ol className="breadcrumb text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-body active"
                    aria-current="page"
                  >
                    Profile
                  </li>
                </ol>
              </nav>
            </div>
  
            <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  className="position-absolute text-center text-primary fw-bold animated-message"
                  style={{ fontSize: "2rem", width: "100%" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  {messages[messageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
  
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
          <div className="col-md-6 shadow p-5 rounded bg-white">
            <h2 className="text-center mb-4">Update Profile</h2>
            <form>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="user_type" placeholder="User Type" />
                <label>User Type</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="first_name" placeholder="First Name" />
                <label>First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="last_name" placeholder="Last Name" />
                <label>Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="phone_number" placeholder="Phone Number" />
                <label>Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" name="email" placeholder="Email" />
                <label>Email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="house_holding_number" placeholder="House Holding Number" />
                <label>House Holding Number</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="address" placeholder="Address" />
                <label>Address</label>
              </div>
              <div className="text-center">
                <button className="btn btn-primary w-100 py-2" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfilePage;

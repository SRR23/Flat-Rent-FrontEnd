import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import myaxios from "../uitils/myaxios";
const messages = ["To Advertised Your Flat!", "Please Contact Us!"];

const ContactPage = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData); // Convert FormData to an object

    try {
      await myaxios.post("/contact/", data);
      setResponseMessage("Message sent successfully!");
      e.target.reset(); // Reset form fields
    } catch (error) {
      setResponseMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header Below Navbar */}
      <div
        className="container-fluid header bg-white p-0"
        style={{ marginTop: "80px" }}
      >
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 animated fadeIn mb-4">Contact Us</h1>
            <nav aria-label="breadcrumb animated fadeIn">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item text-body active"
                  aria-current="page"
                >
                  Contact
                </li>
              </ol>
            </nav>
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex} // Key ensures correct animation switching
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

      {/* <!-- Contact Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3">Contact Us</h1>
            <p>
              We are here to advertised your house for rent. You can share your
              house information with us. Please fill-up the form so that we can
              reach out.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-12">
              <div className="row gy-4">
                <div
                  className="col-md-6 col-lg-4 wow fadeIn"
                  data-wow-delay="0.1s"
                >
                  <div className="bg-light rounded p-3">
                    <div
                      className="d-flex align-items-center bg-white rounded p-3"
                      style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}
                    >
                      <div
                        className="icon me-3"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <i className="fa fa-map-marker-alt text-primary"></i>
                      </div>
                      <span>PTI road, Custom Mor, Kushtia</span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 wow fadeIn"
                  data-wow-delay="0.3s"
                >
                  <div className="bg-light rounded p-3">
                    <div
                      className="d-flex align-items-center bg-white rounded p-3"
                      style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}
                    >
                      <div
                        className="icon me-3"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <i className="fa fa-envelope-open text-primary"></i>
                      </div>
                      <span>mdeliaskhan1918004@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 wow fadeIn"
                  data-wow-delay="0.5s"
                >
                  <div className="bg-light rounded p-3">
                    <div
                      className="d-flex align-items-center bg-white rounded p-3"
                      style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}
                    >
                      <div
                        className="icon me-3"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <i className="fa fa-phone-alt text-primary"></i>
                      </div>
                      <span>+8801781678998</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="wow fadeInUp" data-wow-delay="0.5s">

                {responseMessage && (
                  <div
                    className={`alert ${
                      responseMessage.includes("success")
                        ? "alert-success"
                        : "alert-danger"
                    } alert-dismissible fade show`}
                    role="alert"
                  >
                    {responseMessage}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setResponseMessage(null)} // Hide message when clicked
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Your Name"
                          required
                        />
                        <label>Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Your Email"
                          required
                        />
                        <label>Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Your Phone"
                          required
                        />
                        <label>Your Phone</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="Your Address"
                          required
                        />
                        <label>Your Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          name="message"
                          placeholder="Leave a message here"
                          style={{ height: "150px" }}
                          required
                        ></textarea>
                        <label>Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
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

export default ContactPage;

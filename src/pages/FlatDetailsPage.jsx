import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const messages = ["Find Your Dream Flat!", "Best Deals Available Now!"];

const FlatDetailsPage = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const firstRowRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000); // Change message every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSeeLess = () => {
    setShowMore(false);
    firstRowRef.current.scrollIntoView({ behavior: "smooth" });
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
            <h1 className="display-5 animated fadeIn mb-4">Flat Details</h1>
            <nav aria-label="breadcrumb animated fadeIn">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item text-body active"
                  aria-current="page"
                >
                  Title
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                className="position-absolute text-center text-primary fw-bold"
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

      {/* Flat Details Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center" ref={firstRowRef}>
            <div className="col-lg-6">
              <Carousel showThumbs={false} infiniteLoop autoPlay>
                <div className="detail-img">
                  <img
                    src="/img/p1.jpg"
                    alt="Flat Image 1"
                    className="img-fluid"
                  />
                </div>
                <div className="detail-img">
                  <img
                    src="/img/p2.jpg"
                    alt="Flat Image 2"
                    className="img-fluid"
                  />
                </div>
                <div className="detail-img">
                  <img
                    src="/img/p3.jpg"
                    alt="Flat Image 3"
                    className="img-fluid"
                  />
                </div>
              </Carousel>
            </div>
            <div className="col-lg-6">
              <h1 className="mb-4">Beautiful Apartment for Rent</h1>
              <p className="mb-4">
                Spacious and modern apartment in a prime location with excellent
                amenities.
              </p>
              <p>
                <i className="fa fa-bed text-primary me-3"></i>3 Bedrooms
              </p>
              <p>
                <i className="fa fa-bath text-primary me-3"></i>2 Bathrooms
              </p>
              <p>
                <i className="fa fa-map-marker-alt text-primary me-3"></i>Dhaka,
                Bangladesh
              </p>

              <button
                className="btn btn-primary py-3 px-4 mt-3 me-3"
                onClick={() => setShowMore(true)}
              >
                Show More
              </button>
              <button
                className="btn btn-outline-primary py-3 px-4 mt-3"
                onClick={() => setShowModal(true)}
              >
                Contact Owner
              </button>
            </div>
          </div>

          {/* Property Feature & Description - Show on Click */}
          {showMore && (
            <>
              {/* Property Features Section */}
              <div className="row g-5 align-items-center mt-4">
                <div className="col-lg-6">
                  <h2 className="mb-4 text-primary">🏡 Property Features</h2>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>Fully
                    Furnished
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>24/7
                    Security
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>High-Speed
                    Internet
                  </p>
                </div>
              </div>

              {/* Property Description Section */}
              <div className="row g-5 align-items-center mt-4">
                <div className="col-lg-6">
                  <h2 className="mb-4 text-primary">📃 Property Description</h2>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>Fully
                    Furnished
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>24/7
                    Security
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>High-Speed
                    Internet
                  </p>
                  <button
                    className="btn btn-danger py-3 px-5 mt-3"
                    onClick={handleSeeLess}
                  >
                    See Less
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title">Contact Owner</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <h6>
                  <strong>Owner Details:</strong>
                </h6>
                <p>
                  <strong>Name:</strong> John Doe
                </p>
                <p>
                  <strong>Phone:</strong> +880 123 456 789
                </p>
                <p>
                  <strong>Location:</strong> Dhaka, Bangladesh
                </p>
                <hr />

                <h6>
                  <strong>Send a Message</strong>
                </h6>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write your message"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlatDetailsPage;

import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import myaxios from "../uitils/myaxios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const messages = ["Find Your Dream Flat!", "Best Deals Available Now!"];

const FlatDetailsPage = () => {
  const { slug } = useParams();
  const [flat, setFlat] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const firstRowRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formloading, setformLoading] = useState(false);

  const isAuthenticated = localStorage.getItem("token") !== null; // Example for token-based auth
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlatDetails = async () => {
      setLoading(true);
      try {
        const response = await myaxios.get(`/flat_details/${slug}/`);
        console.log(response.data);
        setFlat(response.data);
      } catch (error) {
        setError("Failed to fetch flat details.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchFlatDetails();
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSeeLess = () => {
    setShowMore(false);
    firstRowRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData); // Convert form data to object

    // Split the name into first_name and last_name
    const nameParts = data.name.trim().split(" ");
    data.first_name = nameParts[0] || "";
    data.last_name = nameParts.slice(1).join(" ") || ""; // Combine rest as last_name

    delete data.name; // Remove the original "name" field

    setformLoading(true);
  
    try {
      await myaxios.post(`/renter/send_message/${slug}/`, data);
      alert("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to send message.");
    } finally {
      setformLoading(false);
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
                  {flat ? flat.title : <Skeleton width={100} />}
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

      {/* Flat Details Section */}
      <div className="container-xxl py-5">
        <div className="container">
          {/* If Loading, Show Skeleton Loader Below Header */}
          {loading ? (
            <div className="row g-5 align-items-center">
              {/* Left Side: Image Skeleton */}
              <div className="col-lg-6">
                <Skeleton height={350} width={"100%"} />
              </div>

              {/* Right Side: Text Skeletons */}
              <div className="col-lg-6">
                <Skeleton height={40} width={"80%"} />
                <Skeleton height={20} width={"60%"} className="mt-3" />
                <Skeleton height={20} width={"90%"} className="mt-2" />
                <Skeleton height={20} width={"70%"} className="mt-2" />
                <Skeleton height={40} width={"40%"} className="mt-4" />
                <Skeleton height={40} width={"40%"} className="mt-2" />
                <Skeleton height={40} width={"40%"} className="mt-2" />
              </div>
            </div>
          ) : error ? (
            <div className="text-danger text-center mt-5">{error}</div>
          ) : (
            <div className="row g-5 align-items-center" ref={firstRowRef}>
              <div className="col-lg-6">
                <Carousel showThumbs={false} infiniteLoop autoPlay>
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index}>
                      <img
                        src={`https://res.cloudinary.com/drgz0wgom/${
                          flat[`image_${index}`]
                        }`}
                        alt={`Flat Image ${index}`}
                        className="img-fluid detail-img"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="col-lg-6">
                <h1 className="mb-4">{flat.title} for Rent</h1>
                <p className="mb-4">
                  All the details are shown below, please check it out.
                </p>
                <p>
                  <i className="fa fa-bed text-primary me-3"></i>
                  {flat.room} Bedrooms
                </p>
                <p>
                  <i className="fa fa-bath text-primary me-3"></i>
                  {flat.bath} Bathrooms
                </p>
                <p>
                  <i className="fa fa-home text-primary me-3"></i>
                  {flat.kitchen} Kitchen
                </p>
                <p>
                  <i className="fa fa-ruler-combined text-primary me-3"></i>
                  {flat.flat_size} Sqft
                </p>
                <p>
                  <i className="fa fa-map-marker-alt text-primary me-3"></i>
                  {flat.location_title}
                </p>
                <p>
                  <i className="fa fa-dollar-sign text-primary me-3"></i>
                  {flat.price} taka
                </p>

                <button
                  className="btn btn-primary py-3 px-4 mt-3 me-3"
                  onClick={() => setShowMore(true)}
                >
                  Show More
                </button>

                <button
                  className="btn btn-outline-primary py-3 px-4 mt-3"
                  onClick={() => {
                    if (isAuthenticated) {
                      setShowModal(true);
                    } else {
                      setShowModal(false);
                      alert("You need to log in to contact the owner.");
                      // Optionally redirect to login page
                      navigate("/login");
                    }
                  }}
                >
                  Contact Owner
                </button>
              </div>
            </div>
          )}

          {/* Property Feature & Description - Show on Click */}
          {showMore && (
            <>
              {/* Property Features Section */}
              <div className="row g-5 align-items-center mt-4">
                <div className="col-lg-6">
                  <h2 className="mb-4 text-primary">🏡 Property Features</h2>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.feature_1}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.feature_2}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.feature_3}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.feature_4}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.feature_5}
                  </p>
                </div>
              </div>

              {/* Property Description Section */}
              <div className="row g-5 align-items-center mt-4">
                <div className="col-lg-6">
                  <h2 className="mb-4 text-primary">📃 Property Description</h2>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.description_1}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.description_2}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.description_3}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.description_4}
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3"></i>
                    {flat.description_5}
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
                  <strong>Name:</strong> {flat.owner?.first_name}{" "}
                  {flat.owner?.last_name}
                </p>
                <p>
                  <strong>Phone:</strong> {flat.owner?.phone_number}
                </p>
                <p>
                  <strong>Email:</strong> {flat.owner?.email}
                </p>

                <hr />
                
                <h6>
                  <strong>Send a Message:</strong>
                </h6>
                <form onSubmit={handleSubmit}>
                  <div className="mb-1">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Your Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="3"
                      placeholder="Write your message"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={formloading}
                  >
                    {formloading ? "Sending..." : "Send Message"}
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

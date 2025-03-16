import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import myaxios from "../uitils/myaxios";

const messages = [
  "Your Booking History!",
  "Store It Or Remove It!",
];

const RenterBookingList = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  

  useEffect(() => {
    const fetchData = async () => {
  
      try {
        const flatsRes = await myaxios.get("/renter/bookings/");
        setFlats(flatsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading state updates correctly
      }
    };
  
    fetchData();
  }, []);
  

  const handleDelete = async (slug) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the record!!?"
    );
    if (!isConfirmed) return;
    try {
      await myaxios.delete(`/renter/bookings/delete/${slug}/`);
      setFlats(flats.filter((flat) => flat.slug !== slug));
    } catch (error) {
      console.error("Error deleting flat:", error);
    }
  };

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
            <h1 className="display-5 animated fadeIn mb-4">Renter Booking List</h1>
            <nav aria-label="breadcrumb animated fadeIn">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item text-body active"
                  aria-current="page"
                >
                  Renter Booking List
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

      <div className="container-xxl py-1">
        <div className="container">
          <div className="row g-4">
            {loading
              ? // Show skeleton loader when loading is true
                [...Array(6)].map((_, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <div className="property-item rounded overflow-hidden">
                      <div className="skeleton-image"></div>
                      <div className="p-4 pb-0">
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text small"></div>
                      </div>
                      <div className="skeleton-footer"></div>
                    </div>
                  </div>
                ))
              : // Show actual flats once loading is false
                flats.map((flat) => (
                  <div key={flat.id} className="col-lg-4 col-md-6">
                    <div className="property-item rounded overflow-hidden">
                      <div className="position-relative overflow-hidden">
                        <Link to={`/flat-details/${flat.slug}`}>
                          <img
                            className="img-fluid fixed-img"
                            src={`https://res.cloudinary.com/drgz0wgom/${flat.image_1}`}
                            alt="Flat"
                          />
                        </Link>
                        <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                          For Rent
                        </div>
                        <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                          {flat.category_title}
                        </div>
                      </div>
                      <div className="p-4 pb-0">
                        <h5 className="text-primary mb-3">${flat.price}</h5>
                        <Link
                          className="d-block h5 mb-2"
                          to={`/flat-details/${flat.slug}`}
                        >
                          {flat.title}
                        </Link>
                        <p>
                          <i className="fa fa-map-marker-alt text-primary me-2"></i>
                          {flat.location_title}
                        </p>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2">
                          <i className="fa fa-ruler-combined text-primary me-2"></i>
                          {flat.flat_size} Sqft
                        </small>
                        <small className="flex-fill text-center border-end py-2">
                          <i className="fa fa-bed text-primary me-2"></i>
                          {flat.room} Bed
                        </small>
                        <small className="flex-fill text-center py-2">
                          <i className="fa fa-bath text-primary me-2"></i>
                          {flat.bath} Bath
                        </small>
                      </div>
                      <div className="d-flex justify-content-between p-3">
                        {/* <button
                          className="btn btn-warning"
                          onClick={() => openModal(flat)}
                        >
                          Edit
                        </button> */}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(flat.slug)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterBookingList;

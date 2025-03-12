import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
const messages = ["Add Your Flat Information!", "Provide Complete Details!"];

const AddFlatPage = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000); // Change message every 4 seconds

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
            <h1 className="display-5 animated fadeIn mb-4">Add Flat</h1>
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

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-col-md-6">
              <div className="wow fadeInUp" data-wow-delay="0.5s">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select className="form-control" name="category" style={{ cursor: "pointer" }}>
                          <option value="">Select Category</option>
                          <option value="apartment">Apartment</option>
                          <option value="studio">Studio</option>
                          <option value="villa">Villa</option>
                        </select>
                        <label>Select Category</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <select className="form-control" name="location" style={{ cursor: "pointer" }}>
                          <option value="">Select Location</option>
                          <option value="dhaka">Dhaka</option>
                          <option value="chittagong">Chittagong</option>
                          <option value="sylhet">Sylhet</option>
                        </select>
                        <label>Select Location</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Flat Title"
                        />
                        <label>Flat Title</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="flatSize"
                          placeholder="Flat Size"
                        />
                        <label>Flat Size (sq ft)</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="room"
                          placeholder="Rooms"
                        />
                        <label>Number of Rooms</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="bath"
                          placeholder="Bathrooms"
                        />
                        <label>Number of Bathrooms</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="kitchen"
                          placeholder="Kitchens"
                        />
                        <label>Number of Kitchens</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          placeholder="Flat Price"
                        />
                        <label>Flat Price (taka)</label>
                      </div>
                    </div>

                    {[1, 2, 3, 4].map((num) => (
                      <div className="col-md-6" key={num}>
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            name={`image_${num}`}
                            style={{ cursor: "pointer" }}
                          />
                          <label>Upload Image {num}</label>
                        </div>
                      </div>
                    ))}

                    {[1, 2, 3, 4, 5].map((num) => (
                      <div className="col-md-6" key={num}>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            name={`feature_${num}`}
                            placeholder={`Feature ${num}`}
                          />
                          <label>Flat Feature {num}</label>
                        </div>
                      </div>
                    ))}

                    {[1, 2, 3, 4, 5].map((num) => (
                      <div className="col-md-6" key={num}>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            name={`description_${num}`}
                            placeholder={`Description ${num}`}
                          />
                          <label>Flat Description {num}</label>
                        </div>
                      </div>
                    ))}

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Add Flat
                      </button>
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

export default AddFlatPage;

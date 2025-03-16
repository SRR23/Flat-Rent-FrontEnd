import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import myaxios from "../uitils/myaxios";

const messages = [
  "Manage Your Flats Efficiently!",
  "Edit or Remove Listings Easily!",
];

const OwnerFlatList = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [flats, setFlats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false); // Loading state for the button

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flatsRes, categoriesRes, locationsRes] = await Promise.all([
          myaxios.get("/owner/flats_list/"),
          myaxios.get("/categories/"),
          myaxios.get("/locations/"),
        ]);

        setFlats(flatsRes.data);
        setCategories(categoriesRes.data);
        setLocations(locationsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this flat?"
    );
    if (!isConfirmed) return;
    try {
      await myaxios.delete(`/owner/flats/${id}/`);
      setFlats(flats.filter((flat) => flat.id !== id));
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

  const openModal = (flat) => {
    setSelectedFlat(flat);
    setFormData({ ...flat });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlat(null);
  };

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    // List of fields that should be treated as integers
    const integerFields = ["room", "bath", "flat_size", "kitchen", "price"];

    if (integerFields.includes(name)) {
      // Convert to integer, or use empty string if value is empty
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? parseInt(value, 10) : "", // Handle empty values gracefully
      }));
    } else if (type === "file") {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file, // Store file object
      }));

      // Generate a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => ({
          ...prevPreviews,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    setButtonLoading(true); // Set loading state before making the API request
    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Send request with FormData
      await myaxios.put(`/owner/flats/${selectedFlat.id}/`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update UI after successful edit
      setFlats(
        flats.map((flat) =>
          flat.id === selectedFlat.id ? { ...flat, ...formData } : flat
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error updating flat:", error);
    } finally {
      setButtonLoading(false); // Reset button loading state after the API request is finished
    }
  };

  return (
    <div>
      <div
        className="container-fluid header bg-white p-0"
        style={{ marginTop: "80px" }}
      >
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 animated fadeIn mb-4">Owner Flat List</h1>
            <nav aria-label="breadcrumb animated fadeIn">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item text-body active"
                  aria-current="page"
                >
                  Owner Flat List
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
                        <button
                          className="btn btn-warning"
                          onClick={() => openModal(flat)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(flat.id)}
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

      {/* Custom React Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: "10vh", // Moves modal below navbar
            left: 0,
            width: "100vw",
            height: "90vh", // Prevents overflow
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1050,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // Aligns modal properly
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "90%",
              maxWidth: "1200px",
              maxHeight: "80vh", // Limits height so it fits well
              overflowY: "auto",
              borderRadius: "10px",
            }}
          >
            <h5 className="text-center mb-3">Edit Flat Details</h5>

            {/* Modal Form */}
            {/* Modal Form */}
            <form>
              {/* Title and Price */}
              <div className="d-flex justify-content-between">
                <div style={{ width: "48%" }}>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label>Price:</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Location and category */}
              <div className="d-flex justify-content-between mt-2">
                <div style={{ width: "48%" }}>
                  <label>Select Category:</label>
                  <select
                    name="category"
                    className="form-control"
                    style={{ cursor: "pointer" }}
                    value={formData.category || ""}
                    onChange={handleChange}
                  >
                    {/* <option value="">Select Category</option> */}
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: "48%" }}>
                  <label>Select Location:</label>
                  <select
                    name="location"
                    className="form-control"
                    style={{ cursor: "pointer" }}
                    value={formData.location || ""}
                    onChange={handleChange}
                  >
                    {/* <option value="">Select Location</option> */}
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rooms and Bathrooms */}
              <div className="d-flex justify-content-between mt-2">
                <div style={{ width: "48%" }}>
                  <label>Size (Sqft):</label>
                  <input
                    type="text"
                    name="flat_size"
                    className="form-control"
                    value={formData.flat_size}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ width: "48%" }}>
                  <label>Rooms:</label>
                  <input
                    type="text"
                    name="room"
                    className="form-control"
                    value={formData.room}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <div style={{ width: "48%" }}>
                  <label>Bathrooms:</label>
                  <input
                    type="text"
                    name="bath"
                    className="form-control"
                    value={formData.bath}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label>Kitchen:</label>
                  <input
                    type="text"
                    name="kitchen"
                    className="form-control"
                    value={formData.kitchen}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image Uploads with Preview */}
              <div className="row g-3 mt-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="col-md-6">
                    <div className="p-3 border rounded shadow-sm bg-light text-center">
                      <label className="form-label fw-bold">Image {num}</label>
                      <input
                        type="file"
                        name={`image_${num}`}
                        className="form-control"
                        style={{ cursor: "pointer" }}
                        onChange={handleChange}
                      />
                      {(imagePreviews[`image_${num}`] ||
                        formData[`image_${num}`]) && (
                        <div className="mt-2">
                          <img
                            src={
                              imagePreviews[`image_${num}`] ||
                              `https://res.cloudinary.com/drgz0wgom/${
                                formData[`image_${num}`]
                              }`
                            }
                            alt={`Image ${num}`}
                            className="img-thumbnail"
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="d-flex flex-wrap justify-content-between mt-2">
                {["feature_1", "feature_2", "feature_3", "feature_4"].map(
                  (feature, index) => (
                    <div key={feature} style={{ width: "48%" }}>
                      <label>Feature {index + 1}:</label>
                      <input
                        type="text"
                        name={feature}
                        className="form-control"
                        value={formData[feature]}
                        onChange={handleChange}
                      />
                    </div>
                  )
                )}
              </div>

              {/* Feature 5 and Description 1 */}
              <div className="d-flex justify-content-between mt-2">
                <div style={{ width: "48%" }}>
                  <label>Feature 5:</label>
                  <input
                    type="text"
                    name="feature_5"
                    className="form-control"
                    value={formData.feature_5}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label>Description 1:</label>
                  <input
                    type="text"
                    name="description_1"
                    className="form-control"
                    value={formData.description_1}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="d-flex flex-wrap justify-content-between mt-2">
                {[
                  "description_2",
                  "description_3",
                  "description_4",
                  "description_5",
                ].map((desc, index) => (
                  <div key={desc} style={{ width: "48%" }}>
                    <label>Description {index + 2}:</label>
                    <input
                      type="text"
                      name={desc}
                      className="form-control"
                      value={formData[desc]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary me-2" onClick={closeModal}>
                  Close
                </button>
                <button
                  className="btn btn-success w-100 py-3"
                  onClick={handleUpdate}
                  disabled={buttonLoading} // Disable the button while loading
                >
                  {buttonLoading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerFlatList;

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import myaxios from "../uitils/myaxios";

const messages = [
  "Manage Flats Efficiently!",
  "Edit or Remove Easily!",
];

const OwnerFlatList = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [flats, setFlats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

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
    setFormData({
      ...flat,
      category: flat.category.id,
      location: flat.location.id,
      washroom: flat.washroom || "",
      floor: flat.floor || "",
      bed_room: flat.bed_room || "",
      rent: flat.rent || "",
      address: flat.address || "",
      commode: flat.commode || false,
      water_supply: flat.water_supply || false,
      tiles: flat.tiles || false,
      kitchen: flat.kitchen || false,
      cctv: flat.cctv || false,
      roof_top_uses: flat.roof_top_uses || false,
      garage: flat.garage || false,
      dining_room: flat.dining_room || false,
      drawing_room: flat.drawing_room || false,
      balcony: flat.balcony || false,
    });
    setImagePreviews({
      image_1: flat.image_1 ? `https://res.cloudinary.com/drgz0wgom/${flat.image_1}` : "",
      image_2: flat.image_2 ? `https://res.cloudinary.com/drgz0wgom/${flat.image_2}` : "",
      image_3: flat.image_3 ? `https://res.cloudinary.com/drgz0wgom/${flat.image_3}` : "",
      image_4: flat.image_4 ? `https://res.cloudinary.com/drgz0wgom/${flat.image_4}` : "",
      image_5: flat.image_5 ? `https://res.cloudinary.com/drgz0wgom/${flat.image_5}` : "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlat(null);
    setImagePreviews({});
  };

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "file") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      // Generate a preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prevPreviews) => ({
            ...prevPreviews,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreviews((prevPreviews) => ({
          ...prevPreviews,
          [name]: null,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    setButtonLoading(true);
    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("category_id", formData.category);
      formDataToSend.append("location_id", formData.location);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("washroom", formData.washroom || 0);
      formDataToSend.append("commode", formData.commode);
      formDataToSend.append("water_supply", formData.water_supply);
      formDataToSend.append("floor", formData.floor);
      formDataToSend.append("tiles", formData.tiles);
      formDataToSend.append("kitchen", formData.kitchen);
      formDataToSend.append("cctv", formData.cctv);
      formDataToSend.append("roof_top_uses", formData.roof_top_uses);
      formDataToSend.append("garage", formData.garage);
      formDataToSend.append("bed_room", formData.bed_room || 0);
      formDataToSend.append("dining_room", formData.dining_room);
      formDataToSend.append("drawing_room", formData.drawing_room);
      formDataToSend.append("balcony", formData.balcony);
      formDataToSend.append("rent", formData.rent || 0);
      formDataToSend.append("address", formData.address);

      // Append image fields
      ["image_1", "image_2", "image_3", "image_4", "image_5"].forEach((key) => {
        if (formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key] || "");
        }
      });

      // Send request
      const response = await myaxios.put(`/owner/flats/${selectedFlat.id}/`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update UI
      setFlats(
        flats.map((flat) =>
          flat.id === selectedFlat.id ? { ...flat, ...response.data } : flat
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error updating flat:", error);
    } finally {
      setButtonLoading(false);
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
              ? [...Array(6)].map((_, index) => (
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
              : flats.map((flat) => (
                  <div key={flat.id} className="col-lg-4 col-md-6">
                    <div className="property-item rounded overflow-hidden">
                      <div className="position-relative overflow-hidden">
                        <Link to={`/flat-details/${flat.slug}`}>
                          <img
                            className="img-fluid fixed-img"
                            src={`https://res.cloudinary.com/drgz0wgom/${flat.image_1}`}
                            alt={flat.title}
                          />
                        </Link>
                        <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                          For Rent
                        </div>
                        <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                          {flat.category.title}
                        </div>
                      </div>
                      <div className="p-4 pb-0">
                        <h5 className="text-primary mb-3">${flat.rent}</h5>
                        <Link
                          className="d-block h5 mb-2"
                          to={`/flat-details/${flat.id}`}
                        >
                          {flat.title}
                        </Link>
                        <p>
                          <i className="fa fa-map-marker-alt text-primary me-2"></i>
                          {flat.location.title}
                        </p>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2">
                          <i className="fa fa-ruler-combined text-primary me-2"></i>
                          {flat.square_feet || "N/A"} Sqft
                        </small>
                        <small className="flex-fill text-center border-end py-2">
                          <i className="fa fa-bed text-primary me-2"></i>
                          {flat.bed_room || "N/A"} Bed
                        </small>
                        <small className="flex-fill text-center py-2">
                          <i className="fa fa-bath text-primary me-2"></i>
                          {flat.washroom} Bath
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

      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: "10vh",
            left: 0,
            width: "100vw",
            height: "90vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1050,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "90%",
              maxWidth: "1200px",
              maxHeight: "80vh",
              overflowY: "auto",
              borderRadius: "10px",
            }}
          >
            <h5 className="text-center mb-3">Edit Flat Details</h5>

            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Rent:</label>
                  <input
                    type="number"
                    name="rent"
                    className="form-control"
                    value={formData.rent}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category:</label>
                  <select
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Location:</label>
                  <select
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Washroom:</label>
                  <input
                    type="number"
                    name="washroom"
                    className="form-control"
                    value={formData.washroom}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Floor:</label>
                  <input
                    type="text"
                    name="floor"
                    className="form-control"
                    value={formData.floor}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bed Rooms:</label>
                  <input
                    type="number"
                    name="bed_room"
                    className="form-control"
                    value={formData.bed_room}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address:</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <div className="d-flex flex-wrap gap-3">
                    {[
                      { field: "commode", label: "Commode (High)" },
                      { field: "water_supply", label: "Water Supply (24/7)" },
                      { field: "tiles", label: "Tiles" },
                      { field: "kitchen", label: "Kitchen" },
                      { field: "cctv", label: "CCTV (24/7)" },
                      { field: "roof_top_uses", label: "Roof Top Uses" },
                      { field: "garage", label: "Garage" },
                      { field: "dining_room", label: "Dining Room" },
                      { field: "drawing_room", label: "Drawing Room" },
                      { field: "balcony", label: "Balcony" },
                    ].map(({ field, label }) => (
                      <div key={field} className="form-check me-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={field}
                          checked={formData[field]}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">{label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="col-md-6">
                    <div className="p-3 border rounded shadow-sm bg-light text-center">
                      <label className="form-label fw-bold">Image {num}</label>
                      <input
                        type="file"
                        name={`image_${num}`}
                        className="form-control"
                        onChange={handleChange}
                        accept="image/*"
                      />
                      {imagePreviews[`image_${num}`] && (
                        <div className="mt-2">
                          <img
                            src={imagePreviews[`image_${num}`]}
                            alt={`Image ${num}`}
                            className="img-thumbnail"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdate}
                  disabled={buttonLoading}
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
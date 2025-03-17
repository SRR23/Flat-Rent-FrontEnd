import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import myaxios from "../uitils/myaxios";

const messages = ["Add Flat Information!", "Provide Complete Details!"];

const AddFlatPage = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    title: "",
    flatSize: "",
    room: "",
    bath: "",
    kitchen: "",
    price: "",
    images: [],
    features: Array(5).fill(""),
    descriptions: Array(5).fill(""),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, locationRes] = await Promise.all([
          myaxios.get("/categories/"),
          myaxios.get("/locations/"),
        ]);
        setCategories(categoryRes.data);
        setLocations(locationRes.data);
      } catch (error) {
        console.error("Error fetching categories or locations:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...newFiles];

    if (updatedImages.length > 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }

    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleArrayChange = (e, index, key) => {
    const updatedArray = [...formData[key]];
    updatedArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const submitData = new FormData();
      submitData.append("category", formData.category);
      submitData.append("location", formData.location);
      submitData.append("title", formData.title);
      submitData.append("flat_size", formData.flatSize); // ✅ Use "flat_size" instead of "flatSize"
      submitData.append("room", formData.room);
      submitData.append("bath", formData.bath);
      submitData.append("kitchen", formData.kitchen);
      submitData.append("price", formData.price);

      formData.images.forEach((file, index) => {
        submitData.append(`image_${index + 1}`, file);
      });

      formData.features.forEach((feature, index) => {
        submitData.append(`feature_${index + 1}`, feature);
      });

      formData.descriptions.forEach((desc, index) => {
        submitData.append(`description_${index + 1}`, desc);
      });

      console.log("Sending Data:");
      for (let pair of submitData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await myaxios.post("/owner/flats/add/", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);
      setMessage("Flat added successfully!");

      setFormData({
        category: "",
        location: "",
        title: "",
        flatSize: "",
        room: "",
        bath: "",
        kitchen: "",
        price: "",
        images: [],
        features: Array(5).fill(""),
        descriptions: Array(5).fill(""),
      });
    } catch (error) {
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      } else {
        console.error("Request Error:", error.message);
      }
      setMessage("Error adding flat. Try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="container-fluid header bg-white p-0" style={{ marginTop: "80px" }}>
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 animated fadeIn mb-4">Add Flat</h1>
            <nav aria-label="breadcrumb animated fadeIn">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item text-body active" aria-current="page">
                  Add Flat
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

      <div className="container-xxl py-5">
        <div className="container">
          <form onSubmit={handleSubmit} className="row g-4">
            <div className="col-md-6">
              <label>Category</label>
              <select
                style={{ cursor: "pointer" }}
                className="form-control"
                name="category"
                onChange={handleChange}
                value={formData.category}
                disabled={loadingData}
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
              <label>Location</label>
              <select
                style={{ cursor: "pointer" }}
                className="form-control"
                name="location"
                onChange={handleChange}
                value={formData.location}
                disabled={loadingData}
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.title}
                  </option>
                ))}
              </select>
            </div>

            {["title", "flatSize", "room", "bath", "kitchen", "price"].map((field) => (
              <div className="col-md-6" key={field}>
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="col-md-6">
              <label>Upload Images (Max 4)</label>
              <input
                style={{ cursor: "pointer" }}
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                accept="image/*"
              />
              {formData.images.length > 0 && (
                <p className="mt-2 text-success">
                  {formData.images.length} / 4 images selected
                </p>
              )}

              {/* Display selected images with a remove option */}
              <div className="mt-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="d-inline-block me-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-block mt-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {[...Array(5)].map((_, i) => (
              <div className="col-md-6" key={`feature-${i}`}>
                <label>Feature {i + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.features[i]}
                  onChange={(e) => handleArrayChange(e, i, "features")}
                />
              </div>
            ))}

            {[...Array(5)].map((_, i) => (
              <div className="col-md-6" key={`desc-${i}`}>
                <label>Description {i + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.descriptions[i]}
                  onChange={(e) => handleArrayChange(e, i, "descriptions")}
                />
              </div>
            ))}

            <div className="col-12">
              <button
                className="btn btn-primary w-100 py-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Adding Flat..." : "Add Flat"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFlatPage;

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
  const [formType, setFormType] = useState("family");
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    title: "",
    washroom: "",
    commode: false,
    water_supply: false,
    floor: "",
    tiles: false,
    kitchen: false,
    cctv: false,
    roof_top_uses: false,
    garage: false,
    images: [],
    family_details: {
      bed_room: "",
      dining_room: false,
      drawing_room: false,
      balcony: false,
      rent: "",
      address: "",
    },
    bachelor_details: {
      available_seats: "",
      dining_charge: "",
      meal_rate_range: "",
      extra_cost_range: "",
      expected_total_cost: "",
      total_members: "",
      khala_facility: false,
    },
    shop_details: {
      rent: "",
      square_feet: "",
      preaching_space: false,
      address: "",
    },
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDetailChange = (e, detailType) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [detailType]: {
        ...prev[detailType],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...newFiles];

    if (updatedImages.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const submitData = new FormData();
      submitData.append("category_id", formData.category);
      submitData.append("location_id", formData.location);
      submitData.append("title", formData.title);
      submitData.append("washroom", formData.washroom);
      submitData.append("commode", formData.commode);
      submitData.append("water_supply", formData.water_supply);
      submitData.append("floor", formData.floor);
      submitData.append("tiles", formData.tiles);
      submitData.append("kitchen", formData.kitchen);
      submitData.append("cctv", formData.cctv);
      submitData.append("roof_top_uses", formData.roof_top_uses);
      submitData.append("garage", formData.garage);

      formData.images.forEach((file, index) => {
        submitData.append(`image_${index + 1}`, file);
      });

      if (formType === "family") {
        submitData.append("family_details", JSON.stringify([formData.family_details]));
      } else if (formType === "bachelor") {
        submitData.append("bachelor_details", JSON.stringify([formData.bachelor_details]));
      } else if (formType === "shop") {
        submitData.append("shop_details", JSON.stringify([formData.shop_details]));
      }

      const response = await myaxios.post("/flats/create/", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);
      setMessage("Flat added successfully!");

      setFormData({
        category: "",
        location: "",
        title: "",
        washroom: "",
        commode: false,
        water_supply: false,
        floor: "",
        tiles: false,
        kitchen: false,
        cctv: false,
        roof_top_uses: false,
        garage: false,
        images: [],
        family_details: {
          bed_room: "",
          dining_room: false,
          drawing_room: false,
          balcony: false,
          rent: "",
          address: "",
        },
        bachelor_details: {
          available_seats: "",
          dining_charge: "",
          meal_rate_range: "",
          extra_cost_range: "",
          expected_total_cost: "",
          total_members: "",
          khala_facility: false,
        },
        shop_details: {
          rent: "",
          square_feet: "",
          preaching_space: false,
          address: "",
        },
      });
      setFormType("family");
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
    <div className="min-vh-100 bg-light pt-0">
      <div className="container-fluid bg-white shadow py-3 px-4" style={{ marginTop: "70px" }}>
        <div className="row align-items-center">
          <div className="col-md-6 p-3">
            <h1 className="h5 font-weight-bold text-dark mb-0">Add Flat</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent p-0 mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-primary" style={{ fontSize: "1.1rem" }}>Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: "1.1rem" }}>Add Flat</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                className="h5 font-weight-semibold text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ fontSize: "1.3rem" }}
              >
                {messages[messageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <form onSubmit={handleSubmit} className="row g-4">
          {/* Universal Fields Column */}
          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-3">
                <h2 className="h5 font-weight-bold text-dark mb-3">General Details</h2>
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: "1.1rem" }}>Category</label>
                  <select
                    className="form-select"
                    name="category"
                    onChange={handleChange}
                    value={formData.category}
                    disabled={loadingData}
                    style={{ fontSize: "1.1rem" }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: "1.1rem" }}>Location</label>
                  <select
                    className="form-select"
                    name="location"
                    onChange={handleChange}
                    value={formData.location}
                    disabled={loadingData}
                    style={{ fontSize: "1.1rem" }}
                  >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: "1.1rem" }}>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    style={{ fontSize: "1.1rem" }}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label" style={{ fontSize: "1.1rem" }}>Washroom</label>
                    <input
                      type="number"
                      className="form-control"
                      name="washroom"
                      value={formData.washroom}
                      onChange={handleChange}
                      style={{ fontSize: "1.1rem" }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" style={{ fontSize: "1.1rem" }}>Floor</label>
                    <input
                      type="text"
                      className="form-control"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      style={{ fontSize: "1.1rem" }}
                    />
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-3">
                  {[
                    { field: "commode", label: "Commode (High)" },
                    { field: "water_supply", label: "Water Supply (24/7)" },
                    { field: "tiles", label: "Tiles" },
                    { field: "kitchen", label: "Kitchen" },
                    { field: "cctv", label: "CCTV (24/7)" },
                    { field: "roof_top_uses", label: "Roof Top Uses" },
                    { field: "garage", label: "Garage" },
                  ].map(({ field, label }) => (
                    <div key={field} className="form-check me-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={field}
                        checked={formData[field]}
                        onChange={handleChange}
                        style={{ transform: "scale(1.2)" }}
                      />
                      <label className="form-check-label" style={{ fontSize: "1.1rem" }}>{label}</label>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: "1.1rem" }}>Upload Images (Max 5)</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ fontSize: "1.1rem" }}
                  />
                  {formData.images.length > 0 && (
                    <p className="mt-2 text-success" style={{ fontSize: "1.1rem" }}>
                      {formData.images.length} / 5 images selected
                    </p>
                  )}
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="position-relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          className="rounded img-thumbnail"
                          style={{ width: "90px", height: "90px", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          onClick={() => handleRemoveImage(index)}
                          style={{ fontSize: "0.9rem" }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flat Type Specific Fields Column */}
          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-3">
                <h2 className="h5 font-weight-bold text-dark mb-3">Flat Type Details</h2>
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: "1.1rem" }}>Flat Type</label>
                  <select
                    className="form-select"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    style={{ fontSize: "1.1rem" }}
                  >
                    <option value="family">Family</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="shop">Shop</option>
                  </select>
                </div>

                {formType === "family" && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "1.1rem" }}>Bed Room</label>
                      <input
                        type="number"
                        className="form-control"
                        name="bed_room"
                        value={formData.family_details.bed_room}
                        onChange={(e) => handleDetailChange(e, "family_details")}
                        style={{ fontSize: "1.1rem" }}
                      />
                    </div>
                    <div className="d-flex flex-wrap gap-3 mb-3">
                      {["dining_room", "drawing_room", "balcony"].map((field) => (
                        <div key={field} className="form-check me-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={field}
                            checked={formData.family_details[field]}
                            onChange={(e) => handleDetailChange(e, "family_details")}
                            style={{ transform: "scale(1.2)" }}
                          />
                          <label className="form-check-label" style={{ fontSize: "1.1rem" }}>
                            {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "1.1rem" }}>Rent</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rent"
                        value={formData.family_details.rent}
                        onChange={(e) => handleDetailChange(e, "family_details")}
                        style={{ fontSize: "1.1rem" }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "1.1rem" }}>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.family_details.address}
                        onChange={(e) => handleDetailChange(e, "family_details")}
                        style={{ fontSize: "1.1rem" }}
                      />
                    </div>
                  </div>
                )}

                {formType === "bachelor" && (
                  <div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: "1.1rem" }}>Available Seats</label>
                        <input
                          type="text"
                          className="form-control"
                          name="available_seats"
                          value={formData.bachelor_details.available_seats}
                          onChange={(e) => handleDetailChange(e, "bachelor_details")}
                          style={{ fontSize: "1.1rem" }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: "1.1rem" }}>Meal Rate Range</label>
                        <input
                          type="text"
                          className="form-control"
                          name="meal_rate_range"
                          value={formData.bachelor_details.meal_rate_range}
                          onChange={(e) => handleDetailChange(e, "bachelor_details")}
                          style={{ fontSize: "1.1rem" }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: "1.1rem" }}>Extra Cost Range</label>
                        <input
                          type="text"
                          className="form-control"
                          name="extra_cost_range"
                          value={formData.bachelor_details.extra_cost_range}
                          onChange={(e) => handleDetailChange(e, "bachelor_details")}
                          style={{ fontSize: "1.1rem" }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: "1.1rem" }}>Total Members</label>
                        <input
                          type="text"
                          className="form-control"
                          name="total_members"
                          value={formData.bachelor_details.total_members}
                          onChange={(e) => handleDetailChange(e, "bachelor_details")}
                          style={{ fontSize: "1.1rem" }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: "1.1rem" }}>Dining Charge</label>
                        <input
                          type="number"
                          className="form-control"
                          name="dining_charge"
                          value={formData.bachelor_details.dining_charge}
                          onChange={(e) => handleDetailChange(e, "bachelor_details")}
                          style={{ fontSize: "1.1rem" }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: "1.1rem" }}>Expected Total Cost</label>
                        <input
                          type="number"
                          className="form-control"
                          name="expected_total_cost"
                          value={formData.bachelor_details.expected_total_cost}
                          onChange={(e) => handleDetailChange(e, "bachelor_details")}
                          style={{ fontSize: "1.1rem" }}
                        />
                      </div>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="khala_facility"
                        checked={formData.bachelor_details.khala_facility}
                        onChange={(e) => handleDetailChange(e, "bachelor_details")}
                        style={{ transform: "scale(1.2)" }}
                      />
                      <label className="form-check-label" style={{ fontSize: "1.1rem" }}>Khala Facility</label>
                    </div>
                  </div>
                )}

                {formType === "shop" && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "1.1rem" }}>Rent</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rent"
                        value={formData.shop_details.rent}
                        onChange={(e) => handleDetailChange(e, "shop_details")}
                        style={{ fontSize: "1.1rem" }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "1.1rem" }}>Square Feet</label>
                      <input
                        type="number"
                        className="form-control"
                        name="square_feet"
                        value={formData.shop_details.square_feet}
                        onChange={(e) => handleDetailChange(e, "shop_details")}
                        style={{ fontSize: "1.1rem" }}
                      />
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="preaching_space"
                        checked={formData.shop_details.preaching_space}
                        onChange={(e) => handleDetailChange(e, "shop_details")}
                        style={{ transform: "scale(1.2)" }}
                      />
                      <label className="form-check-label" style={{ fontSize: "1.1rem" }}>Preaching Space</label>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "1.1rem" }}>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.shop_details.address}
                        onChange={(e) => handleDetailChange(e, "shop_details")}
                        style={{ fontSize: "1.1rem" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            {message && (
              <p className={`text-center ${message.includes("successfully") ? "text-success" : "text-danger"}`} style={{ fontSize: "1.2rem" }}>
                {message}
              </p>
            )}
            <button
              className="btn btn-primary w-100 py-3"
              type="submit"
              disabled={loading}
              style={{ fontSize: "1.2rem" }}
            >
              {loading ? "Adding Flat..." : "Add Flat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlatPage;